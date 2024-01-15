//rfc : 함수형 컴포넌트 생성 단축키

import React, {useState} from 'react';

// export default function List() {
const List = React.memo(({
    id, 
    title, 
    completed, 
    todoData, 
    setTodoData, 
    provided, 
    snapshot,
}) => {

    const [isEditing, setIsEditing] = useState(false); // 초기값은 false로 설정
    const [editedTitle, setEditedTitle] = useState(title);

    const handleClick = (id) => {
    
        let newTodoData = todoData.filter(data => data.id !== id);
        setTodoData(newTodoData);
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
        
    };

    const handleCompleteChange = (id) => { // 사용자가 클릭한 리스트의 id를 매개변수로 받아옴
        let newTodoData = todoData.map((data) => {
        if(data.id === id) {
        data.completed = !data.completed; // completed: false면 true로, true이면 false로 바꿔줌 => 항목의 완료 여부를 토글(전환함)
        }
        return data; // 변경된(토글 완료) 리스트를 반환하여 newTodoData에 포함시킴
        });

        setTodoData(newTodoData); // 상태 업데이트 => 리액트는 화면을 리렌더링하여 화면에 변경사항 표시
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
    };

    const handleEditChange = (e) => {
        setEditedTitle(e.target.value);
    }

    const handleSubmit = () => {
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.title = editedTitle;
            }
            return data;
        });
        setTodoData(newTodoData);
        localStorage.setItem("todoData", JSON.stringify(newTodoData));
        setIsEditing(false);
    };

    if (isEditing) { // 텍스트를 편집할 때
        return (
            <div className={`flex items-center jusfity-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 border rounded'`}> {/*리액트에서 리스트 목록 나열 시 key를 통해 데이터를 구별함 */}
                <div className='items-center'>
                    <form onSubmit={handleSubmit}>
                        <input 
                        value={editedTitle}
                        onChange={handleEditChange} // setEiditedTItle을 호출해 이벤트 타겟 value(title)을 바꿔줌
                        className='w-full px-3 py-2 mr-4 text-gray-500 rounded'
                        />
                    </form>
                </div>
                <div className='items-center'> 
                  <button className='px-4 py-2 float-right' onClick={() => setIsEditing(false)} type='button'>x</button>
                  <button onClick={handleSubmit} className='px-4 py-2 float-right' type='submit'>save</button> 
                </div>
            </div>
        )
    } else {
        return (
            <div key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'} 
            flex items-center jusfity-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded'`}> 
                <div className='items-center'>
                  <input 
                  type='checkbox' 
                  defaultChecked={completed} //false
                  onChange={() => handleCompleteChange(id)} 
                  />{" "}
                  <span className={completed ? 'line-through' : undefined}>{title}</span>
                </div>
                <div className='items-center'>
                  <button className='float-right px-4 py-2' onClick={() => handleClick(id)}>x</button> 
                  <button className='float-right px-4 py-2'onClick={() => setIsEditing(true)}>edit</button> 
                </div>
            </div>
          );
    }

});

export default List;