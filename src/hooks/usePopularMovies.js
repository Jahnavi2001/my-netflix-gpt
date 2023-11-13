import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, POPULAR_MOVIES_API } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {

  const popularMovies = useSelector(store => store.movies.popularMovies)

  // Fetch Data from TMDB Popular API and Update Store
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const data = await fetch(
      POPULAR_MOVIES_API,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
