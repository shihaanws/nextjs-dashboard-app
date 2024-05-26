"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLandingPage } from "../store/reducers/landingPageSlice";
import { setPopup } from "../store/reducers/popupSlice";

import LeftArrow from "../components/icons/LeftArrow";

const New = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [footerType, setFooterType] = useState();
  const [searchBar, setSearchBar] = useState();
  const [profileIcon, setProfileIcon] = useState();
  const [imageBaseUrl, setImageBaseUrl] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();

    dispatch(
      addLandingPage({
        title,
        brandName,
        description,
        footerType,
        searchBar,
        profileIcon,
        imageBaseUrl,
      })
    );
    setBrandName("");
    setTitle("");
    setDescription("");
    setFooterType(0);
    setSearchBar(false);
    setProfileIcon(false);
    setImageBaseUrl("");
    dispatch(
      setPopup({ message: "Landing Page created successfully", active: true })
    );
    router.push("/");
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

  return (
    <div className="flex flex-col items-center bg-zinc-700 min-h-screen ">
      <div className="w-[80em] flex flex-col gap-3">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer flex gap-3 prose lg:prose-xl items-center mt-5 transition-transform duration-300 ease-in-out transform hover:-translate-x-1"
        >
          <LeftArrow className="w-5 h-5 " />
          <p className="!m-0 !p-0">Create Landing Page</p>
        </div>

        <form
          className="flex flex-col gap-1 items-center justify-center p-2 h-[40em] bg-base-300 w-[80em] shadow-md rounded-lg mt-0"
          // onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 w-[40em]">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Brand Name</span>
              </div>
              <input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Brand Name"
                type="text"
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Hero Text</span>
              </div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Hero Description</span>
              </div>
              <textarea
                className="textarea w-full textarea-bordered"
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

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Header Style</span>
              </div>
              <div className="flex">
                <label className="cursor-pointer flex gap-2 label">
                  <input
                    onChange={(e) => {
                      console.log("checked2", e.target.checked);
                      setProfileIcon(e.target.checked);
                    }}
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">Profile Icon</span>
                </label>

                <label className="cursor-pointer flex gap-2 label">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    onChange={(e) => {
                      console.log("checked2", e.target.checked);
                      setSearchBar(e.target.checked);
                    }}
                  />
                  <span className="label-text">SearchBar</span>
                </label>
              </div>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Footer Style</span>
              </div>
              <select
                onChange={(e) => setFooterType(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="" disabled selected>
                  Pick One
                </option>
                <option value={1}>Simple Copyright</option>
                <option value={2}>Traditional Branding</option>
                <option value={3}>Modern Social Icons</option>
              </select>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            disabled={
              brandName && title && description && imageBaseUrl && footerType
                ? false
                : true
            }
            className="btn btn-primary w-full mt-4"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default New;
