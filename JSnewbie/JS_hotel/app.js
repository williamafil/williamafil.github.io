const roomsDiv = document.querySelector('#rooms');
const api = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
const token = 'kkc1YuXLPcBEPNQl4iMbEfy0GzRcr05lBLl7lF1iVTjH7EDxgqeyvMEU8lYf';
let data = [];
const loc = window.location.pathname;
const dir = loc.substring(0, loc.lastIndexOf('/'));
const currentUrl = `${window.location.origin}${dir}`

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
      console.log(response.data.items);
      data = response.data.items;
      roomFunc(data);
    } else {
      throw new Error('Something went wrong!');
    }
  })
  .catch(function (error) {
    console.log('錯誤',error);
  });


  const roomFunc = (rooms) => {
    let str = '';
    for( let room of rooms){
      console.log(room.name);
      str = str + `
        <div class="room">
          <a href="${currentUrl}/showroom.html?id=${room.id}">
            <img src="${room.imageUrl}">
          </a>
          <div class="text">
              <div class="stars">OOOOOO</div>
              <h2 class="title">${room.name}</h2>
              <p class="price">$${room.normalDayPrice}</p>
            
          </div>
        </div>
      `;
      // roomsDiv.innerHTML = str;
    }

    roomsDiv.innerHTML = str;
  }