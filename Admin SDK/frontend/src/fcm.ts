import { getMessaging, getToken, Messaging } from "firebase/messaging";
import { FirebaseApp } from "firebase/app";

export default class DemoMessaging {

    vapidKey: string;

    messaging: Messaging;

    token?: string;

    constructor(firebaseApp: FirebaseApp, vapidKey: string) {
        this.vapidKey = vapidKey;

        // Initialize Firebase Cloud Messaging and get a reference to the service
        this.messaging = getMessaging(firebaseApp);
    }

    requestToken() {
        // Add the public key generated from the console here.
        getToken(this.messaging, { vapidKey: this.vapidKey }).then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                // ...
                this.token = currentToken
                console.log('current token -> ', this.token)
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
} 
