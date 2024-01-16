import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useDebounce } from "../../hooks/useDebounce";
import './SearchPage.css';

export default function SearchPage() {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const searchTerm = query.get('q');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect( () => {
    if(debouncedSearchTerm) {
        fetchSearchMovie(debouncedSearchTerm);
    }
    }, [debouncedSearchTerm]); // searchTerm 이 변할 때마다 fetchSearchMovie 함수를 호출

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}` // adult movie는 제외(false)
            );
            console.log(request);
            setSearchResults(request.data.results);
        } catch (error) {
            console.log('error', error);
        }
    
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className='search-container'>
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== 'person') {
                        const movieImageUrl = 
                        'https://image.tmdb.org/t/p/w500' + movie.backdrop_path
                        return(
                            <div className='movie' key={movie.id}>
                                <div onClick={() => navigate(`/${movie.id}`)}
                                className='movie__column-poster'
                                >
                                    <img 
                                    src={movieImageUrl} alt='movie'
                                    className='movie__poster'
                                    />
                                </div>
                            </div>
                        )
                    }
                })}
            </section>
        ) : (
        <section className='no-results'>
            <div className='no-results__text'>
                <p>
                    찾고자 하는 검색어 '{debouncedSearchTerm}'에 맞는 영화가 없습니다. 
                </p>
            </div>
        </section>
        )
    }


    return renderSearchResults();

}
