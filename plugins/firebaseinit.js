import firebase from 'firebase'
import VueFire from 'vuefire'
import Vue from 'vue'


const config = {
    apiKey: "AIzaSyBdGJFzbXvBrOasQCuIQKh55COkOv39Mt8",
    authDomain: "psda-tf-itb.firebaseapp.com",
    databaseURL: "https://psda-tf-itb.firebaseio.com",
    projectId: "psda-tf-itb",
    storageBucket: "psda-tf-itb.appspot.com",
    messagingSenderId: "261769602450"
}


!firebase.apps.length ? firebase.initializeApp(config) : ''
Vue.use(VueFire)
// export const auth = firebaseApp.auth();
// export const DB = firebaseApp.database();
// export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
// export default firebaseApp;