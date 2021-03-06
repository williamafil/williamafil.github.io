const id = (window.location.search).split('=')[1];
const api = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`;
const token = 'kkc1YuXLPcBEPNQl4iMbEfy0GzRcr05lBLl7lF1iVTjH7EDxgqeyvMEU8lYf';
let roomData = [];

const roomInfo = axios({
  method: 'GET',
  url: api,
  responseType: 'json',
  headers: {
    Authorization: `Bearer ${token}`
  },
})
  .then(function (response) {
    if (response.status === 200) {
      roomData = response.data.room[0];
      console.log(response);
      console.log(roomData);
      heading();
      gallery();
      shortDesc();
      amenities();
      openModal();

      // datepicker.js
      createDatePicker({
        root: document.querySelector('.start-date-picker'),
      });
      createDatePicker({
        root: document.querySelector('.end-date-picker'),
      });

    } else {
      throw new Error('Something went wrong!');
    }
  })
  .catch(function (error) {
    console.log('錯誤',error);
  });


  function gallery() {
    const highlight = document.querySelector('.gallery-hightlight');
    const preview = document.querySelector('.room-preview');
    highlight.src = roomData.imageUrl[0];
    let str = '';


    function previews() {
      const previews = document.querySelectorAll('.room-preview img');
      previews.forEach( preview => {
        preview.addEventListener('click', function() {
          highlight.src = this.src;
          previews.forEach(preview => preview.classList.remove('room-active'));
          preview.classList.add('room-active');
        });
      });
    }

    roomData.imageUrl.forEach( (img, index) => {
      if (index === 0){
        str += `
          <img src="${img}" class="room-active">
        `; 
      } else {
        str += `
          <img src="${img}">
        `;
      }
      
    });
    preview.innerHTML = str;

    previews();
  }

  function shortDesc() {
    const description = document.querySelector('.info-wrap');
    // const descText = document.querySelector('.desc-text');
    const obj = roomData.descriptionShort;

    console.log(obj['Bed'])
    const template = `
      <div class="short-desc">
        <h3 class="heading">Bed</h3>
        <h3 class="content">${obj['Bed'].length}</h3>
      </div>
      <div class="short-desc">
        <h3 class="heading">Footage</h3>
        <h3 class="content">${obj['Footage']}<small>ft</small></h3>
      </div>
      <div class="short-desc">
        <h3 class="heading">Max Guest</h3>
        <h3 class="content">${obj['GuestMax']}</h3>
      </div>
      <div class="short-desc">
        <h3 class="heading">Min Guest</h3>
        <h3 class="content">${obj['GuestMin']}</h3>
      </div>
      <div class="short-desc">
        <h3 class="heading">Bath</h3>
        <h3 class="content">${obj['Private-Bath']}</h3>
      </div>
    `;
    description.innerHTML = template;
    // descText.textContent = roomData.description;
  }
  
  function heading() {
    const heading = document.querySelector('#action .wraper');
    const template = `
      <div class="title">${ roomData.name}</div>
      <div class="price"><h4>Price</h4><p>$${ roomData.normalDayPrice }</p></div>
      <a href="#modal" class="modal-trigger">Book Now</a>
    `;

    heading.innerHTML = template;
  }

  function amenities() {
    const desc = document.querySelector('#description .desc-wrap .left');
    const ul = document.querySelector('.amenities');
    const obj = roomData.amenities;

    const leftTemplate = `
      <h3>Description</h3>
      <p class="desc-text">
        ${ roomData.description }
      </p>
      <br>
      <h3>Check In/Out</h3>
      <div class="detail"><h4>Check-in</h4><p> ${roomData.checkInAndOut['checkInEarly']} ~ ${roomData.checkInAndOut['checkInLate']}</p></div>
      <div class="detail"><h4>Check-out</h4><p> ~ ${roomData.checkInAndOut['checkOut']}</p></div>

      <br>
      <h3>Bed(s)</h3>
      <div class="detail"><h4>Size</h4><p>${ roomData.descriptionShort.Bed.map( item => item).join(', ')}</p></div>
      
      <br>
      <h3>Pricing</h3>
      <div class="detail"><h4>Mon - Fri</h4><p> $1500</p></div>
      <div class="detail"><h4>Weekends</h4><p>$1300</p></div>
    `;
    
    const rightTemplate = `
      <li><i class="fas fa-wind fa-2x ${!obj['Air-Conditioner'] ? 'fade' : ''}"></i> <h4>A/C</h4> </li>
      <li><i class="fas fa-coffee fa-2x ${!obj['Breakfast'] ? 'fade' : ''}"></i> <h4>Breakfast</h4> </li>
      <li><i class="fas fa-child fa-2x ${!obj['Child-Friendly'] ? 'fade' : ''}""></i> <h4>Child Friendly</h4> </li>
      <li><i class="fas fa-mountain fa-2x ${!obj['Great-View'] ? 'fade' : ''}""></i> <h4>Great View</h4> </li>
      <li><i class="fas fa-wine-glass-alt fa-2x ${!obj['Mini-Bar'] ? 'fade' : ''}""></i> <h4>Mini Bar</h4> </li>
      <li><i class="fas fa-wine-glass-alt fa-2x ${!obj['Pet-Friendly'] ? 'fade' : ''}""></i> <h4>Pet Friendly</h4> </li>
      <li><i class="fas fa-stroopwafel fa-2x ${!obj['Refrigerator'] ? 'fade' : ''}""></i> <h4>Refrigerator</h4> </li>
      <li><i class="fas fa-concierge-bell fa-2x ${!obj['Room-Service'] ? 'fade' : ''}""></i> <h4>Room Service</h4> </li>
      <li><i class="fas fa-smoking-ban fa-2x ${!obj['Smoke-Free'] ? 'fade' : ''}""></i> <h4>Smoke Free</h4> </li>
      <li><i class="fas fa-couch fa-2x ${!obj['Sofa'] ? 'fade' : ''}"></i> <h4>Sofa</h4> </li>
      <li><i class="fas fa-tv fa-2x ${!obj['Television'] ? 'fade' : ''}""></i> <h4>Television</h4> </li>
      <li><i class="fas fa-wifi fa-2x ${!obj['Wi-Fi'] ? 'fade' : ''}""></i> <h4>Free Wifi</h4> </li>
    `;
    ul.innerHTML = rightTemplate;
    desc.innerHTML = leftTemplate;
  }


  function closeModal() {
    const closeBtn = document.querySelector('.modal-close');
    closeBtn.addEventListener('click', function(e){
      this.parentNode.parentNode.classList.remove('open');
    })

  }

  function openModal() {
    let modalTrigger = document.querySelectorAll('.modal-trigger');
    console.log(modalTrigger);
    modalTrigger.forEach( trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href').substr(1);
        console.log(target);

        const modalWindow = document.getElementById(target);
        
        if (modalWindow.classList) {
          modalWindow.classList.add('open');
        }
      });
    })
    closeModal();
    bookRoom();
  }

  function submitForm(e) {
    e.preventDefault();
    console.log('submit form');
    let booking = {};
    let bookingDateRange = [];
    const startDate = document.querySelector('.start-date-picker .date-picker .selected-date').dataset.value
    const endDate = document.querySelector('.end-date-picker .date-picker .selected-date').dataset.value
    const nameInput = document.querySelector('input[name="name"]');
    const phoneInput = document.querySelector('input[name="phone"]');
    const helpText = document.querySelector('#helpText');
    let setupDate = new Date(startDate);
    let i = startDate;

    console.log(startDate);
    console.log(endDate);
    // console.log(dateRange);


    // 轉換 ISO 格式 ＋ 修正 TimezoneOffset 時區偏移
    function toISOLocal(d) {
      var z  = n =>  ('0' + n).slice(-2);
      var zz = n => ('00' + n).slice(-3);
      var off = d.getTimezoneOffset();
      var sign = off < 0? '+' : '-';
      off = Math.abs(off);
    
      return d.getFullYear() + '-'
             + z(d.getMonth()+1) + '-' +
             z(d.getDate()) + 'T' +
             z(d.getHours()) + ':'  + 
             z(d.getMinutes()) + ':' +
             z(d.getSeconds()) + '.' +
             zz(d.getMilliseconds()) +
             sign + z(off/60|0) + ':' + z(off%60); 
    }
    
    console.log(toISOLocal(new Date()));

    const addDays = (date, days = 1) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);

      console.log('addDays()  result: ', result)

      return result;
    };
    
    // recursive fuction: put date range into array
    const dateRange = (start, end, range = []) => {

      console.log('dateRange()  起始日: ', start)
      console.log('dateRange()  結束日: ', end)

      if (start > end) return range;

      const next = addDays(start, 1);
      console.log('addDays()  下一日: ', next);

      return dateRange(next, end, [...range, start]);
    };
    
    const range = dateRange( new Date(startDate), new Date(endDate) );
    
    bookingDateRange = range.map(date => toISOLocal(date).slice(0, 10));
    booking = {
      name: nameInput.value,
      tel: phoneInput.value,
      date: bookingDateRange
    }

    if (nameInput.value.trim() === '' || phoneInput.value.trim() === '') {
      helpText.textContent = '** Name and phone field cannot be empty';
      return;
    }

    postAPI(nameInput.value, phoneInput.value, bookingDateRange);
  }


  function postAPI(name, tel, date) {
    console.log(name, tel, date);
    axios({
        method: 'POST',
        url: api,
        responseType: 'json',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: {name, tel, date}
        // data: {
        //   name: "William K",
        //   tel: "1123445",
        //   date: ["2020-08-25", "2020-08-26"]
        // }
      })
      .then(function (response) {
      console.log(response);
      if (response.status === 200){
        console.log('訂房成功')
        const modal = document.querySelector('#modal');
        const popup = document.querySelector('#popup');
        modal.classList.remove('open');

        window.setTimeout(( () => popup.classList.add('open') ), 500);
        window.setTimeout(( () => popup.classList.remove('open') ), 2500);
      }
      })
      .catch(function (error) {
        console.log('錯誤',error);
      });
  }

  function bookRoom() {
    const submit = document.querySelector('#login-btn');
    submit.addEventListener('click', submitForm);
  }



  // const datePickerEl = document.querySelector('.date-picker');
  // const selectedDateEl = document.querySelector('.date-picker .selected-date');
  // const datesEl = document.querySelector('.date-picker .dates');
  // const mthEl = document.querySelector('.date-picker .dates .month .mth');
  // const prevMthEl = document.querySelector('.date-picker .dates .month .prev-mth');
  // const nextMthEl = document.querySelector('.date-picker .dates .month .next-mth');  
  // const daysEl = document.querySelector('.date-picker .dates .days');

  // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // let date = new Date();
  // let day = date.getDate();
  // let month = date.getMonth();
  // let year = date.getFullYear();

  // console.log('date: ', date);
  // console.log('day: ', day);
  // console.log('month: ',month);
  // console.log('year: ', year);
  // console.log('months[month]', months[month]);
  // let selectedDate = date;
  // let selectedDay = day;
  // let selectedMonth = month;
  // let selectedYear = year;

  // mthEl.textContent = `${months[month]} ${year}`;
  // selectedDateEl.textContent = formatDate(date);
  // selectedDateEl.dataset.value = dataSetFormat(selectedDate);
  
  // datePickerEl.addEventListener('click', toggleDatePicker);
  // prevMthEl.addEventListener('click', goPrevMonth);
  // nextMthEl.addEventListener('click', goNextMonth);


  // populateDates(selectedMonth, selectedYear);

  // function toggleDatePicker(e) {
  //   console.log('點擊 date picker');
  //   // console.log('e.path: ', e.path);
  //   if (!checkEventPathForClass(e.path, 'dates')){
  //     datesEl.classList.toggle('active');
  //   }
  // }



  // function goPrevMonth(e) {
  //   console.log(e);
  //   month--; // 本月份 ex: 7 - 1 = 6 (July)
  //   if (month < 0) {
  //     month = 11;
  //     year--;
  //   }
  //   mthEl.textContent = `${months[month]} ${year}`;
    
  //   console.log('go to prev month---------------')
  //   console.log('month: ', month, months[month], 'year: ', year);
  //   console.log('getTotalDays: ',getTotalDays(month, year))
  //   console.log('--------------------')
  //   populateDates(month, year);
  // }
  
  // function goNextMonth(e) {
  //   console.log(e);
  //   month++; // 本月份 ex: 7 + 1 = 8 (September)
  //   if (month > 11) {
  //     month = 0; // month 11 => December, 12 歸零 => January
  //     year++; // 歸零時跳到下一年
  //   }
  //   mthEl.textContent = `${months[month]} ${year}`;

  //   console.log('go to next month---------------')
  //   console.log('month: ', month, months[month], 'year: ', year);
  //   console.log('getTotalDays: ',getTotalDays(month, year))
  //   console.log('--------------------')

  //   populateDates(month, year);
  // }

  // function populateDates(selectedMth, selectedYr) {
  //   console.log('populateDate------------');
  //   console.log('selectedMth: ', selectedMth, ' ', months[selectedMth]);
  //   console.log('selectedYr: ', selectedYr);
  //   console.log('getTotalDays(amountDays): ', getTotalDays(selectedMth, selectedYr));
  //   console.log('------------------');

  //   daysEl.innerHTML = '';
  //   let amountDays = getTotalDays(selectedMth, selectedYr);
  //   console.log('amountDays: ', amountDays)
  //   // let amountDays = 31;
  //   // if (month === 1) {
  //   //   amountDays = 28;
  //   // }

  //   for (let i = 0; i < amountDays; i++) {
  //     const dayElement = document.createElement('div');
  //     dayElement.classList.add('day');
  //     dayElement.textContent = i + 1;
  //     // console.log('i + 1: ', i+1)

  //     if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
  //       dayElement.classList.add('selected');
  //     }

  //     dayElement.addEventListener('click', function() {
  //       console.log('---- 選取 day DIV---')
  //       selectedDate = new Date(year + '-' + (month+1) + '-' + (i+1));
  //       console.log('selectedDate: ', selectedDate);
  //       selectedDay = (i + 1);
  //       console.log('selectedDay: ', selectedDay);
  //       selectedMonth = month;
  //       console.log('selectedMonth: ', selectedMonth);
  //       selectedYear = year;
  //       console.log('selectedYear: ', selectedYear);

  //       selectedDateEl.textContent = formatDate(selectedDate);
  //       console.log('timeformat: ', dataSetFormat(selectedDate));
  //       selectedDateEl.dataset.value = dataSetFormat(selectedDate);
  //       populateDates(selectedMth, selectedYr);
  //     });

  //     daysEl.appendChild(dayElement);
  //   }
  // }
  // // 37:53
  // // HELPER FUNCTION
  // function getTotalDays(month, year) {
  //   console.log('getTotalDays() ---------')
  //   console.log('month: ', month+1, '月')
  //   console.log('year: ', year)
  //   console.log('-------------------------')
  //   return new Date(year, month+1, 0).getDate();
  // }

  // function dataSetFormat(d) {
  //   const year = d.getFullYear();
  //   const month = d.getMonth()+1;
  //   const day = d.getDate();
  //   return [year, month, day].join("-");
  // }

  // function formatDate(d) {
  //   let day = d.getDate();
  //   // 如果 '日' 小於 10 數字前補上 0 => 08
  //   if (day < 10) {
  //     day = `0${day}`;
  //   }

  //   let month = d.getMonth() + 1;
  //   if (month < 10) {
  //     month = `0${month}`;
  //   }
  //   let year = d.getFullYear();
  //   // return `${day}/${month}/${year}`;
  //   return `${month} / ${day} / ${year}`;
  //   // return `${month}-${day}-${year}`;
  // }

  // function checkEventPathForClass(path, selector) {
  //   for (let i = 0; i < path.length; i++) {
  //     if (path[i].classList && path[i].classList.contains(selector)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }













// console.log('start');

// setTimeout( () => {
//   console.log('非同步')
// });

// console.log('end');

// let data = {}

// console.log('開始');

// axios.get('https://randomuser.me/api/')
//   .then(function(response) {
//     data = response;
//   });

// console.log(data);


// Instead of this
// const promise = new Promise()

// do this
// const promise = new Promise((resolve, reject) => {
//   reject('FAIL');
// })  

// function promise() {
//   return new Promise( (resolve, reject) => {
//     const num = Math.random() > 0.5 ? 1 : 0;

//     if (num) {
//       resolve('Succeed');
//     }
//     reject('FAILED');
//   })
//   .then( success => {
//     console.log('成功')
//   })
//   .catch( fail => {
//     console.log('失敗')
//   })
//   // .then( (success) => {
//   //   console.log('成功')
//   // }, (fail) => {
//   //   console.log('失敗')
//   // })
// };
// promise();

// const num = Math.random() > 0.5 ? 1 : 0;
// function promise(num) {
//   return new Promise((resolve, reject) => {
//     num ? resolve(`${num}, 成功`) : reject('失敗');
//   });
// }
// promise(num);

