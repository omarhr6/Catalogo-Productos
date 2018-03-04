/**
 * @file Funcionamiento del login
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

// Initialize Firebase
'use strict';

/* global firebase */

//Variables globales
var getUserName,getAvatar;

//Init
$(function(){
    //Configuracion del firebase
    var config = {
        apiKey: 'AIzaSyCWWHGvlwmLddjSZPOCClk9zAaGmRfMw2Y',
        authDomain: 'catalogo-productos-47c96.firebaseapp.com',
        databaseURL: 'https://catalogo-productos-47c96.firebaseio.com',
        projectId: 'catalogo-productos-47c96',
        storageBucket: '',
        messagingSenderId: '732112312215'
    };
    firebase.initializeApp(config);

    cargarEventosLogin();

});

/**
 * Cargar informacion usuario
 */
function cargarInfoUsuario(){
    //Cargar la info del usuario logeado
    if(window.localStorage.length>0){
        getUserName = localStorage.getItem('nombre');
        getAvatar = localStorage.getItem('avatar');
        $('.user-no-login').hide();
        $('.user-login').show();
        $('.user-info #user-name').empty();
        $('.user-info #user-photo').empty();
        $('.user-info #user-name').text(getUserName);
        $('.user-info #user-photo').css('background-image', 'url('+getAvatar+')');
    } else {
        $('.user-no-login').show();
        $('.user-login').hide();
    }

}

/**
 * Carga los eventos de los botones login y logout
 */
function cargarEventosLogin(){
    $('#btn-google').on('click', function(){
        loginGmail();
    });

    $('#btn-facebook').on('click', function(){
        loginFacebook();
    });


    $('#btn-twitter').on('click', function(){
        loginTwitter();
    });

    $('#btn-github').on('click', function(){
        loginGithub();
    });

    $('.user-log-out span').on('click',function() {
        logout();
    });

}

/**
 * Logearse con cuenta de google
 */
function loginGmail(){
    // Authentication Google
    var providerGoogle = new firebase.auth.GoogleAuthProvider();
    //Language Settings
    firebase.auth().useDeviceLanguage();
    // Register Popup
    firebase.auth().signInWithPopup(providerGoogle).then(function(result){
        if (result.credential) {
            //Esconder los botones de login y registro
            // User Data
            var user = result.user;
            var userName = user.displayName;
            var avatar = user.photoURL;
            localStorage.setItem('nombre',userName);
            localStorage.setItem('avatar',avatar);
            window.location.href = '../index.html';
            console.log('Estas conectado con google.');
            /* Supuesto caso de mostrar el avatar y nombre de usuario*/

        }
    }).catch(function(error) {
        console.log('Ha ocurrido un error:'+error.message);
    });
    // Or register with redirect
    //firebase.auth().signInWithRedirect(providerGoogle
}



/**
 * Logearse con la cuenta de facebook
 */
function loginFacebook(){
    //Authentication Facebook
    var providerFacebook = new firebase.auth.FacebookAuthProvider();
    //Language Settings
    // firebase.auth().languageCode = 'es';
    firebase.auth().useDeviceLanguage();
    // Register Popup
    firebase.auth().signInWithPopup(providerFacebook).then(function(result){
        if (result.credential) {
            var token = result.credential.accessToken;
            //Esconder los botones de login y registro
            // User Data
            var user = result.user;
            var userName = user.displayName;
            var avatar = user.photoURL;
            localStorage.setItem('nombre',userName);
            localStorage.setItem('avatar',avatar);
            window.location.href = '../index.html';
            console.log('Estas conectado con facebook.');
        }
    }).catch(function(error) {
        console.log('Ha ocurrido un error:'+error.message);
    });
}


/**
 * Para logearse con Twitter
 */
function loginTwitter(){
    var providerTwitter = new firebase.auth.TwitterAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(providerTwitter).then(function(result) {
        if(result.credential){
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            // The signed-in user info.
            var user = result.user;
            var userName = user.displayName;
            var avatar = user.photoURL;
            localStorage.setItem('nombre',userName);
            localStorage.setItem('avatar',avatar);
            window.location.href = '../index.html';
            console.log('Estas conectado con Twitter');
        }

    }).catch(function(error) {
        console.log('Algo ha pasado: '+error.message);
    });
}

/**
 * Para logearse con Github
 */
function loginGithub(){
    var providerGithub = new firebase.auth.GithubAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(providerGithub).then(function(result) {
        if(result.credential){
            var token = result.credential.accessToken;
            var secret = result.credential.secret;
            // The signed-in user info.
            var user = result.user;
            var userName = user.providerData[0].displayName;
            var avatar = user.photoURL;
            localStorage.setItem('nombre',userName);
            localStorage.setItem('avatar',avatar);
            window.location.href = '../index.html';
            console.log('Estas conectado con GitHub');
        }

    }).catch(function(error) {
        console.log('Algo ha pasado: '+error.message);
    });
}

/**
 * Cerrar sesion desde cualquier cuenta
 */
function logout(){
    firebase.auth().signOut().then(function() {
        alert('Se ha cerrado la sesion con exito.');
        $('.user-login').hide();
        $('.user-no-login').show();
        localStorage.clear();
    }).catch(function(error) {
        alert('Ha ocurrido un error: '+error.message);
    });
}
