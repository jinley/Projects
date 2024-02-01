import React from 'react'
import "./ExpenseForm.css";
import { MdSend } from "react-icons/md";


const ExpenseForm = ( { edit, charge, amount, handleCharge, handleAmount, handleSubmit } ) => {
  return (
    <form onSubmit={handleSubmit}>
        <div className='form-center'>
            <div className='form-group'>
                <label htmlFor='charge'>지출 항목</label>
                <input 
                    type='text'
                    className='form-control'
                    id='charge'
                    name='charge' // 폼 데이터가 서버로 전송될 때 해당 데이터를 식별하는 데 사용됨
                    value={charge}
                    placeholder='예) 렌트비'
                    onChange={handleCharge} // 값 입력 변경 시 handleCharge 함수 호출
                />
            </div>
            <div className='form-group'>
                <label htmlFor='amount'>비용</label>
                <input 
                    type='number'
                    className='form-control'
                    id='amount'
                    name="amount"
                    value={amount}
                    placeholder='예) 100'
                    onChange={handleAmount}
                />
            </div>
        </div>
        <button type='submit' className='btn'>
            {edit ? "수정" : "제출" }
            
            <MdSend className='btn-icon' />
        </button>
    </form>
  )
}

export default ExpenseForm
