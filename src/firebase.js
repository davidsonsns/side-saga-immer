import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

class Firebase {
  constructor() {
    this.app = !firebase.apps.length
      ? firebase.initializeApp({
          apiKey: process.env.APIKEY,
          authDomain: process.env.AUTHDOMAIN,
          databaseURL: process.env.DATABASEURL,
          projectId: process.env.PROJECTID,
          storageBucket: process.env.STORAGEBUCKET,
          messagingSenderId: process.env.MESSAGINGSENDERID
        })
      : firebase.app();

    this.auth = this.app.auth();
    this.firestore = this.app.firestore();
    this.db = this.app.database();
  }
}

export default new Firebase();
