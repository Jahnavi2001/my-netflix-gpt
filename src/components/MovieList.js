import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="my-14">
      <h1 className="ml-4 mb-4 font-bold">{title}</h1>
      <div className="flex overflow-x-auto">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
