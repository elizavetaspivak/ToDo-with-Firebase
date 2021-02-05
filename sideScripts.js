//Поля входа
const inputSignInLogin = document.querySelector('#inputSignInLogin')
const inputSignInPassword = document.querySelector('#inputSignInPassword')
const signInBtn = document.querySelector('#signInBtn')

//Поля регистрации
const inputSignUpLogin = document.querySelector('#inputSignUpLogin')
const inputSignUpPassword = document.querySelector('#inputSignUpPassword')
const signUpBtn = document.querySelector('#signUpBtn')

const signIn = document.querySelector('.signInBut')
const signUp = document.querySelector('.signUpBut')

const windowSignIn = document.querySelector('#signIn')
const windowSignUp = document.querySelector('#signUp')

const logOut = document.querySelector('.logout')


signIn.addEventListener('click', ()=> {
    document.querySelectorAll('.startWindow').forEach(item => item.classList.remove('open'))
    windowSignUp.classList.add('open')
})

signUp.addEventListener('click', ()=> {
    document.querySelectorAll('.startWindow').forEach(item => item.classList.remove('open'))
    windowSignIn.classList.add('open')
})

createTodoButton.addEventListener('click', (e) => {
    e.preventDefault()
    pushTodo(uid,createTodoInput.value)
})


signUpBtn.addEventListener('click', (e) => {
    e.preventDefault()
    createAccount(inputSignUpLogin.value, inputSignUpPassword.value)
})

signInBtn.addEventListener('click',(e) => {
    e.preventDefault()
    signInAccount(inputSignInLogin.value, inputSignInPassword.value)
})

logOut.addEventListener('click', (e) =>{
    e.preventDefault()
    logOutAccount()
})

filterTodo.addEventListener('change', (e) =>{
    filter = e.target.value;
    render()
})