import React from 'react'
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import requests from '../../api/requests';


export default function MainPage() {
  return (
    <div>
        <Banner />
        <Row
            title='NETFLIX ORIGINALS'
            id='NO'
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow // 첫 행만 다른 크기이므로 크기 구별 위함
        />

        <Row title='Trending Now' id='TN' fetchUrl={requests.fetchTrending} />
        <Row title='Trending Rate' id='TR' fetchUrl={requests.fetchTopRated} />
        <Row title='Action Movies' id='AM' fetchUrl={requests.fetchActionMovies} />
        <Row title='Comedy Movies' id='Cm' fetchUrl={requests.fetchComedyMovies} />
    </div>
  )
}
