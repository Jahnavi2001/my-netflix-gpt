import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageClick = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute py-2 px-8 bg-gradient-to-b from-black w-full z-10 flex justify-between items-center">
      <img className="w-48" src={NETFLIX_LOGO} alt="logo" />

      <div>
        {user && (
          <div className="flex gap-4">
            {showGptSearch && (
              <select
                className="p-2 rounded-md bg-gray-900 text-white"
                onChange={handleLanguageClick}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              className="bg-purple-600 rounded-md px-4 py-2 text-white"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home Page" : "Gpt Search"}
            </button>
            <button
              className="bg-white p-2 rounded-md text-black flex items-center gap-2"
              onClick={handleSignOut}
            >
              <img className="w-6 h-6" src={user.photoURL} alt="profileLogo" />
              {user.displayName} - SignOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
