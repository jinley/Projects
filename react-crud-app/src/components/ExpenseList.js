import React from 'react'
import "./ExpenseList.css";
import ExpenseItem from './ExpenseItem';
import { MdDelete } from "react-icons/md";

const ExpenseList = ( {expenses, handleDelete, handleEdit, clearItems } ) => {
  return (
    <>
        <ul className="list">
            {/* Expense Item */}
            {expenses.map(expense => { // expense배열에 map으로 각 ExpenseItem을 생성하고 ul 내에 렌더링함
                return (
                    <ExpenseItem
                        expense={expense} // expenses를 순회하는 각 요소를 expense라고 함
                        key={expenses.id} // 고유한 키값 필요
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                )
            })}
        </ul>

        <button className='btn' onClick={clearItems}>
          목록 지우기 <MdDelete className='btn-icon'/>
        </button>
      
    </>
  )
}

export default ExpenseList
