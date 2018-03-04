/**
 * @file Funcionamiento del login
 * @author Teodoro Sergio Reverón Afonso
 * @author Omar Hernández Reyes
 * @author Adrián Expósito Tofano
 */

// Initialize Firebase
'use strict';

/* global firebase */

/* Variables globales */
var firstname,lastname,email,password;

//Init
$(function(){
    cargarEventosRegister();
});

/**
 * Cargar los eventos del registro
 */
function cargarEventosRegister(){
    $('btn-register').click(function(){

    });
}

// Boton que te redirige al formulario de registro
$('#someButton').click(function() {
    window.location.href = '/some/new/page';
    return false;
});
