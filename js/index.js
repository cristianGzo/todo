import Model from './model.js';
import View from './view.js';


//esto lo que hace es retrasar el .js hasta que todo el html se haya cargado
//para que se carguen todos los documentos
//DOMCcontent es el documento en forma de objetos de html
document.addEventListener('DOMContentLoaded', () =>{ 
    const model= new Model();
    const view = new View();
    model.setView(view);
    view.setModel(model);
    view.render();

    //lineas para inicializar el calendario
    const date=document.getElementById('datePicker');
    flatpickr(date, {
        dateFormat: "d/m/Y", // Formato de la fecha
        minDate: "today", // Fecha mínima seleccionable
        defaultDate: "today", // Fecha por defecto
        disableMobile: true // Desactiva el modo móvil
    });
});