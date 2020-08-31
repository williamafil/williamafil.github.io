function scrollable() {
  let scrollableElement = document.getElementById('simple-bar');
  new SimpleBar(scrollableElement);
}

// function onScrolled(visibleStart, visibleEnd) {
//   console.log('onScrolled: ' + visibleStart + ', ' + visibleEnd)
// }

function closeModal() {
  const closeBtn = document.querySelector('.modal-close');
  closeBtn.addEventListener('click', function(e){
    this.parentNode.parentNode.classList.remove('open');
  })
}

function openRoomModal(e) {
  const modalWindow = document.getElementById('modal');
  const elementId = e.dataset.id;
  let info = roomData.find( item => item.data.room[0].id === elementId );
  const booking = info.data.booking.map(item => item.date);
  const {amenities, checkInAndOut, description, descriptionShort, holidayPrice, id, imageUrl, name, normalDayPrice} = info.data.room[0];

  if (modalWindow.classList) {
    modalWindow.classList.add('open');
  }

  scrollable();
  closeModal();
  gallery(imageUrl);
  renderContent(elementId, booking, {amenities, checkInAndOut, description, descriptionShort, holidayPrice, id, name, normalDayPrice});
}

function gallery(imageUrl) {
  const highlight = document.querySelector('.gallery-hightlight');
  const preview = document.querySelector('.room-preview');
  highlight.src = imageUrl[0];
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

  imageUrl.forEach( (img, index) => {
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

function renderContent(elementId, booking, {amenities, checkInAndOut, description, descriptionShort, holidayPrice, name, normalDayPrice}) {
  const contentElement = document.querySelector('#rendered-content');  
  contentElement.innerHTML = '';

  const template = `
    <section id="heading">
      <div class="wrapper">
        <div class="title">${name}</div>
        <div class="price"><h4>Price</h4><p>$${ normalDayPrice }</p></div>
        <button class="collapsible" onclick="collapsible()">Book Now</button>
      </div> 
    </section>
    <section id="booking" class="collapsible-content">
      <div class="wrapper">
        <div class="checkin-checkout">
          <div id="check-in"></div>
          <div id="check-out"></div>
        </div>
        <br>
        <div class="info-container">
          <form class="book" data-id="${elementId}">
            <small id="helpText" class="form-text text-muted"></small>
            <div class="form-group">
              <label for="name">Contact Name:</label>
              <input type="text" class="contact-name" name="name" id="name" placeholder="Enter your name">
            </div>
            <div class="form-group">
              <label for="phone">Contact Number:</label>
              <input type="text" class="contact-number" name="phone" id="phone" placeholder="Enter your phone number">
            </div>
            <div class="form-group">
              <button id="login-btn" type="submit" class="btn btn-outline-light bg-secondary">Submit</button>
            </div>
          </form> 
        </div>
        <br>
      </div>
    </section>
    <section id="info">
      <div class="wrapper">
        <div class="short-desc">
          <h3 class="heading">Bed</h3>
          <h3 class="content">${descriptionShort['Bed'].length}</h3>
        </div>
        <div class="short-desc">
          <h3 class="heading">Footage</h3>
          <h3 class="content">${descriptionShort['Footage']}<small>ft</small></h3>
        </div>
        <div class="short-desc">
          <h3 class="heading">Max Guest</h3>
          <h3 class="content">${descriptionShort['GuestMax']}</h3>
        </div>
        <div class="short-desc">
          <h3 class="heading">Min Guest</h3>
          <h3 class="content">${descriptionShort['GuestMin']}</h3>
        </div>
        <div class="short-desc">
          <h3 class="heading">Bath</h3>
          <h3 class="content">${descriptionShort['Private-Bath']}</h3>
        </div>
      </div>
    </section>
    <section id="description">
      <div class="wrapper">
        <div class="left">
        <h3>Description</h3>
        <p class="desc-text">
          ${ description }
        </p>
        <br>
        <h3>Check In/Out</h3>
        <div class="detail"><h4>Check-in</h4><p> ${checkInAndOut['checkInEarly']} ~ ${checkInAndOut['checkInLate']}</p></div>
        <div class="detail"><h4>Check-out</h4><p> ~ ${checkInAndOut['checkOut']}</p></div>
  
        <br>
        <h3>Bed(s)</h3>
        <div class="detail"><h4>Size</h4><p>${ descriptionShort.Bed.map( item => item).join(', ')}</p></div>
        
        <br>
        <h3>Pricing</h3>
        <div class="detail"><h4>Mon - Fri</h4><p> $${normalDayPrice}</p></div>
        <div class="detail"><h4>Weekends</h4><p>$${holidayPrice}</p></div>
        </div>
        <div class="right">
          <h3>Amenities</h3>
          <ul class="amenities">
            <li><i class="fas fa-wind fa-2x ${!amenities['Air-Conditioner'] ? 'fade' : ''}"></i> <h4>A/C</h4> </li>
            <li><i class="fas fa-coffee fa-2x ${!amenities['Breakfast'] ? 'fade' : ''}"></i> <h4>Breakfast</h4> </li>
            <li><i class="fas fa-child fa-2x ${!amenities['Child-Friendly'] ? 'fade' : ''}""></i> <h4>Child Friendly</h4> </li>
            <li><i class="fas fa-mountain fa-2x ${!amenities['Great-View'] ? 'fade' : ''}""></i> <h4>Great View</h4> </li>
            <li><i class="fas fa-wine-glass-alt fa-2x ${!amenities['Mini-Bar'] ? 'fade' : ''}""></i> <h4>Mini Bar</h4> </li>
            <li><i class="fas fa-wine-glass-alt fa-2x ${!amenities['Pet-Friendly'] ? 'fade' : ''}""></i> <h4>Pet Friendly</h4> </li>
            <li><i class="fas fa-stroopwafel fa-2x ${!amenities['Refrigerator'] ? 'fade' : ''}""></i> <h4>Refrigerator</h4> </li>
            <li><i class="fas fa-concierge-bell fa-2x ${!amenities['Room-Service'] ? 'fade' : ''}""></i> <h4>Room Service</h4> </li>
            <li><i class="fas fa-smoking-ban fa-2x ${!amenities['Smoke-Free'] ? 'fade' : ''}""></i> <h4>Smoke Free</h4> </li>
            <li><i class="fas fa-couch fa-2x ${!amenities['Sofa'] ? 'fade' : ''}"></i> <h4>Sofa</h4> </li>
            <li><i class="fas fa-tv fa-2x ${!amenities['Television'] ? 'fade' : ''}""></i> <h4>Television</h4> </li>
            <li><i class="fas fa-wifi fa-2x ${!amenities['Wi-Fi'] ? 'fade' : ''}""></i> <h4>Free Wifi</h4> </li>
          </ul>
        </div>
      </div>
    </section>  
  `;
  contentElement.innerHTML = template;
  datePicker({
    root: document.querySelector('#check-in'),
    booking,
  });
  datePicker({
    root: document.querySelector('#check-out'),
    booking
  });

  bookRoom();
}

function bookRoom() {
  const submit = document.querySelector('#login-btn');
  submit.addEventListener('click', submitForm);
}

function submitForm(e) {
  e.preventDefault();
  let booking = {};
  let bookingDateRange = [];
  const startDate = document.querySelector('#check-in .simple-date-picker .selected-date').dataset.value;
  const endDate = document.querySelector('#check-out .simple-date-picker .selected-date').dataset.value;
  const nameInput = document.querySelector('.info-container .book input[name="name"]');
  const phoneInput = document.querySelector('.info-container .book input[name="phone"]');
  const helpText = document.querySelector('#helpText');
  const id = e.target.parentNode.parentNode.dataset.id;
  
  if (!startDate || !endDate) {
    helpText.textContent = '** Please select check-in and checkout date';
    return;
  } else if (startDate === endDate) {
    helpText.textContent = '** Please select check-in and checkout date';
    return;
  }

  // 取下一個日期
  const addDays = (date, days = 1) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  
  // recursive fuction: put date range into array
  const dateRange = (start, end, range = []) => {
    if (start > end) return range;
    const next = addDays(start, 1);
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
  postAPI(id, nameInput.value, phoneInput.value, bookingDateRange);
}

function collapsible() {
  let content = document.querySelector('.collapsible-content');
  content.classList.toggle('.active');
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}