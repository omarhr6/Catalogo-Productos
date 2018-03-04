/**
 * @file Funcionamiento del login
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

'use strict';

/* Variables globales */
var firstname, lastname, email, password;

//Init
$(function () {
    loadEvents();
});

/**
 * Cargar los eventos del registro
 */
function loadEvents() {
    $('#btn-register').click(function () {
        checkFields();
    });

    $('#btn-login').click(function () {
        window.location.href = "login.html";
    });
}

/** 
 * Registrar nuevo usuario con los datos introducidos
 */
function registerUser() {
    var userRegistered = false;

    firstname = $('.first-name').val();
    lastname = $('.last-name').val();
    email = $('.email').val();
    password = $('.password').val();

    var dataUser = [firstname, lastname, email, password];

    // Index para no pisar los usuarios que ya estan registrado en Local Storage 
    var indexUser = localStorage.getItem('indexUser');
    if (indexUser == null) {
        indexUser = 1;
    } else {
        indexUser++;
    }

    for (var i = 1; i <= localStorage.length - 1; i++) {
        var idUser = "Usuario " + i;
        var data = JSON.parse(localStorage.getItem(idUser));
        if (data[2] == dataUser[2]) {
            $('.register-errors-5').css("display", "inline-block");
            $('.register-errors-5').html("El correo introducido ya esta registrado");
            userRegistered = true;
        }
    }

    if (userRegistered == false) {
        localStorage.setItem("Usuario " + indexUser, JSON.stringify(dataUser));
        localStorage.setItem("indexUser", indexUser);
        location.href = "login.html";
    }
}

/**
 * Comprobación de campos de registro
 */
function checkFields() {
    var emailReg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;

    if ($('.first-name').val() == "") {
        $('.register-errors-1').css("display", "inline-block");
        $('.register-errors-1').html("El campo nombre no puede estar vacío");
    } else if ($('.last-name').val() == "") {
        $('.register-errors-2').css("display", "inline-block");
        $('.register-errors-2').html("El campo apellido no puede estar vacío");
    } else if (!emailReg.test($('.email').val())) {
        $('.register-errors-3').css("display", "inline-block");
        $('.register-errors-3').html("El correo introducido es incorrecto");
    } else if ($('.password').val() == "") {
        $('.register-errors-4').css("display", "inline-block");
        $('.register-errors-4').html("El constraseña no puede estar vacío");
    } else {
        registerUser();
    }
}