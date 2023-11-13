import lang from "../utils/langConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="pt-36 flex justify-center">
      <div className="bg-black px-8 py-5 w-1/2 flex gap-4 rounded-lg">
        <input
          type="text"
          className="px-4 py-4 border border-black rounded-lg text-black w-10/12"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="bg-red-600 rounded-lg px-8 py-4 text-white">
          {lang[langKey].search}
        </button>
      </div>
    </div>
  );
};
export default GptSearchBar;
