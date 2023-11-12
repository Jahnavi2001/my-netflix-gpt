import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
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
      <img
        className="w-48"
        src={NETFLIX_LOGO}
        alt="logo"
      />

      <div>
        {user && (
          <button
            className="bg-black p-2 rounded-md text-white flex items-center gap-2"
            onClick={handleSignOut}
          >
            <img className="w-6 h-6" src={user.photoURL} alt="profileLogo" />
            {user.displayName} - SignOut
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
