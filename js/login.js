/* global firebase */

// Initialize Firebase
'use strict';

var config = {
    apiKey: 'AIzaSyCWWHGvlwmLddjSZPOCClk9zAaGmRfMw2Y',
    authDomain: 'catalogo-productos-47c96.firebaseapp.com',
    databaseURL: 'https://catalogo-productos-47c96.firebaseio.com',
    projectId: 'catalogo-productos-47c96',
    storageBucket: '',
    messagingSenderId: '732112312215'
};
firebase.initializeApp(config);

//Language Settings
// firebase.auth().languageCode = 'es';
firebase.auth().useDeviceLanguage();
// Register Popup
firebase.auth().signInWithPopup(provider);

// Authentication Google
var provider = new firebase.auth.GoogleAuthProvider();
//Authentication Facebook
var providerFacebook = new firebase.auth.FacebookAuthProvider();
