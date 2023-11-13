import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux'
import { addUser } from "../utils/userSlice";
import { LOGIN_BACKGROUND_LOGO, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch()

  const name = useRef(null)
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validation
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // SignUp User
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const {uid, email, displayName, photoURL} = auth.currentUser
              dispatch(addUser({uid, email, displayName, photoURL}))
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + "-" + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // SignIn User
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={LOGIN_BACKGROUND_LOGO}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black w-screen md:w-3/12 p-12 text-white my-36 mx-auto right-0 left-0 bg-opacity-80 rounded-md"
      >
        <div className="font-bold text-3xl text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </div>
        <div className="my-8 flex flex-col gap-4">
          {!isSignInForm && (
            <input
              ref={name}
              className="bg-slate-200 rounded-md px-6 py-3 w-full text-black"
              type="text"
              placeholder="Name"
            />
          )}
          <input
            ref={email}
            className="bg-slate-200 rounded-md px-6 py-3 w-full text-black"
            type="text"
            placeholder="Email Address"
          />
          <input
            ref={password}
            className="bg-slate-200 rounded-md px-6 py-3 w-full text-black"
            type="password"
            placeholder="Password"
          />
          <div className="text-red-500 text-lg">{errorMessage}</div>
        </div>
        <button
          className="bg-red-700 rounded-md px-6 py-3 w-full"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div className="pt-12 pb-4">
          <span className="text-gray-400">
            {" "}
            {isSignInForm ? "New to Netflix?" : "Already registered?"}
          </span>
          <span onClick={toggleSignInForm} className="cursor-pointer ml-2">
            {isSignInForm ? "Sign up" : "Sign in"} now.
          </span>
        </div>
      </form>
    </div>
  );
};
export default Login;
