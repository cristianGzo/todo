import Alert from "./alert.js";
export default class Modal{
    constructor(){
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.btn = document.getElementById('modal-btn');
        this.date= document.getElementById('modal-date');
        this.completed = document.getElementById('modal-completed');
        this.alert= new Alert('modal-alert');
        this.todo= null;
    }

    //para recuperar los datos a modificar en el modal
    setValues(todo){
        this.todo=todo;
        this.title.value=todo.title;
        this.description.value=todo.description;
        this.date.value=todo.date;
        this.completed.checked=todo.completed;
    }

    onClick(callback){
        this.btn.onclick = () =>{
            if(!this.title.value || !this.description.value ){
                  this.alert.show('Title and description are required');
                    return;
                }
                $('#modal').modal('toggle');

                callback(this.todo.id, {
                    title: this.title.value,
                    description: this.description.value,
                    date: this.date.value,
                    completed: this.completed.checked,

                });
        }
    }
}