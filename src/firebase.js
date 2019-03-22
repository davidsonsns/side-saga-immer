import firebase from 'firebase/app';
import 'firebase/auth';
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
    this.db = this.app.database();
  }
}

export default new Firebase();
