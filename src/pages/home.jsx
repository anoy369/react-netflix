import React from 'react'
import Main from '../components/main'
import Hero from '../components/hero'
import Row from '../components/row'
import SavedShows from '../components/saved-shows'
import requests from '../requests'
import './home.css'

const Home = () => { 

    return (
    <div>
        {/* <Main /> */}
        <Hero />
        <div className="mainContent">
        {/* <SavedShows /> */}
        <Row rowID='1' title='Up Coming' fetchURL={requests.requestUpcoming} />
        <Row rowID='2' title='Popular' fetchURL={requests.requestPopular} />
        <Row rowID='3' title='Trending' fetchURL={requests.requestTrending} />
        <Row rowID='4' title='Top Rated' fetchURL={requests.requestTopRated} />
        <Row rowID='5' title='Horor' fetchURL={requests.requestHorror} />
        </div>
    </div>
    )
}
 
export default Home