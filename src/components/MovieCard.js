const MovieCard = ({ posterPath }) => {
  return (
    <div className="mr-3 flex-shrink-0">
      <img
        className="w-44 h-52 rounded-md"
        src={"https://image.tmdb.org/t/p/w780" + posterPath}
        alt="movie"
      />
    </div>
  );
};

export default MovieCard;
