import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logoImage from "../components/icons/PageLab.png";
import { setPageViews } from "../store/reducers/landingPageSlice";

import { Redis } from "@upstash/redis";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPageList from "../components/LandingPageList";
import HeroContent from "../components/HeroContent";
import Stats from "../components/Stats";
import { ReportView } from "../components/reportView";
import { setLoggedIn } from "../store/reducers/authSlice";
import { setLandingPages } from "../store/reducers/landingPageSlice";
import { setPopup } from "../store/reducers/popupSlice";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const landingPages = useSelector((state) => state.landingPage.landingPages);
  const pageViews = useSelector((state) => state.landingPage.pageViews);
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const popup = useSelector((state) => state.popup.popup);

  const [views, setViews] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [currentId, setCurrentId] = useState();

  useEffect(() => {
    const fetchViews = async () => {
      const redis = new Redis({
        url: "https://complete-javelin-51240.upstash.io",
        token:
          "AcgoAAIncDFjNjliOGVlYTk3MzU0N2ViOWE3YjkzMzAzMTM3MGI3ZXAxNTEyNDA",
      });
      const viewsCount =
        (await redis.get(["pageviews", "page", "page-dashboard"].join(":"))) ||
        0;
      setViews(viewsCount);
    };
    fetchViews();

    dispatch(
      setPopup({ message: "Landing Page created successfully", active: false })
    );
  }, []);

  useEffect(() => {
    setIsClient(true);
    const loadLandingPages = () => {
      const storedLandingPages = localStorage.getItem("landingPages");
      if (storedLandingPages) {
        dispatch(setLandingPages(JSON.parse(storedLandingPages)));
      }
    };

    const loadPageViews = () => {
      const storedPageViews = localStorage.getItem("pageViews");
      if (storedPageViews) {
        dispatch(setPageViews(JSON.parse(storedPageViews)));
      }
    };

    const loadLoggedin = () => {
      const storedLoginState = localStorage.getItem("isLoggedIn");
      if (storedLoginState) {
        dispatch(setLoggedIn(JSON.parse(storedLoginState)));
      }
    };

    if (typeof window !== "undefined") {
      loadLandingPages();
      loadPageViews();
      loadLoggedin();
    }
  }, [dispatch]);

  const handleLoginLogout = () => {
    if (!loggedIn) {
      router.push("/login");
    } else {
      document.getElementById("logout_modal").showModal();
    }
  };

  const handleDeletePageView = (id) => {
    const redis = new Redis({
      url: "https://complete-javelin-51240.upstash.io",
      token:
        "AcgoAAIncDFjNjliOGVlYTk3MzU0N2ViOWE3YjkzMzAzMTM3MGI3ZXAxNTEyNDA",
    });

    redis.del(["pageviews", "page", `page-${id}`].join(":"));
  };

  return (
    <div>
      <ReportView slug={"page-dashboard"} />
      <ToastContainer />

      <dialog id="login_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hey Wait!</h3>
          <p className="py-4">
            You have to login first to view the Landing Page!
          </p>
          <div className="modal-action">
            <form className="flex gap-3" method="dialog">
              <button
                onClick={() => {
                  document.getElementById("login_modal").showModal();
                }}
                className="btn btn-active btn-neutral"
              >
                Cancel
              </button>
              <button onClick={handleLoginLogout} className="btn btn-primary">
                Login Now
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="logout_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Oops!</h3>
          <p className="py-4">Are you sure you want to logout?</p>
          <div className="modal-action">
            <form className="flex gap-3" method="dialog">
              <button
                onClick={() => {
                  document.getElementById("delete_modal").showModal();
                }}
                className="btn btn-active btn-neutral"
              >
                Cancel
              </button>
              <button
                onClick={() => dispatch(setLoggedIn(false))}
                className="btn btn-primary"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="flex flex-row items-center justify-around px-3 py-4">
        <div className="flex-1">
          <Image src={logoImage} alt="Logo" width={180} height={70} />
        </div>

        <button onClick={handleLoginLogout} className="btn btn-secondary">
          {loggedIn ? "Logout" : "Login"}
        </button>
      </div>

      <Stats dashboardViews={views} />

      <main className="flex min-h-screen flex-col items-center justify-between ">
        <HeroContent />

        <LandingPageList />
      </main>
    </div>
  );
};
export default Home;
