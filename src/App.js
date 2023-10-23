import { useEffect, useState } from 'react'
import axios from 'axios'
import {MoviesBoard} from './components/MoviesBoard'
import CircularProgress from '@mui/material/CircularProgress';
import {NavigateBar} from './components/NavigateBar'
import Pagination from '@mui/material/Pagination'
import './style/app.css'

export const App = () => {
  const API_KEY = '2c46288716a18fb7aadcc2a801f3fc6b'
  const [option, setOption] = useState('popular')
  const [popularMovies, setPopularMovies] = useState([])
  const [streamNowMovie, setStreamNowMovie] = useState([])
  const [myFavoriteMovies, setMyFavoriteMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [popularCurrentPage, setPopularCurrentPage] = useState(1)
  const [streamNowCurrentPage, setStreamNowCurrentPage] = useState(1)

  useEffect(() => {
    setPopularCurrentPage(1)
    setStreamNowCurrentPage(1)
  }, [option])

  useEffect(() => {
    if(option === 'popular') {
      getPopularMovies()
    } else if(option === 'stream-now') {
      getWhichMovieIsStreamNow()
    }
    else {
      getFavoriteMovies()
    }
  }, [option, popularCurrentPage, streamNowCurrentPage])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(myFavoriteMovies))
  }, [myFavoriteMovies])

  const getPopularMovies = () => {
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${popularCurrentPage}` 
    axios.get(apiUrl).then((response) => {
      setPopularMovies(response.data.results)
      setLoading(false)
    }).catch((error) => {
      setError(error)
      setLoading(false)
    })
  }

  const getWhichMovieIsStreamNow = () => {
    setLoading(true)
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${streamNowCurrentPage}`
    axios.get(apiUrl).then((response) => {
      setStreamNowMovie(response.data.results)
      setLoading(false)
    }).catch((error) => {
      setError(error)
      setLoading(false)
    })
  }

  const getFavoriteMovies = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setMyFavoriteMovies(savedFavorites)
  }

  const handleChangePopular = (event, value) => {
    setPopularCurrentPage(value)
  };

  const handleChangeStreamNow = (event, value) => {
    setStreamNowCurrentPage(value)
  };

  return (
    <div className="app-container">
      <NavigateBar setOption={setOption}/>
      {
        loading ? <div className='center-content'><CircularProgress color="inherit" /></div> :
        option === 'popular' ? <MoviesBoard movies={popularMovies}
                                            myFavoriteMovies={myFavoriteMovies}
                                            setMyFavoriteMovies={setMyFavoriteMovies} /> :
        option === 'stream-now' ? <MoviesBoard movies={streamNowMovie}
                                                myFavoriteMovies={myFavoriteMovies}
                                                setMyFavoriteMovies={setMyFavoriteMovies}/> : 
        myFavoriteMovies.length > 0 ? <MoviesBoard movies={myFavoriteMovies}
                                        myFavoriteMovies={myFavoriteMovies}
                                        setMyFavoriteMovies={setMyFavoriteMovies} /> :
        <div className='center-content'>
          <h1>No favorite movies selected, please select some.</h1>
        </div>
      }
      <div className='pagination'>
        {option === 'popular' && <Pagination count={100} onChange={handleChangePopular} />}
        {option === 'stream-now' && <Pagination count={100} onChange={handleChangeStreamNow} />}
      </div>
    </div>
  )
}
