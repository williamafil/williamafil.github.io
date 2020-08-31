let data = [];
let roomData = [];
const token = 'kkc1YuXLPcBEPNQl4iMbEfy0GzRcr05lBLl7lF1iVTjH7EDxgqeyvMEU8lYf';

function getRoomData(){
  const roomsElement = document.querySelector('#rooms .wrap');
  const api = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';

  async function getData() {
    try {
      let response = await axios({
        method: 'GET',
        url: api,
        responseType: 'json',
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      if (response.status === 200) {
        data = response.data.items;
        roomFunc(data);
      } else {
        throw new Error('Something went wrong!');
      }   
      return response.data;
    }
    catch (err) {
      console.error(err);
    }
  }

  getData()
  .then(res => {
    roomData = [];

    data.forEach(room => {
      let roomApi = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${room.id}`;
      const roomInfo = axios({
        method: 'GET',
        url: roomApi,
        responseType: 'json',
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then(function (response) {
        roomData.push(response);
      })
      .catch(function (error) {
        console.log('錯誤 Room',error);
      });
    });
  })

  function roomFunc(rooms) {
    let str = '';
    for( let room of rooms){
      str = str + `
        <article data-id="${room.id}" class="room" onclick="openRoomModal(this)">
          <img src="${room.imageUrl}">
          <div class="desc">
            <h2>${room.name}</h2>
            <p></p>
          </div>
        </article>
      `;
    }
    roomsElement.innerHTML = str;
  }
}

function postAPI(id, name, tel, date) {
  let roomApi = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`;
  axios({
      method: 'POST',
      url: roomApi,
      responseType: 'json',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: {name, tel, date}
    })
    .then(function (response) {
      if (response.status === 200){
        console.log('訂房成功')
        const modal = document.querySelector('#modal');
        const popup = document.querySelector('#popup');
        // modal.classList.remove('open');
        popup.classList.add('open');

        window.setTimeout(( () => popup.classList.add('open') ), 500);
        window.setTimeout(( () => popup.classList.remove('open') ), 2500);
        window.setTimeout(( () => {
          let closeBtn = document.querySelector('.modal-close');
          closeModalEvent(closeBtn);
        }), 3500); 
      }
    })
    .catch(function (error) {
    });
    getRoomData();
}

function closeModalEvent(element) {
  let event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  })
  let canceled = !element.dispatchEvent(event)
}