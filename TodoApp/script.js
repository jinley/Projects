// js에서 각 element 접근
const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

// todo 데이터 담을 배열 생성

let todos = [];

createBtn.addEventListener('click', createNewTodo);


function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = {
        id: new Date().getTime(), // unique number 생성
        text: '', 
        complete: false
    }

    // 배열 처음에 새로운 아이템 추가
    todos.unshift(item); 
    
    // 요소 생성하기
    const { itemEl, inputEl, editBtnEl, removeBtnEl } = createTodoElement(item);

    // 리스트 요소 안에 생성한 아이템 요소 추가
    list.prepend(itemEl); // 
    
    // disabled 속성 제거
    inputEl.removeAttribute('disabled'); 
    // input 요소에 focus
    inputEl.focus();

    saveToLocalStorage (); // 아이템 추가 시마다 로컬스토리지에 저장
}

/* <div class="item">
	<input type="checkbox" />
	<input 
		type="text" 
		value="Todo content goes here" 
		disabled />
	<div class="actions">
		<button class="material-icons">edit</button>
		<button class="material-icons remove-btn">remove_circle</button>
	</div>
</div> */
function createTodoElement (item) {
   const itemEl = document.createElement('div'); 
   itemEl.classList.add('item');

   const checkboxEl = document.createElement('input'); // 체크박스 인풋 생성
   checkboxEl.type = 'checkbox';
   checkboxEl.checked = item.complete; // 새로고침 시에도 체크박스 표시 지속

   if(item.complete) {
        itemEl.classList.add('complete');
   }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText ='remove_circle'; 

    actionsEl.append(editBtnEl); 
	actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);

    itemEl.append(actionsEl);

    //Events
    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked

        if(item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }

        saveToLocalStorage(); // 새로고침 시에도 체크박스 표시 기록을 보이도록 함
   })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage(); 
    })

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    // 데이터 제거
    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id!== item.id); 
        
        itemEl.remove(); 
        saveToLocalStorage(); 
    })


    return { itemEl, inputEl, editBtnEl, removeBtnEl };

}

function saveToLocalStorage() {
    const data = JSON.stringify(todos); 
    // window.localStorage.setItem('my_todos', data); *window 객체는 생략해서 사용 가능
    localStorage.setItem('my_todos', data); 
}

// 데이터 로딩 함수
function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');

    if(data) { 
        todos = JSON.parse(data); 
    }
}

function displayTodos () {
    loadFromLocalStorage(); 

        for (let i = 0; i < todos.length; i++) { 
            const item = todos[i];
            const { itemEl } = createTodoElement(item);

            list.append(itemEl); 
        }
}

displayTodos(); 


