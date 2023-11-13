import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies &&
    movies.popularMovies &&
    movies.topRatedMovies &&
    movies.upcomingMovies && (
      <div className="bg-black text-white pb-8">
        <div className="-mt-20 md:-mt-56 relative z-20">
          <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />

          <MovieList title="Popular Movies" movies={movies.popularMovies} />

          <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} />

          <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
