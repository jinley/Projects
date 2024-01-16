import React, {useState, useEffect} from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            // console.log('window.scrollY', window.scrollY);
            if(window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });

        return () => {
         window.removeEventListener('scroll', () => {});
        };
    }, []); // dependencies가 빈 배열일 시 처음 렌더링 시에만 실행

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`) // input 검색창에 입력하는 값(searchTerm)이 상단 Url입력창에도 동시에 입력됨
    };

return (
    <nav className={`nav ${show && 'nav_black'}`}> 
    {/* JavaScript에서 true && expression은 항상 expression으로 평가되고 false && expression은 항상 false로 평가 
        show = true이면 nav_black 반환, show = false 이면 건너뛰어 그냥 nav가 됨
    */}
        <img 
            alt='Netflix logo'
            src= "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            className='nav_logo'
            onClick={() => window.location.reload()}
        />

        <input 
        value={searchValue} 
        onChange={handleChange} 
        className='nav__input' 
        type='text'
        placeholder='영화를 검색해주세요.'
        />

        <img 
            alt='User logged'
            src= "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            className='nav-avatar'
        />
    </nav>
);
 
 
}

