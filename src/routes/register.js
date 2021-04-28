const from = document.getElemenntById('reg-form')
form.addEventListener('submit',registerUser)

async function registerUser(event){
    event.preventDefault()
    const username = document.getElemenntById('username').value
    const password = document.getElemenntById('password').value

    const result =await fetch('/api/register', {
        method：'POST', 
        headers: {'Content-Type': 'application/json'},
        
}