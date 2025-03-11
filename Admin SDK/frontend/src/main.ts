import './style.css'
import { firebaseApp } from './firebase.ts'
import DemoMessaging from './fcm.ts'

let csrfToken: string;
let fcmMsg: DemoMessaging;

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
      `${import.meta.env.VITE_BACKEND_ROOT}fcm/send-message/`, { credentials: 'include' }).then(res => {
        console.log('Requesting message done', res.status)
      }).catch(err => {
        console.log('error while requesting for message to backend.', err)
      });
  } else {
    console.warn('The token has not been saved to the backend yet.')
  }
}

async function initializeCsrfToken() {
  console.log('Fetching csrf token...');
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_ROOT}fcm/csrf-token/`, { credentials: 'include' });
    console.log('Fetched csrf token', res.status);

    if (res.status === 200) {
      const data = await res.json();
      console.log('csrf token data ->', data);
      csrfToken = data.csrfToken;
    }
  } catch (err) {
    console.log('error while fetching csrf token from backend.', err)
  };
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button disabled id="intiialize-fcm" type="button">InitializeFCM</button>
      <button disabled id="request-msg" type="button">Request Dummy Message</button>
    </div>
  </div>
`;

function init() {
  initializeCsrfToken().then(() => {
    fcmMsg = new DemoMessaging(firebaseApp, import.meta.env.VITE_FCM_VAPID_KEY, csrfToken);

    const initBtn = document.querySelector<HTMLButtonElement>('#intiialize-fcm')!;
    initBtn.addEventListener('click', requestPermission);
    initBtn.disabled = false;

    const reqMsgBtn = document.querySelector<HTMLButtonElement>('#request-msg')!;
    reqMsgBtn.addEventListener('click', requestMessage);
    reqMsgBtn.disabled = false;
  });
}

init();