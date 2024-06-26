import React, { useEffect, useState } from "react";
import EditIcon from "./icons/EditIcon";
import EyeIcon from "./icons/EyeIcon";
import OpenWindow from "./icons/OpenWindow";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePageView,
  deleteLandingPage,
  setPageViews,
} from "../store/reducers/landingPageSlice";

import { Redis } from "@upstash/redis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLandingPages } from "../store/reducers/landingPageSlice";

const LandingPageList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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
  }, []);

  useEffect(() => {
    if (popup.message && popup.active)
      toast.success(popup.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  }, [popup.message && popup.active]);
  const handleDelete = (id) => {
    setCurrentId(id);
    document.getElementById("delete_modal").showModal();
  };
  const handleViewPage = (index) => {
    if (!loggedIn) {
      document.getElementById("login_modal").showModal();
    } else {
      if (landingPages[index].live) {
        router.push(`/landingPage/${index}`);
      } else {
        router.push(`/edit/?id=${index}`);
      }
    }
  };
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
    if (typeof window !== "undefined") {
      loadLandingPages();
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
        token:
          "AcgoAAIncDFjNjliOGVlYTk3MzU0N2ViOWE3YjkzMzAzMTM3MGI3ZXAxNTEyNDA",
    });

    redis.del(["pageviews", "page", `page-${id}`].join(":"));
  };

  return (
    <div>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Oops!</h3>
          <p className="py-4">Are you sure you want to delete?</p>
          <div className="modal-action">
            <form className="flex gap-3" method="dialog">
              <button
                onClick={() => {
                  dispatch(deleteLandingPage(currentId));
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
      </dialog>
      {landingPages.length > 0 && (
        <div className="flex flex-col">
          <div className="w-1/4">
            <p className="text-xl md:text-2xl font-light mb-8 prose">
              Landing pages
            </p>
          </div>
          <div className="w-3/4">
            <div className="grid grid-cols-3 gap-6 w-[70em] mb-12 mt-9">
              {landingPages.map((landingPage, index) => (
                <div
                  key={index}
                  className="card card-compact bg-base-100 h-[20em] shadow-xl transform transition-transform hover:-translate-y-1"
                >
                  <figure className="h-[80%]">
                    <img
                      src={landingPage.imageBaseUrl}
                      alt="Placeholder Image"
                      className="w-full blur-sm h-[80%]"
                      style={{ filter: "blur(5px)" }}
                    />
                  </figure>
                  <div className="card-body flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="card-title">{landingPage.brandName}</h2>
                      </div>
                      {landingPage.live && (
                        <div className="badge badge-accent badge-outline flex items-center justify-center ">
                          Live
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      {landingPage.live ? (
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
                            landingPage.live
                              ? "btn btn-success"
                              : "btn btn-primary"
                          }
                        >
                          {landingPage.live ? "Visit" : "Edit"}

                          {landingPage.live ? <OpenWindow /> : <EditIcon />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPageList;
