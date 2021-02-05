let firebaseConfig = {
    apiKey: "AIzaSyDELnCOPIf76ChuzyqrvivY8ACP9fuEKjc",
    authDomain: "reduxpractics.firebaseapp.com",
    databaseURL: "https://reduxpractics-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "reduxpractics",
    storageBucket: "reduxpractics.appspot.com",
    messagingSenderId: "300506784758",
    appId: "1:300506784758:web:83e27a14ebbddbf1b51dd7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const submit = document.querySelector("#send");
const inputLogin = document.querySelector("#inputLogin");
const inputPassword = document.querySelector("#inputPassword");
//Окно workspace
const workspace = document.querySelector('.workspace')
const createTodoInput = document.querySelector('.createTodoInput')
const createTodoButton = document.querySelector('.createTodoButton')
const renderTodos = document.querySelector('.render')


let uid
let data

function createAccount (login, password) {
    firebase.auth().createUserWithEmailAndPassword(login, password)
        .then((user) => {
            checkUser()
        })
}

function signInAccount(login, password){
    firebase.auth().signInWithEmailAndPassword(login, password)
        .then((user) => {
            checkUser()
        })
}

function checkUser(){
    // проверяем состояние авторизации. Если пользователь авторизован, то метод вернёт всю информацию о пользователе, если нет, то вернёт null
    // Когда мы регистрируемся и регистрация проходит успешно, то мы сразу же и авторизуемся
    // А значит меняется состояние авторизации
    // И этот метод вернёт информацию о пользователе
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            //...есть ключ uid, Который содержит в себе id пользователя
            uid = user.uid
            getDataBase(uid)
            document.querySelector('.loginWindow').style.display = 'none'
            workspace.style.display = 'flex'
        }else{
        document.querySelector('.loginWindow').style.display = 'block'
        workspace.style.display = 'none'
        }
    })
}
checkUser()


function getDataBase(){
    //Мы обращаемся к базе данных database(). Потом передаём путь по которому хотим перейти
    firebase.database().ref(`/users/${uid}/todos`).on('value', snp =>{
        if(snp.val()){
            data = snp.val();
        }
        render()
})
}

function pushTodo(uid,text){
    firebase.database().ref(`/users/${uid}/todos`).push().set({
        text: text,
        category: selectOption,
        checked: false
    })
    getDataBase()
}

function render() {
    renderTodos.innerHTML = ''
    for (let key in data) {
        console.log(data[key])
        console.log(data[key].category)
        if(data[key].category === filter){
            renderTodos.insertAdjacentHTML('afterbegin', getTemplate(data, key))
        } else if(filter === 'all'){
            renderTodos.insertAdjacentHTML('afterbegin', getTemplate(data, key))
        }
    }

    document.querySelectorAll('.todoItem').forEach(item => item.addEventListener('click', (e) => {
        if (e.target.dataset.type === 'close') {
            updateTodo('delete', item.dataset.id)
        }
        if (e.target.dataset.type === 'checkbox'){
            updateTodo('updateChecked', item.dataset.id, e.target.checked)
        }
        if (e.target.dataset.type === 'updateTodo'){

        }
    }))
}

function updateTodo(type, id, value) {
    switch (type){
        case 'delete':
            firebase.database().ref(`/users/${uid}/todos/${id}`).remove()
            break
        case 'updateChecked':
            firebase.database().ref(`/users/${uid}/todos/${id}`).update({
                checked: value
            })
            break
        case 'updateTodo':

            break

    }

}

function getTemplate(data, key) {
    return (
`
<div data-id='${key}' class="todoItem">
    <input data-type="checkbox" type="checkbox" ${data[key].checked ? 'checked' : null}>
    <span data-type="close" class='close'>Х</span>
    <span class="content">${data[key].text}</span>
    <p class="item"> Категория : ${data[key].category}</p>
    <hr>
</div>
`
    )
}

function logOutAccount(){
    firebase.auth().signOut()
    checkUser()
}

const filterTodo = document.querySelector('.filterSelect');

let filter = 'all'