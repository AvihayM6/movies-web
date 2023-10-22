import {MovieCard} from '../MovieCard'
import '../../style/moviesBoard.css'

export const MoviesBoard = ({movies, myFavoriteMovies, setMyFavoriteMovies}) => {
  return (
    <div className="movies-board-container" style={{gridTemplateColumns: movies?.length === 1 ? 'auto' : 'auto auto auto'}}>
        {movies.map((movie) => (
          <MovieCard key={movie.id}
                     movie={movie}
                     myFavoriteMovies={myFavoriteMovies}
                     setMyFavoriteMovies={setMyFavoriteMovies} />
          ))}
    </div>
  )
}