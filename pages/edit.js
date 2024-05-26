import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ModernSocialIcons from "../components/footers/ModernSocialIcons";
import SimpleCopyright from "../components/footers/SimpleCopyright";
import TraditionalBranding from "../components/footers/TraditionalBranding";
import EditIcon from "../components/icons/EditIcon";
import EyeIcon from "../components/icons/EyeIcon";
import OpenWindow from "../components/icons/OpenWindow";
import PublishIcon from "../components/icons/PublishIcon";
import { updatePost } from "../store/reducers/blogSlice";

const Edit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const post = useSelector((state) => state.blog.posts[id]);
  const [title, setTitle] = useState("");
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [loader, setLoader] = useState(false);
  const [footerType, setFooterType] = useState(0);
  const [live, setLive] = useState(false);
  const [publishLoader, setPublishLoader] = useState(false);
  const [published, setPublished] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [profileIcon, setProfileIcon] = useState(false);
  const [imageBaseUrl, setImageBaseUrl] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBrandName(post.brandName);
      setDescription(post.description);
      setFooterType(post.footerType);
      setLive(post.live);
      setSearchBar(post.searchBar);
      setProfileIcon(post.profileIcon);
      setImageBaseUrl(post.imageBaseUrl);
    }
  }, [post]);

  const handleSubmit = (e) => {
    // e.preventDefault();

    setPublishLoader(true);
    dispatch(
      updatePost({
        id,
        brandName,
        title,
        description,
        footerType,
        live: true,
        searchBar,
        profileIcon,
        imageBaseUrl,
      })
    );
    setTimeout(() => {
      setPreviewMode(true);
      setPublished(true);
    }, 3000);

    // router.push(`/`);
    // router.push(`/blog/${id}`);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImageBaseUrl(base64String);
      };

      reader.readAsDataURL(file);
    }
  };
  if (!post) return <div>Loading...</div>;

  return (
    <div
      className={
        published
          ? "flex items-center min-h-screen justify-center gap-5"
          : "flex flex-col items-center min-h-screen  "
      }
    >
      {published && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {loader ? (
        <div className="mockup-window border p-4 bg-base-300 h-[35em]  mt-12 w-[80em]">
          <div className="flex items-center flex-col justify-center w-full min-h-[30em] bg-base-200">
            <p> Wait, while we are cooking up the page for you!</p>
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        </div>
      ) : previewMode && published ? (
        <div className="mockup-window border p-4 bg-base-300 mb-1 mt-5 w-[40em]">
          <Header
            searchBar={searchBar}
            profileIcon={profileIcon}
            brandName={brandName}
          />
          <div className="flex justify-center flex-col w-full bg-base-200 h-[20em]">
            <div className="hero p-12 w-full bg-base-200 relative">
              <div className="hero-content flex-col justify-start lg:flex-row  min-w-[80%]">
                <img
                  src={imageBaseUrl}
                  className="w-[10em] rounded-lg shadow-2xl"
                />
                <div>
                  <h1 className="text-5xl font-bold">{title}!</h1>
                  <p className="py-6">{description}</p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
            </div>
            {footerType == 1 ? (
              <SimpleCopyright brandName={post.brandName} />
            ) : footerType == 2 ? (
              <TraditionalBranding brandName={post.brandName} />
            ) : (
              <ModernSocialIcons brandName={post.brandName} />
            )}
          </div>
        </div>
      ) : previewMode ? (
        <div className="mockup-window border p-4 bg-base-300 mb-1 mt-5 w-[80em]">
          <Header
            searchBar={searchBar}
            profileIcon={profileIcon}
            brandName={brandName}
          />
          <div className="flex justify-center flex-col w-full bg-base-200">
            <div className="hero p-12 w-full bg-base-200 relative">
              <div className="hero-content flex-col justify-start lg:flex-row  min-w-[80%]">
                <img
                  src={imageBaseUrl}
                  className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                  <h1 className="text-5xl font-bold">{title}!</h1>
                  <p className="py-6">{description}</p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
            </div>
            {footerType == 1 ? (
              <SimpleCopyright brandName={post.brandName} />
            ) : footerType == 2 ? (
              <TraditionalBranding brandName={post.brandName} />
            ) : (
              <ModernSocialIcons brandName={post.brandName} />
            )}
          </div>
        </div>
      ) : (
        <form className="flex flex-col gap-1 items-center justify-center p-0  h-[38em] bg-base-300 w-[80em] shadow-md rounded-lg mt-5">
          <p className="text-xl md:text-2xl font-light !mt-2  prose">
            Edit Landing page
          </p>
          <div className="flex flex-col gap-0 w-[40em]">
            <label className="form-control  w-full">
              <div className="label">
                <span className="label-text">Brand Name</span>
              </div>
              <input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Brand Name"
                type="text"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control  w-full">
              <div className="label">
                <span className="label-text">Hero Text</span>
              </div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                type="text"
                className="input input-bordered w-full "
              />
            </label>

            <label className="form-control  w-full">
              <div className="label">
                <span className="label-text">Hero Description</span>
              </div>
              <textarea
                className="textarea w-full textarea-bordered "
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Hero Image</span>
              </div>
              <input
                accept="image/*"
                onChange={handleImageChange}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Header Style</span>
              </div>
              <div className="flex">
                <label className="cursor-pointer flex gap-2 label">
                  <input
                    type="checkbox"
                    checked={profileIcon}
                    className="checkbox checkbox-primary"
                    onChange={(e) => setProfileIcon(e.target.checked)}
                  />
                  <span className="label-text">Profile Icon</span>
                </label>
                <label className="cursor-pointer flex gap-2 label">
                  <input
                    checked={searchBar}
                    onChange={(e) => setSearchBar(e.target.checked)}
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">SearchBar</span>
                </label>
              </div>
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Footer Style</span>
              </div>
              <select
                onChange={(e) => setFooterType(e.target.value)}
                className="select select-bordered w-full "
              >
                <option selected={footerType ? false : true}>Pick One</option>
                <option selected={footerType == 1 ? false : true} value={1}>
                  Simple Copyright
                </option>
                <option selected={footerType == 2 ? false : true} value={2}>
                  Traditional Branding
                </option>
                <option selected={footerType == 3 ? false : true} value={3}>
                  Modern Social Icons
                </option>
              </select>
            </label>
          </div>
        </form>
      )}

      {published ? (
        <div className=" prose lg:prose-xl flex flex-col items-center ">
          <h1 className="!mb-0"> Congratulations!</h1>
          <p className="text-xl md:text-2xl font-light mb-8 prose">
            Your page is live now!
          </p>
          <button
            onClick={() => {
              router.push(`/blog/${id}`);
            }}
            className="btn btn-success flex items-center justify-center"
          >
            <OpenWindow />
            Visit Site
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-between gap-4 mt-3 mr-3 items-center  w-[79em] mb-8">
          <button onClick={handleSubmit} className="btn btn-primary w-[50%]">
            {publishLoader ? (
              <>
                Publishing
                <span className="loading loading-bars loading-sm"></span>
              </>
            ) : (
              <>
                <PublishIcon /> Publish
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (!previewMode) {
                console.log("posttt", post);
                setLoader(true);
                setTimeout(() => {
                  setLoader(false);
                  setPreviewMode(!previewMode);
                }, 1200);
              } else {
                setLoader(false);
                setPreviewMode(!previewMode);
              }
            }}
            className="btn btn-secondary w-[50%]"
          >
            {previewMode ? (
              <span className="flex items-center justify-center gap-2">
                <EditIcon />
                Go back to Editor
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <EyeIcon />
                Preview Page
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Edit;
