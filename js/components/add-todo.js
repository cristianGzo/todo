import Alert from "./alert.js";
export default class AddTodo{
    constructor(){
        this.btn =document.getElementById('add');
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.date = document.getElementById('datePicker');

        this.alert= new Alert('alert'); 
    }
    
    

    onClick(callback){
        this.btn.onclick = () =>{
            if(title.value === '' || description.value === ''){
                //alert.classList.remove('d-none');
                //alert.innerText='Title and description are require';
                  //  return;
                  this.alert.show('Title and description are required');
            }else{
                this.alert.hide();
              /*  flatpickr(this.date, {
                    dateFormat: "d/m/Y", // Formato de la fecha
                    minDate: "today", // Fecha mínima seleccionable
                    defaultDate: "today", // Fecha por defecto
                    disableMobile: true // Desactiva el modo móvil
                });*/
                callback(this.title.value, this.description.value, this.date.value);
            }
        }
    }
}