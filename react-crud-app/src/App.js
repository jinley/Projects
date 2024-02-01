
import { useState } from 'react'
import "./App.css";
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert.js";


const App = () => {

  const [alert, setAlert] = useState({show: false});

  const handleAlert = ({type, text}) => { // type, text 는 파라미터값임. 함수에 전달되는 값으로, 함수 호출 시 전달됨
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false })
    }, 7000);
  }
  // setTimeout의 첫 번째 인자로는 함수(타이머가 끝나면 실행될 함수)가 와야 함
  /* 화살표함수가 아닌 일반함수로 쓴다면 아래와 같음. 즉, 화살표 함수를 쓰는 건 setAlert를 함수로 감싸주기 위함이다.
  setTimeout(function() {
  setAlert({ show: false });
}, 7000);
  */

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState(0);
  

  // handleCharge, handleAmount : 사용자의 입력값을 처리 (원래 입력 자체 - 입력값을 받아오는 것- 를 처리하기 위한 함수가 따로 있음)
  // 없다면, 사용자의 입력 처리를 위한 이벤트 핸들러 함수가 없으므로 상호작용이 일어나지 않음

  const handleCharge = (e) => {
    console.log(e.target.value);
    setCharge(e.target.value);
  }


  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber)
  }

  const handleEdit = id => {
    // 클릭한 item 을 찾아 반환하여 expense 라고 함
    const expense = expenses.find(item => item.id === id); // 요소(item)에 대해 뒤에 조건식이 일치하는 값을 반환
    // expense 객체에서 필요한 charge, amount 값을 변수로 할당함
    const { charge, amount } = expense; // 구조 분해 할당
    /*구조 분해 할당을 사용하지 않을 때
    const charge = expense.charge;
    const amount = expense.amount;
    */
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }

  const [expenses, setExpenses] = useState([
    { id: 1, charge: '렌트비', amount: 1600 },
    { id: 2, charge: '교통비', amount: 400 },
    { id: 3, charge: '식비', amount: 1200 }
  ]) // useState(초기값)


  const handleDelete = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id) // 미삭제 아이템 list 만 반환됨
    setExpenses(newExpenses);
    handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.' })
  }

  const handleSubmit = (e) => {
    // 0. 새로고침 시 작동 방지
    e.preventDefault(); 
    // 1. charge, amount에 값이 입력 시
    if (charge !== '' && amount > 0) {
      // 1-1. edit 모드일 시
      if (edit) {
        const newExpenses = expenses.map(item => { // expenses 객체에서 수정된 item을 id로 찾아 수정값을 업데이트
          return item.id === id ? {...item, charge, amount} : item 
          // 전개연산자에서는 동일한 값이 추가될 경우 해당 속성값으로 대체됨(item 객체에 charge, amount 값을 새로 넣으면 새 값으로 대체)
          // 수정 안된 item 값은 그대로 반환
        })
        setExpenses(newExpenses); // 새 비용으로 초기화
        setEdit(false); // edit 모드 되돌리기
        handleAlert({ type: 'success', text: '아이템이 수정되었습니다.' });
      } else { // 1-2. 새로운 item 생성 시
        const newExpense = { id: crypto.randomUUID(), charge, amount}
        // 불변성을 지켜주기 위해서 새로운 expenses를 생성
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        handleAlert({ type: 'success', text: '아이템이 추가되었습니다.' });
      }
      setCharge('');
      setAmount(0);
    } else { // 2. 값 미입력 시
      console.log('error');
      handleAlert({
        type: 'danger',
        text: '항목은 빈 값일 수 없으며 비용은 0보다 커야 합니다.'
      })
    }
  }

  const clearItems = () => {
    setExpenses([]);
  }


  return (
    <div>
      <main className='main-container'>
        {alert.show ? <Alert type={alert.type} text={alert.text} /> : null }
        <h1>예산 계산기</h1>

        {/* ExpenseForm */}
        <div style ={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
          <ExpenseForm
            charge={charge}
            handleCharge={handleCharge}
            amount={amount}
            handleAmount={handleAmount}
            edit={edit}
            handleSubmit={handleSubmit}
          />
        </div>

        {/* ExpenseList */}
        <div style ={{width: '100%', backgroundColor: 'white', padding: '1rem'}}>
          <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
          <p style={{fontSize: '2rem'}}>
            총 지출:
            <span>
              {expenses.reduce((acc, curr) => {
                return (acc += curr.amount);
              }, 0)}
              원</span>
          </p>
        </div>


      </main>
      
      
    </div>
  )
}

export default App

