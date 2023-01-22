const container = document.querySelector('.container')
const list = document.querySelector('.list')
const input = document.getElementById('input')
const addBtn = document.querySelector('.fa-plus')
const listMaker = document.querySelector(".list-maker");
const h1 = document.querySelector('h1')
const isEmpty = str => !str.trim().length

let todoList = JSON.parse(localStorage.getItem('todoList')) || []

const days = ['Sunday' ,'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
h1.innerText = `Happy ${days[(new Date().getDay())]} ☕📒`

window.addEventListener("load", () => {
    getTodoListFromLocalStorage()
});

const getTodoListFromLocalStorage = () => {
    todoList.forEach((todo)=>{
        createList(todo);
    });
}

addBtn.addEventListener('click', (e) => {
    const isEmpty = str => !str.trim().length
    if(isEmpty(input.value)){
        input.value = ''
        return alert('write something') 
    }    
    
    creatElement = {
        id : new Date().getTime(),
        completed : false,
        text : input.value
    }
    
    createList(creatElement)
    
    todoList.push(creatElement)
    localStorage.setItem('todoList', JSON.stringify(todoList))
    
    input.value = ''
})    

const createList = (createElement) => {
    const {id, completed, text} = createElement

    sec = document.createElement('section')
    sec.setAttribute("id", id);
    boxIcon = document.createElement('i')
    boxIcon.className = "fa-regular fa-square"
    xIcon = document.createElement('i')
    xIcon.className = "fa-solid fa-xmark"
    span = document.createElement('span')
    span.innerText = text

    sec.appendChild(boxIcon)
    sec.appendChild(span)
    sec.appendChild(xIcon)
    list.prepend(sec)

    if(completed){
        sec.children[0].classList.toggle('fa-square-check')
        sec.children[0].classList.toggle('fa-square')
        sec.classList.toggle('dark')
        sec.children[1].classList.toggle('span-line')
    }
}

container.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-square') || e.target.classList.contains('fa-square-check')){{
        e.target.classList.toggle('fa-square-check')
        e.target.classList.toggle('fa-square')
        e.target.closest("section").classList.toggle('dark')
        e.target.nextElementSibling.classList.toggle('span-line')
        todoList.map(x => {
            x.id == e.target.closest('section').id && (x.completed = !x.completed)
        })
        localStorage.setItem('todoList',JSON.stringify(todoList))
    }}
    else if(e.target.classList.contains('fa-xmark')){
        todoList = todoList.filter(l => l.id != e.target.closest('section').id)
        localStorage.setItem('todoList' , JSON.stringify(todoList))
        e.target.closest('section').remove()
    }
})

container.addEventListener('mousemove', (e) => {
    const x = (e.clientX);
    const y = (e.clientY);
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    xdeg = (x - centerX) / (rect.width/2) * (-6);
    ydeg = (centerY -y ) / (rect.height/2) * (-6);
    const depth = 400;
    container.style.transform = `perspective(${depth}px) rotateX(${ydeg}deg) rotateY(${xdeg}deg)`;
})    

input.addEventListener('keyup', (e) => {
    e.code === 'Enter' && addBtn.click()
})