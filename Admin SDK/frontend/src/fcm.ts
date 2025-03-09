import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { FirebaseApp } from "firebase/app";

export default class DemoMessaging {

    vapidKey: string;

    messaging: Messaging;

    token?: string;

    tokenSaved: boolean = false;

    constructor(firebaseApp: FirebaseApp, vapidKey: string) {
        this.vapidKey = vapidKey;

        // Initialize Firebase Cloud Messaging and get a reference to the service
        this.messaging = getMessaging(firebaseApp);
        this.registerMessageHandler();
    }

    requestToken() {
        // Add the public key generated from the console here.
        getToken(this.messaging, { vapidKey: this.vapidKey }).then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                // ...
                this.token = currentToken
                console.log('current token -> ', this.token)
                this.sendTokenToServer();
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    }

    sendTokenToServer() {
        fetch(
            `${import.meta.env.VITE_BACKEND_ROOT}fcm/save-token/`,
            {
                method: 'POST',
                body: JSON.stringify({ fcm_token: this.token })
            }
        ).then(res => {
            if (res.status === 200) {
                this.tokenSaved = true;
            } else {
                console.log('Unable to set token to backend', res.status)
            }
        }).catch(err => {
            console.log('error while sending token to backend', err)
        });
    }

    registerMessageHandler() {
        console.log('Registering onMessage handler...');
        onMessage(this.messaging, (payload: unknown) => {
            console.log('Message received. ', payload);
            // ...
        });
    }
} 
