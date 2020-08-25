const datePicker = ({root}) => {
  root.innerHTML = `
    <div class="simple-date-picker">
      <div class="selected-date"></div>
      <div class="dates">
        <div class="month">
          <div class="btns prev-month"><<</div>
          <div class="month-label"></div>
          <div class="btns next-month">>></div>          
        </div>
        <div class="weekday">
          <div class="week">日</div>
          <div class="week">一</div>
          <div class="week">二</div>
          <div class="week">三</div>
          <div class="week">四</div>
          <div class="week">五</div>
          <div class="week">六</div>
        </div>
        <div class="days"></div>
      </div>
      
    </div>
  `;

  const datepickerElement = root.querySelector('.simple-date-picker');
  const selectedDateElement = root.querySelector('.simple-date-picker .selected-date');
  const datesElement = root.querySelector('.simple-date-picker .dates');

  const monthElement = root.querySelector('.simple-date-picker .dates .month .month-label');
  const prevBtn = root.querySelector('.simple-date-picker .dates .month .prev-month');
  const nextBtn = root.querySelector('.simple-date-picker .dates .month .next-month');
  const daysElement = root.querySelector('.simple-date-picker .dates .days');
  const weeksElement = root.querySelector('.simple-date-picker .dates .weeks');


  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // 當下日期
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  // 選擇的日期
  let selectedDate = date;
  let selectedDay = day;
  let selectedMonth = month;
  let selectedYear = year;

  monthElement.textContent = `${ month+1 }月  ${year}年`;  // 展開時顯示的月份＆年份
  selectedDateElement.textContent = formatDate(date);
  populateDates(month, year);

  datepickerElement.addEventListener('click', toggleDatepicker);
  prevBtn.addEventListener('click', goPrevMonth); // 往前一個月事件監聽
  nextBtn.addEventListener('click', goNextMonth); // 往後一個月事件監聽
  
  document.addEventListener('click', function(e){
    console.log('root: ', root);
    console.log('e.target', e.target)
    if (!root.contains(e.target)){
      datesElement.classList.remove('active');
    }
  });

  function toggleDatepicker(e){
    if (!checkEventPathForClass(e.path, 'dates')) {
      datesElement.classList.toggle('active');
    }
  }

  function goPrevMonth() {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    monthElement.textContent = `${ month+1 }月  ${year}年`;
    populateDates(month, year);
  }

  function goNextMonth() {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    monthElement.textContent = `${ month+1 }月  ${year}年`;
    populateDates(month, year);
  }

  function populateDates(mth, yr) {
    daysElement.innerHTML = '';
    
    let amountDays = getTotalDays(mth, yr); // 取得月份共幾天
    let firstDay = getStartedWeekDay(mth, yr);
    let spacer = ``;

    for (let i = 0; i < firstDay; i++) {
      spacer += `<div class="space"></div>`;
    }
    console.log(spacer);
    daysElement.innerHTML = spacer;

    console.log(mth);
    console.log(yr);
    console.log(firstDay);

    for (let i = 0; i < amountDays; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.textContent = i + 1;
  
      // 遇到當下日期/被選擇的日期，加上 css style
      if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
        dayElement.classList.add('selected');
      }
  
      dayElement.addEventListener('click', function() {
        selectedDate = new Date(year + '-' + (month+1) + '-' + (i+1));
        selectedDay = (i + 1);
        selectedMonth = month;
        selectedYear = year;
  
        selectedDateElement.textContent = formatDate(selectedDate);
        selectedDateElement.dataset.value = dataSetFormat(selectedDate); // 在元素上加入 dataset，之後要取得日期比較容易。

        populateDates(selectedMonth, selectedYear); // 當選擇了某一天，日期區塊需要重新更新。
       });

     daysElement.appendChild(dayElement);
    }
  }

  function checkEventPathForClass (path, selector) {
    for (let i = 0; i < path.length; i++) {
      if (path[i].classList && path[i].classList.contains(selector)) {
        return true;
      }
    }
    return false;
  }

  function formatDate(d) {
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10){
      month = `0${month}`;
    }
    return `${year}年 ${month}月 ${day}日`;
  }

  function dataSetFormat(d) {
    const year = d.getFullYear();
    const month = d.getMonth()+1;
    const day = d.getDate();
    return [year, month, day].join("-");
  }

  function getTotalDays(month, year) {
    return new Date(year, month+1, 0).getDate();
  }

  function getStartedWeekDay(month, year) {
    return new Date(year, month, 1).getDay();
  }


}