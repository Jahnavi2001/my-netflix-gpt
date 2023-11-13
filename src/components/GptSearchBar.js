import { useRef } from "react";
import lang from "../utils/langConstants";
import { useSelector, useDispatch } from "react-redux";
import openai from "../utils/openai";
import { addGptMovieResult } from "../utils/gptSlice";
import { API_OPTIONS } from "../utils/constants";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch()

  // Search Movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&page=1', API_OPTIONS)
    const json = await data.json()
    return json.results
  }

  const handleGptSearchClick = async () => {
    // Make an API Call to GPT API and get Movie Results
    const gptQuery =
      "Act as a Movie Recommendation System and Suggest some movies for the query :" +
      searchText.current.value +
      "only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      // TODO: Error Handling
    }

    // "Dookudu, Arjun Reddy, F2: Fun and Frustration, Ala Vaikunthapurramuloo, Mahanubhavudu"
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(", ");

    // [Promise, Promise, Promise, Promise, Promise]
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie))

    const tmdbResults = await Promise.all(promiseArray)

    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))

  };

  return (
    <div className="pt-52 flex justify-center md:pt-36">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black px-8 py-5 w-full flex gap-4 rounded-lg mx-2 md:w-1/2"
      >
        <input
          ref={searchText}
          type="text"
          className="px-4 py-4 border border-black rounded-lg text-black w-10/12"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="bg-red-600 rounded-lg px-8 py-4 text-white"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
