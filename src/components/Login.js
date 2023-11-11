import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validation
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/cf244808-d722-428f-80a9-052acdf158ec/IN-en-20231106-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black w-3/12 p-12 text-white my-36 mx-auto right-0 left-0 bg-opacity-80 rounded-md"
      >
        <div className="font-bold text-3xl text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </div>
        <div className="my-8 flex flex-col gap-4">
          {!isSignInForm && (
            <input
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
