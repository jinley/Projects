import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";



// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({}); // modal open 시 movie 정보 보여주는 state

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("request", request);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper 
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 슬라이드 개수
            slidesPerGroup: 6, // 몇개씩 슬라이드 할지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation  // arrow 버튼 사용 유무 
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지 
      >
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <SwiperSlide>
              <img
                key={movie.id}
                style={{ padding: "25px 0" }}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`} // isLargeRow이면 다른 스타일링 적용
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                } `}
                // 영화 포스터 크기가 data 에서 두 종류임. poster_path, backdrop_path
                alt={movie.name}
                onClick={() => handleClick(movie)} // click 시 모달 오픈
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
