import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../store/reducers/authSlice";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    if (username && password) {
      setLoading(true);

      // Simulate an authentication process
      setTimeout(() => {
        dispatch(setLoggedIn(true));
        setLoading(false);
        router.push("/"); // Redirect to home page after login
      }, 1200);
    }
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Login to your account to unlock a world of personalized content
              tailored just for you, along with exclusive features that enhance
              your experience on our platform.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={(value) => setUsername(value)}
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  // required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={(value) => setPassword(value)}
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  // required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button onClick={handleLogin} className="btn btn-primary">
                  {loading ? (
                    <span className="loading loading-bars loading-md"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;