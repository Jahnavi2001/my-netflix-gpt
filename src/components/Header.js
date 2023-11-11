import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate('/error')
      });
  };

  return (
    <div className="absolute py-2 px-8 bg-gradient-to-b from-black w-full z-10 flex justify-between items-center">
      <img
        className="w-48"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />

      <div>
        {user && (
          <button
            className="bg-black p-2 rounded-md text-white flex items-center gap-2"
            onClick={handleSignOut}
          >
            <img className="w-6 h-6" src={user.photoURL} alt="profileLogo" />
            { user.displayName } - SignOut
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
