import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, UPCOMING_MOVIES } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {

  const upcomingMovies = useSelector(store => store.movies.upcomingMovies)

  // Fetch Data from TMDB Upcoming API and Update Store
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const data = await fetch(
      UPCOMING_MOVIES,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
