import './style.css'
import { firebaseApp } from './firebase.ts'
import DemoMessaging from './fcm.ts'

const fcmMsg = new DemoMessaging(firebaseApp, import.meta.env.VITE_FCM_VAPID_KEY);

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      fcmMsg.requestToken()
    }
  })
}



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="intiialize-fcm" type="button">InitializeFCM</button>
    </div>
  </div>
`;

function init() {
  const btn = document.querySelector<HTMLButtonElement>('#intiialize-fcm')!;
  btn.addEventListener('click', requestPermission);
}

init();