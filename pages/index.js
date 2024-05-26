import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  deletePageView,
  deletePost,
  setPageViews,
} from "../store/reducers/blogSlice";
import logoImage from "../components/icons/PageLab1.png"; // Import your logo image file

import Image from "next/image";
import { setLoggedIn } from "../store/reducers/authSlice";
import { setPosts } from "../store/reducers/blogSlice";
import OpenWindow from "../components/icons/OpenWindow";
import Stats from "../components/Stats";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReportView } from "../components/reportView";
import { Redis } from "@upstash/redis";
import EyeIcon from "../components/icons/EyeIcon";
import EditIcon from "../components/icons/EditIcon";
import BlogList from "../components/BlogList";
import HeroContent from "../components/HeroContent";
const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const posts = useSelector((state) => state.blog.posts);
  const pageViews = useSelector((state) => state.blog.pageViews);
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
  }, []);

  // useEffect(() => {
  //   if (popup.message && popup.active)
  //     toast.success(popup.message, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  // }, [popup.message && popup.active]);

  useEffect(() => {
    setIsClient(true);
    const loadPosts = () => {
      const storedPosts = localStorage.getItem("blogPosts");
      if (storedPosts) {
        dispatch(setPosts(JSON.parse(storedPosts)));
      }
    };

    const loadPageViews = () => {
      const storedPageViews = localStorage.getItem("pageViews");
      if (storedPageViews) {
        dispatch(setPageViews(JSON.parse(storedPageViews)));
      }
    };
    if (typeof window !== "undefined") {
      loadPosts();
      loadPageViews();
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
      token: "AcgoAAIncDFjNjliOGVlYTk3MzU0N2ViOWE3YjkzMzAzMTM3MGI3ZXAxNTEyNDA",
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
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
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
            <form method="dialog">
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

      {/* <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Oops!</h3>
          <p className="py-4">Are you sure you want to delete?</p>
          <div className="modal-action">
            <form className="flex gap-3" method="dialog">
              <button
                onClick={() => {
                  dispatch(deletePost(currentId));
                  dispatch(deletePageView(currentId));
                  handleDeletePageView(currentId);
                }}
                className="btn btn-error"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  document.getElementById("delete_modal").showModal();
                }}
                className="btn btn-active btn-neutral"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog> */}

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

        <BlogList />

        {/* {posts.length > 0 && (
          <div className="flex flex-col">
            <div className="w-1/4">
              <p className="text-xl md:text-2xl font-light mb-8 prose">
                Landing pages
              </p>
            </div>
            <div className="w-3/4">
              <div className="grid grid-cols-3 gap-6 w-[70em] mb-12 mt-9">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className="card card-compact bg-base-100 shadow-xl transform transition-transform hover:-translate-y-1"
                  >
                    <figure>
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="card-title">{post.brandName}</h2>
                        </div>
                        {post.live && (
                          <div className="badge badge-accent badge-outline flex items-center justify-center ">
                            Live
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        {post.live ? (
                          <div className="flex items-center gap-2 prose">
                            <EyeIcon />
                            <span>{pageViews?.[index]?.views ?? 0}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 prose"></div>
                        )}
                        <div className="card-actions flex justify-end">
                          <button
                            onClick={() => handleDelete(index)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleViewPage(index)}
                            className={
                              post.live ? "btn btn-success" : "btn btn-primary"
                            }
                          >
                            {post.live ? "Visit" : "Edit"}
                            {post.live ? <OpenWindow /> : <EditIcon />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}
      </main>
    </div>
  );
};
export default Home;