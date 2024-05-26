import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../store/reducers/authSlice";
import { useRouter } from "next/router";
import LeftArrow from "../components/icons/LeftArrow";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    console.log("up", username, password);
    if (username && password) {
      console.log("iiiiiiiin");
      setLoading(true);

      setTimeout(() => {
        dispatch(setLoggedIn(true));
        setLoading(false);
        router.push("/");
        console.log("first");
        localStorage.setItem("isLoggedIn", true);
      }, 1200);
    }
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200 flex flex-col items-center justify-center">
        <div className="flex justify-start w-[81%] mb-16">
          <div
            onClick={() => {
              router.push("/");
            }}
            className="cursor-pointer flex gap-3 prose lg:prose-xl items-center mt-5 transition-transform duration-300 ease-in-out transform hover:-translate-x-1"
          >
            <LeftArrow className="w-5 h-5 " />
            <p className="!m-0 !p-0">Home</p>
          </div>
        </div>
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
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  placeholder="Password"
                  className="input input-bordered"
                  required
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
