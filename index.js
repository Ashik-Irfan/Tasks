//Model
// If localstorage has a todos array, then use it
// Otherwise use the default array.
let Todos;
// Retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem('Todos'));
// Check if it's an array
if (Array.isArray(savedTodos)) {
    Todos = savedTodos;
} 
else {
Todos = [{
    title: 'Get groceries',
    dueDate: '2021-10-04',
    id: 'id1'
},
{
    title: 'Wash car',
    dueDate: '2021-02-03',
    id: 'id2'
},
{
    title: 'Make dinner',
    dueDate: '2021-03-04',
    id: 'id3'
}];
}
function saveTodos(){
    localStorage.setItem('Todos',JSON.stringify(Todos));
}
//Function to update the todo value.
function update_Todo(){
    //accessing the entered values from the user.
    const title = document.getElementById('update_title').value;
    const dueDate = document.getElementById('update_dueDate').value;
    Todos = Todos.filter(Todo =>{
        if (Todo.isediting === true){
            Todo.title = title;
            Todo.dueDate = dueDate;
            Todo.isediting = false;//Updating the condition.
            return true;
        }
        else{
            return true;
        }
    })
    saveTodos();
    render();
}
//Function to add new todo to the array.
function append_Todo(title_value,dueDate_value){
    Todos.push({
        title:title_value,
        dueDate:dueDate_value,
        id:''+new Date().getTime()//Adding the current time in milliseconds as the element id.
    })
    saveTodos();
}
//Function to remove the todo from the array using the id.
function del_Todo(del_id){
    Todos = Todos.filter(function (Todo){
        if(del_id === Todo.id){
            return false;
        }
        else{
            return true;
        }
    })
    saveTodos();
}
//Function to mark the value that has to be changed.
//isediting is used as a marker.
function change_Todo(edit_id){
    Todos.filter(function (Todo){
        if(edit_id === Todo.id){
            Todo.isediting = true;
        }
        else{
            Todo.isediting = false;
        }
    })
    saveTodos();
}
//view
const Todo_list = document.getElementById('Todo_list');
render();
//function to render the content.
function render(){
    //Resetting the content to null.
    Todo_list.innerHTML='';
    //Looping through the array.
    Todos.forEach(Todo => {
        //if the content has to be updated the below layout renders.
        //else the default layout renders.
        if (Todo.isediting === true){
            const element = document.createElement('div');
            element.id = Todo.id;
            //text-box
            const edit_title = document.createElement('input');
            edit_title.setAttribute("type", "text");
            edit_title.id = 'update_title';
            element.appendChild(edit_title);
            //due-date
            const edit_dueDate = document.createElement('input');
            edit_dueDate.setAttribute("type", "date");
            edit_dueDate.id = 'update_dueDate';
            element.appendChild(edit_dueDate);
            //save-button
            const save_button = document.createElement('button');
            save_button.innerText = 'SAVE';
            save_button.onclick = update_Todo;
            element.appendChild(save_button);
            Todo_list.appendChild(element);
        }
        //default layout.
        else{
            const element = document.createElement('div');
            element.innerText = Todo.title+' - '+Todo.dueDate;
            element.id = Todo.id;
            //Edit Button
            const alt_Todo = document.createElement('button');
            alt_Todo.innerText = 'Edit';
            alt_Todo.onclick = edit_Todo;
            alt_Todo.id = Todo.id;
            element.appendChild(alt_Todo);
            //Delete button
            const delete_Todo = document.createElement('button');
            delete_Todo.innerText = 'Delete';
            delete_Todo.onclick = remove_Todo;
            delete_Todo.id = Todo.id;
            element.appendChild(delete_Todo);
            Todo_list.appendChild(element);
        }
    });
}
            
//controller
function add_new_todo(){
    const title = document.getElementById('new-Todo').value;
    const dueDate = document.getElementById('new-dueDate').value;
    append_Todo(title,dueDate);
    render();
}
function remove_Todo(event){
    const del_id = event.target.id;
    del_Todo(del_id);
    render();
}
function edit_Todo(){
    const edit_id = event.target.id;
    change_Todo(edit_id);
    render();
}