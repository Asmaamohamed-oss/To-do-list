
// Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const select = document.querySelector('.filter-todo')


// EventListener
document.addEventListener('DOMContentLoaded' , getTodo)
todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
select.addEventListener('change' , filterToDo)


// Functions

/************************  Add to DO Item *****************/

function addTodo(e){
      e.preventDefault();

    // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // create li
    const newtoDo = document.createElement('li');
    newtoDo.classList.add('todo-item')
    newtoDo.innerHTML = `${todoInput.value}`
    todoDiv.appendChild(newtoDo);

    //ADD TODO TO LOCALSTORAGE
    saveLocalTODos(todoInput.value);

    // Check Button
    const completedBtn =document.createElement('button')
    completedBtn.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i> `
    completedBtn.classList.add('completed-btn');
    todoDiv.appendChild(completedBtn);

    // trash Button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`
    deleteBtn.classList.add('deleted-btn')
    todoDiv.appendChild(deleteBtn);

    // Append todo List
    todoList.appendChild(todoDiv);

    // clear todo input value
    todoInput.value = "";
}

/****************** Delete and Check*******************/

function deleteCheck(e){
    
    const item = e.target;
    // Delete button
    if(item.classList.contains('deleted-btn')){
            let todo = e.target.parentElement;
            todo.classList.add('fall');

            // localstorage part
            removeLocalTodos(todo);
            //Animation 
            todo.addEventListener('transitionend', function(){
                todo.remove();
            })
        
    }

    // Check button
    if(item.classList.contains('completed-btn')){
        let todo = e.target.parentElement;
        todo.classList.toggle('completed');
    }

}


/*********************** Filtered completed Item***************************/

function filterToDo(e){

    const todos = todoList.children;

  for(let todo of todos){
      let val = e.target.value;
    
    switch(val){
     case "all":
        todo.style.display = 'flex'
        break;

    case  'compeleted' :
    if(todo.classList.contains('completed')){
    todo.style.display = "flex"
    } else{
    todo.style.display = "none"
    };
     break;

    case 'uncompeleted' :
     if(!todo.classList.contains('completed')){
    todo.style.display = "flex"
    } else{
    todo.style.display = "none"
    };
    break; 
      };
  };

};






/************************** SAVE TODOS IN LOCALSTORAGE*******************************/

function saveLocalTODos(todo){

    /***CHECK Do I already Have thing here */

    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo);
    localStorage.setItem('todos' , JSON.stringify(todos));
}


function getTodo(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
          // create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    // create li
    const newtoDo = document.createElement('li');
    newtoDo.classList.add('todo-item')
    newtoDo.innerHTML = todo;
    todoDiv.appendChild(newtoDo);


    // Check Button
    const completedBtn =document.createElement('button')
    completedBtn.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i> `
    completedBtn.classList.add('completed-btn');
    todoDiv.appendChild(completedBtn);

    // trash Button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`
    deleteBtn.classList.add('deleted-btn')
    todoDiv.appendChild(deleteBtn);

    // Append todo List
    todoList.appendChild(todoDiv);
    })
}



function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    // console.log(todo.children[0].innerText);
    // console.log(todos.indexOf('asmaa'))

    const indextodo = todo.children[0].innerText;

    console.log(todos.indexOf(indextodo))
    todos.splice(todos.indexOf(indextodo), 1)
    localStorage.setItem('todos' , JSON.stringify(todos));
}


