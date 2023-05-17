//para poder importar la clase primero se debe exportar
export default class Model{
    constructor(){
        this.view=null;
        this.todos=JSON.parse(localStorage.getItem('todos'));
        if(!this.todos || this.todos.length<1){
            this.todos=[{
                id:0,
                title: 'Learn js',
                description: 'watch JS tutorials',
                completed: false,
                date:'',

            }]
            this.currentId=1;
        }else{
            this.currentId= this.todos[this.todos.length -1].id + 1;
        }
    }

    setView(view){
        this.view=view;
    }
    save(){
        //stringify convierte un objeto js en una cadeta json
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos(){
        ///map crea un array a partir de un array original
        return this.todos.map((todo) => ({...todo}));
    }


    findTodo(id){
        return this.todos.findIndex((todo) => todo.id === id);
    }

    toggleCompleted(id){
        const index= this.findTodo(id);
        const todo=this.todos[index]; 
        todo.completed=!todo.completed;
        this.save();

    }
    editTodo(id, values){
        const index= this.findTodo(id);
        Object.assign(this.todos[index], values);
    }

    addTodo(title, description, date){
        const todo= {
            id: this.currentId++,
            title,
            description,
            completed: false,
            date,        
        }
        this.todos.push(todo);
       /// return Object.assign({}, todo);
       console.log(this.todos);
       this.save();
       return {...todo};
       
    }
    removeTodo(id){
        const index= this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }
    
    
    dates(id,cadena){
        const index= this.findTodo(id);
       // this.todos['date']=
        const todo=this.todos[index];
        todo.date=cadena;
        this.save();
        

/* Inicializa Flatpickr y asigna el elemento input
        flatpickr(datePicker, {
        dateFormat: "d/m/Y", // Formato de la fecha
        minDate: "today", // Fecha mínima seleccionable
        defaultDate: "today", // Fecha por defecto
        disableMobile: true // Desactiva el modo móvil
});*/
    }
}