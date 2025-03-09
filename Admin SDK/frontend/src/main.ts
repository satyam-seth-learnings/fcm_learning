import './style.css'
import { firebaseApp } from './firebase.ts'
import DemoMessaging from './fcm.ts'

const fcmMsg = new DemoMessaging(firebaseApp, import.meta.env.VITE_FCM_VAPID_KEY);

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      fcmMsg.requestToken();
    }
  })
}

function requestMessage() {
  console.log('Requesting message...');
  if (fcmMsg.tokenSaved) {
    fetch(
      `${import.meta.env.VITE_BACKEND_ROOT}fcm/send-message/`).then(res => {
        console.log('Requesting message done', res.status)
      }).catch(err => {
        console.log('error while requesting for message to backend.', err)
      });
  } else {
    console.warn('The token has not been saved to the backend yet.')
  }
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="intiialize-fcm" type="button">InitializeFCM</button>
      <button id="request-msg" type="button">Request Dummy Message</button>
    </div>
  </div>
`;

function init() {
  const initBtn = document.querySelector<HTMLButtonElement>('#intiialize-fcm')!;
  initBtn.addEventListener('click', requestPermission);

  const reqMsgBtn = document.querySelector<HTMLButtonElement>('#request-msg')!;
  reqMsgBtn.addEventListener('click', requestMessage);
}

init();