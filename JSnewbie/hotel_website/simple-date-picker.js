const datePicker = ({root, booking, holidayPrice, normalDayPrice}) => {
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

    daysElement.innerHTML = spacer;

    for (let i = 0; i < amountDays; i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day', 'tooltip');
      // dayElement.textContent = i + 1;

      // 遇到當下日期/被選擇的日期，加上 css style
      if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
        dayElement.classList.add('selected');
      }

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const ninetyDays = new Date();
      ninetyDays.setDate(ninetyDays.getDate() + 90);
      
      const checkToDate = new Date(`${year}-${month + 1}-${i + 1}`);
      const checkDateIso = toISOLocal(new Date(`${year}-${month + 1}-${i + 1}`)).slice(0, 10);
      let bookingDate = toISOLocal(new Date(booking[0])).slice(0, 10);
      let found = booking.find(item => item === checkDateIso)      
      dayElement.dataset.date = checkDateIso;
      // 價格 tooltip
      if (checkToDate.getDay() === 5 || checkToDate.getDay() === 6 || checkToDate.getDay() === 0) {
        dayElement.dataset.price = holidayPrice;
        dayElement.innerHTML = `
          ${i + 1}
          <span class="tooltiptext">$${holidayPrice}</span>
        `;
      } else {
        dayElement.dataset.price = normalDayPrice;
        dayElement.innerHTML = `
        ${i + 1}
        <span class="tooltiptext">$${normalDayPrice}</span>
      `;
      }

      if (found !== 'undefined' && found === checkDateIso){
        dayElement.classList.add('booked');
      } else if (checkToDate < tomorrow || checkToDate > ninetyDays) {
        dayElement.classList.add('overtime');
      } else {

        dayElement.addEventListener('click', function(e) {  
          let price = e.target.dataset.price;
          let source = e.target.parentNode.parentNode.parentNode.parentNode.id;
          selectedDate = new Date(year + '-' + (month+1) + '-' + (i+1));
          selectedDay = (i + 1);
          selectedMonth = month;
          selectedYear = year;
          selectedDateElement.textContent = formatDate(selectedDate);
          selectedDateElement.dataset.value = dataSetFormat(selectedDate); // 在元素上加入 dataset，之後要取得日期比較容易。
          populateDates(selectedMonth, selectedYear); // 當選擇了某一天，日期區塊需要重新更新。          
          setDatePrice(source, selectedDate, price);
        });
      }
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

  function getTotalDays(month, year) {
    return new Date(year, month+1, 0).getDate();
  }

  function getStartedWeekDay(month, year) {
    return new Date(year, month, 1).getDay();
  }
}


