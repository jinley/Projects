
import React, {useState} from 'react'; // react 라이브러리에서 useState를 가져와야 쓸 수 있음
import "./App.css"; // App.css에 연결
import Lists from './components/Lists'
import Form from './components/Form';

const initialTodoData = localStorage.getItem('todoData') ? JSON.parse(localStorage.getItem('todoData')) : []; 
// 저장된 데이터가 있으면 JSON.parse로 가져오고 없으면 빈 배열 반환

export default function App() { // 컴포넌트를 사용할 수 있도록 class에서 extends
  console.log('App Component');

  const [todoData, setTodoData] = useState(initialTodoData); 
  const [value, setValue] = useState(''); // value도 처음에는 빈 스트링 값임(타이핑 시 입력되는 값)

  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(), // unique값
      title: value,
      completed: false, // 처음 투두리스트 추가 시 completed = false 상태
    }

    // 원래 있던 할 일에 새로운 할 일 추가하기
      // 전개연산자를 통해 원래 있던 투두데이터에 새로운 데이터 연결 / value: 입력된 데이터를 추가한 후 텍스트를 input창에서 없애주기
    setTodoData((prev) => [...prev, newTodo]); // hooks에서는 이전 상태 state를 불러올 때 인수에 함수를 이용함
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    
    setValue('')
  }

    const handleRemoveClick = () => {
      setTodoData([]);
      localStorage.setItem('todoData', JSON.stringify([]));
    }

    return( // JSX에서의 클래스는 className으로 지정
      <div className="flex items-center justify-center w-screen h-screen bg-blue-100">  
        <div className='w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg' >
        <div className='flex justify-between mb-3'>
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData}/> 
        {/* 자녀 컴포넌트에 props로 내려주기 위함. todoData, setTodoData는 List컴포넌트 뿐만 아니라 
        다른 컴포넌트에서도 쓰이므로 컴포넌트로 따로 분류하지 않고 props를 씀*/}

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} /> 
    
        </div> 
      </div>
    )
};