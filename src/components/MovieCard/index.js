import Button from '@mui/material/Button'
import '../../style/movieCard.css'
import { useEffect, useState } from 'react'

export const MovieCard = ({movie, myFavoriteMovies, setMyFavoriteMovies}) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [releaseYear, setReleaseYear] = useState('')

  useEffect(() => {
    const localYear = [...movie.release_date].splice(0,4).join('')
    setReleaseYear(localYear)
  })

  useEffect(() => {
    checkIfFavoriteListIncludeItem()
  }, [myFavoriteMovies, movie])

  const checkIfFavoriteListIncludeItem = () => {
    const isItemFavorite = myFavoriteMovies?.some(myFavoriteMovie => myFavoriteMovie.title === movie?.title)
    setIsFavorite(isItemFavorite)
  }

  const toggleFavorite = () => {
    if (isFavorite) {
      const updatedFavorites = myFavoriteMovies.filter((item) => item.title !== movie?.title)
      setMyFavoriteMovies(updatedFavorites)
    } else {
      setMyFavoriteMovies([...myFavoriteMovies, movie])
    }
    setIsFavorite(!isFavorite)

  }

  return (
    <div className="card">
      <div className="cover">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
      </div>
      <div className="details">
          <h2>{movie.title} ({releaseYear})</h2>
          <div className="rating">
              <span>{movie.vote_average} / 10 ({movie.vote_count} votes)</span>
          </div>
          <div className="info">
              <p>{movie.overview}</p>
          </div>
          <div className="favorite">
            <Button variant="outlined" 
                    sx={{width: '100%'}}
                    onClick={toggleFavorite}>
              {isFavorite ? 'Delete from favorites' : 'Add to favorites'}
            </Button>
          </div>
      </div>
  </div>
  )
}