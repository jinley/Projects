import React from 'react'

export default function Form({handleSubmit, value, setValue}) {
  console.log('Form Component');

    const handleChange = (e) => {
        setValue(e.target.value);
        // 글 입력 시 state 변경 / e.target = 이벤트가 발생한 요소 / value: 해당 요소의 현재 값(사용자가 입력한 텍스트)
      }


  return (
    <form onSubmit={handleSubmit} className='flex pt-2'>
    <input 
        type='text' 
        name='value' // input요소의 이름
        className='w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow'
        placeholder='해야 할 일을 입력하세요.'
        value={value} // 요소의 초기값. state 내 value 값을 value로 보여줌(화면에 반영)
        onChange={handleChange} // 글 입력 시 onChange 호출
    />
    <input className='p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover: bg-blue-200'// 버튼으로 할 수도 있지만 여기선 input으로 함
        type='submit'
        value='입력'
    />
  </form>
  );
}
