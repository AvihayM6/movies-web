import { useEffect, useState } from 'react'
import axios from 'axios'
import {MoviesBoard} from './components/MoviesBoard'
import CircularProgress from '@mui/material/CircularProgress';
import {NavigateBar} from './components/NavigateBar'
import './style/app.css'

export const App = () => {
  const API_KEY = '2c46288716a18fb7aadcc2a801f3fc6b'
  const [option, setOption] = useState('popular')
  const [popularMovies, setPopularMovies] = useState([])
  const [streamNowMovie, setStreamNowMovie] = useState([])
  const [myFavoriteMovies, setMyFavoriteMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPopularMovies()
    getWhichMovieIsStreamNow()
  }, [])

  const getPopularMovies = () => {
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular'
    axios.get(apiUrl, {
      params: {
        api_key: API_KEY,
      }
    }).then((response) => {
      setPopularMovies(response.data.results)
      setLoading(false)
    }).catch((error) => {
      setError(error)
      setLoading(false)
    })
  }


  const getWhichMovieIsStreamNow = () => {
    setLoading(true)
    const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing'
    axios.get(apiUrl, {
      params: {
        api_key: API_KEY,
      }
    }).then((response) => {
      setStreamNowMovie(response.data.results)
      setLoading(false)
    }).catch((error) => {
      setError(error)
      setLoading(false)
    })
  }  


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
    </div>
  )
}
