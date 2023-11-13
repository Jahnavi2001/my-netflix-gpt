import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="mr-3 flex-shrink-0">
      <img
        className="w-44 h-52 rounded-md"
        src={ IMG_CDN + posterPath}
        alt="movie"
      />
    </div>
  );
};

export default MovieCard;
