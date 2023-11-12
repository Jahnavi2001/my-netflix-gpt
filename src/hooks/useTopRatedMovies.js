import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, TOP_RATED_MOVIES } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {

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
    getTopRatedMovies();
  }, []);
};
export default useTopRatedMovies;
