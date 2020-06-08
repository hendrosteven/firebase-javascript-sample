// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCC9kTeItWK4ClqpudjGXSipDsKOGww6kk",
    authDomain: "mytodolist-9e5f4.firebaseapp.com",
    databaseURL: "https://mytodolist-9e5f4.firebaseio.com",
    projectId: "mytodolist-9e5f4",
    storageBucket: "mytodolist-9e5f4.appspot.com",
    messagingSenderId: "644674559840",
    appId: "1:644674559840:web:3a3ddc66404c3b70414805"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var todosRef = firebase
    .database()
    .ref()
    .child('todos');

var todoList = document.getElementById('todoList');

todosRef.on('value', function (todos) {
    var temp = '';
    todos.forEach(function (todo) {
        todoItem = todo.val();
        if (!todoItem.isDone) {
            temp += '<p><label class=\'undone\'>' + todoItem.todo + '</label> <button onclick=\'updateTodo(\"' + todo.key + '\",true,\"' + todoItem.todo + '\")\'>done</button></p>'
        }else{
            temp += '<p><label class=\'done\'>' + todoItem.todo + '</label> <button onclick=\'updateTodo(\"' + todo.key + '\",false,\"' + todoItem.todo + '\")\'>undone</button><button onclick=\'removeTodo(\"'+todo.key+'\")\'>remove</button></p>'
        }
    });
    todoList.innerHTML = temp;
});

document
    .getElementById('myTodoListForm')
    .addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
    e.preventDefault();

    var todo = document
        .getElementById('txtTodo')
        .value;
    saveTodo(todo);

    document
        .getElementById('myTodoListForm')
        .reset();
}

function saveTodo(todoName) {
    var newTodo = todosRef.push();
    newTodo.set({todo: todoName, isDone: false});
}

function updateTodo(key, status, todoName) {
    firebase
        .database()
        .ref('todos/' + key)
        .set({isDone: status, todo: todoName});
}

function removeTodo(key){
    firebase.database().ref('todos/'+key).remove();
}