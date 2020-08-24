const createDatePicker = ({ root }) => {
  
  root.innerHTML = `
    <div class="date-picker">
      <div class="selected-date"></div>
      <div class="dates">
        <div class="month">
        <div class="arrows prev-mth">&lt;</div>
        <div class="mth"></div>
        <div class="arrows next-mth">&gt;</div>
      </div>
      <div class="days"></div>
    </div>
  `;

  console.log(root);
  console.log(root.querySelector('.date-picker .dates'))

  const datePickerEl = root.querySelector('.date-picker');
  const selectedDateEl = root.querySelector('.date-picker .selected-date');
  const datesEl = root.querySelector('.date-picker .dates');
  const mthEl = root.querySelector('.date-picker .dates .month .mth');
  const prevMthEl = root.querySelector('.date-picker .dates .month .prev-mth');
  const nextMthEl = root.querySelector('.date-picker .dates .month .next-mth');  
  const daysEl = root.querySelector('.date-picker .dates .days');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  console.log('date: ', date);
  console.log('day: ', day);
  console.log('month: ',month);
  console.log('year: ', year);
  console.log('months[month]', months[month]);


  let selectedDate = date;
  let selectedDay = day;
  let selectedMonth = month;
  let selectedYear = year;




  mthEl.textContent = `${months[month]} ${year}`;
  selectedDateEl.textContent = formatDate(date);
  selectedDateEl.dataset.value = dataSetFormat(selectedDate);
  
  datePickerEl.addEventListener('click', toggleDatePicker);
  prevMthEl.addEventListener('click', goPrevMonth);
  nextMthEl.addEventListener('click', goNextMonth);



populateDates(selectedMonth, selectedYear);

function toggleDatePicker(e) {
  console.log('點擊 date picker');
  // console.log('e.path: ', e.path);
  if (!checkEventPathForClass(e.path, 'dates')){
    datesEl.classList.toggle('active');
  }
}



function goPrevMonth(e) {
  console.log(e);
  month--; // 本月份 ex: 7 - 1 = 6 (July)
  if (month < 0) {
    month = 11;
    year--;
  }
  mthEl.textContent = `${months[month]} ${year}`;
  
  console.log('go to prev month---------------')
  console.log('month: ', month, months[month], 'year: ', year);
  console.log('getTotalDays: ',getTotalDays(month, year))
  console.log('--------------------')
  populateDates(month, year);
}

function goNextMonth(e) {
  console.log(e);
  month++; // 本月份 ex: 7 + 1 = 8 (September)
  if (month > 11) {
    month = 0; // month 11 => December, 12 歸零 => January
    year++; // 歸零時跳到下一年
  }
  mthEl.textContent = `${months[month]} ${year}`;

  console.log('go to next month---------------')
  console.log('month: ', month, months[month], 'year: ', year);
  console.log('getTotalDays: ',getTotalDays(month, year))
  console.log('--------------------')

  populateDates(month, year);
}

function populateDates(selectedMth, selectedYr) {
  console.log('populateDate------------');
  console.log('selectedMth: ', selectedMth, ' ', months[selectedMth]);
  console.log('selectedYr: ', selectedYr);
  console.log('getTotalDays(amountDays): ', getTotalDays(selectedMth, selectedYr));
  console.log('------------------');

  daysEl.innerHTML = '';
  let amountDays = getTotalDays(selectedMth, selectedYr);
  console.log('amountDays: ', amountDays)
  // let amountDays = 31;
  // if (month === 1) {
  //   amountDays = 28;
  // }

  for (let i = 0; i < amountDays; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = i + 1;
    // console.log('i + 1: ', i+1)

    if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
      dayElement.classList.add('selected');
    }

    dayElement.addEventListener('click', function() {
      console.log('---- 選取 day DIV---')
      selectedDate = new Date(year + '-' + (month+1) + '-' + (i+1));
      console.log('selectedDate: ', selectedDate);
      selectedDay = (i + 1);
      console.log('selectedDay: ', selectedDay);
      selectedMonth = month;
      console.log('selectedMonth: ', selectedMonth);
      selectedYear = year;
      console.log('selectedYear: ', selectedYear);

      selectedDateEl.textContent = formatDate(selectedDate);
      console.log('timeformat: ', dataSetFormat(selectedDate));
      selectedDateEl.dataset.value = dataSetFormat(selectedDate);
      populateDates(selectedMth, selectedYr);
    });

    daysEl.appendChild(dayElement);
  }
}
// 37:53
// HELPER FUNCTION
function getTotalDays(month, year) {
  console.log('getTotalDays() ---------')
  console.log('month: ', month+1, '月')
  console.log('year: ', year)
  console.log('-------------------------')
  return new Date(year, month+1, 0).getDate();
}

function dataSetFormat(d) {
  const year = d.getFullYear();
  const month = d.getMonth()+1;
  const day = d.getDate();
  return [year, month, day].join("-");
}

function formatDate(d) {
  let day = d.getDate();
  // 如果 '日' 小於 10 數字前補上 0 => 08
  if (day < 10) {
    day = `0${day}`;
  }

  let month = d.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let year = d.getFullYear();
  // return `${day}/${month}/${year}`;
  return `${month} / ${day} / ${year}`;
  // return `${month}-${day}-${year}`;
}

function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }
  return false;
}

};