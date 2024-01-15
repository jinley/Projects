import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo(({todoData, setTodoData, handleClick}) => {
  console.log('Lists Component');
    
  const handleEnd = (result) => {
    console.log('result', result); // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함

    if(!result.destination) return; // 목적지가 없으면(이벤트 취소) 이 함수를 종료
    
    const newTodoData = [...todoData]; // 리액트의 불변성을 지켜주기 위해 새로운 투두데이터 생성
    
    // 1. 변경시키는 아이템을 배열에서 지워줌
    // 2. retrun 값으로 지워진 아이템을 잡아줌
    const [reorderedItem] = newTodoData.splice(result.source.index, 1); // source 부분에 해당하는 항목(리스트) 1개를 삭제

    // 원하는 자리에 reoderItem을 insert함
    newTodoData.splice(result.destination.index, 0, reorderedItem); // destination index에서 0개를 삭제하고 삭제했던 reorderedItem을 넣어줌
    setTodoData(newTodoData); // 새로운 투두데이터로 셋팅
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  }
  
  return (
    <div>
    <DragDropContext onDragEnd={handleEnd}>
      <Droppable droppableId='to-dos'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
          {todoData.map((data, index) => ( // todoData 내에 생성된 데이터를 map()을 통해 구현 / data: todoData배열에서 각각의 할 일 항목을 나타내는 매개변수
            <Draggable
              key={data.id}
              draggableId={data.id.toString()}
              index={index}
            >
              {(provided, snapshot) => (  
                <List   /*List컴포넌트에 필요한 것들을 내려준다*/
                  handleClick={handleClick}
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  completed={data.completed}
                  todoData={todoData}
                  setTodoData={setTodoData}
                  provided={provided}
                  snapshot={snapshot}
                />

              )}
            </Draggable>
          ))}
          {provided.placeholder}
          </div>
        )}
      </Droppable>  
    </DragDropContext>      
  </div>
  );
});

export default Lists

