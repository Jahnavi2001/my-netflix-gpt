import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, TOP_RATED_MOVIES } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {

  const topRatedMovies = useSelector(store => store.movies.topRatedMovies)

  // Fetch Data from TMDB Top Rated API and Update Store
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const data = await fetch(
      TOP_RATED_MOVIES,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
