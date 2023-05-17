import AddTodo from './components/add-todo.js';
import Modal from './components/modal.js';
import Filters from './components/filters.js';

export default class View{
    constructor(){
        this.model=null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddTodo();
        this.modal = new Modal();
        this.filters= new Filters();
       
        this.addTodoForm.onClick((title,description,date) => this.addTodo(title, description,date));
        this.modal.onClick((id, values) => this.editTodo(id, values));
        this.filters.onClick((filters)=> this.filter(filters));
    }
    
    setModel(model){
        this.model=model;
    }

    render(){
        const todos = this.model.getTodos();
        /*for(const todo of todos){
            this.createRow(todo)
        }*/
        todos.forEach((todo) => this.createRow(todo));
    }

    filter(filters){
        const {type, words}= filters;
        const [, ...rows]= this.table.getElementsByTagName('tr');
        for(const row of rows){
            const [title, description, completed]= row.children;
            let shouldHide= false;
            if(words){
                shouldHide=!title.innerText.includes(words) && !description.innerText.includes(words);
            }

            const shouldBeCompleted= type ==='completed';
            const isCompleted= completed.children[0].checked;

            if(type !== 'all' && shouldBeCompleted !== isCompleted){
                shouldHide= true;
            }
            if(shouldHide){
                row.classList.add('d-none');
            }else{
                row.classList.remove('d-none');
            }
           
        }
    }

    //este metodo agrega al modelo "db"
    addTodo(title, description, date){
        const todo =this.model.addTodo(title, description, date);
        this.createRow(todo);
    }

    toggleCompleted(id){
        this.model.toggleCompleted(id);
    }

    editTodo(id, values){
       this.model.editTodo(id, values);
       const row =document.getElementById(id);
       row.children[0].innerText= values.title;
       row.children[1].innerText= values.description;
       row.children[2].children[0].checked= values.completed;
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();

    }
    calendar(id){
        this.model.date(id,row.children[3].innerText= this.calendar.value);
        const row =document.getElementById(id);
        alert(row.children[3].innerText= this.calendar.value);
        
    }

    createRow(todo){
        const row=table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML= `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class="text-center">
            
        </td>
        <td>${todo.date}</td>
            <td class="text-right">
            
            
            
        </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        /*calendario este es el que estoy modificando
        const calendar = document.createElement('input');
        calendar.type='text';
        calendar.id='datePicker';
        calendar.placeholder="Ajuste la fecha";
        const valor=calendar.value;
        flatpickr(calendar, {
            dateFormat: "d/m/Y", // Formato de la fecha
            minDate: "today", // Fecha mínima seleccionable
            defaultDate: "today", // Fecha por defecto
            disableMobile: true // Desactiva el modo móvil
        });
        calendar.onClick=()=> this.calendar(todo.id);
        row.children[3].appendChild(calendar);*/

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML= '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues({
            id: todo.id,
            title: row.children[0].innerText,
            description: row.children[1].innerText,
            completed: row.children[2].children[0].checked,
        });
        row.children[4].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML= '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        
        row.children[4].appendChild(removeBtn);
    }
}