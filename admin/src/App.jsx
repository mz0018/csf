import React, { lazy, Suspense, useState } from "react";
import Loader from "./fallback/Loader";

const SignIn = lazy(() => import('./forms/signinForm'));
const SignUp = lazy(() => import('./forms/signupForm'));

const App = () => {
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        
        {isSignupVisible ? <SignUp /> : <SignIn />}

        <button
          className="tracking-widest font-semibold text-xs cursor-pointer hover:font-bold transition"
          onClick={() => setIsSignupVisible(!isSignupVisible)}
        >
          {isSignupVisible ? "Go to Sign In" : "Go to Sign Up"}
        </button>

      </div>
    </Suspense>
  );
};

export default App;
