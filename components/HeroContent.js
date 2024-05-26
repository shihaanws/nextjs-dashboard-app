import React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

function HeroContent() {
  const router = useRouter();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleCreate = (index) => {
    if (!loggedIn) {
      document.getElementById("login_modal").showModal();
    } else {
      router.push("/new");
    }
  };

  return (
    <div className=" flex flex-col z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div
        className="hero h-[34em] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url(https://example.com/your-image.jpg)",
        }}
      >
        <div
          className="text-center px-6 flex flex-col items-center justify-center"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-zinc-100">
            Create Stunning Landing Pages !
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 prose">
            Effortlessly design and publish high-converting landing pages with
            our easy-to-use platform.{" "}
          </p>
          <button
            onClick={() => handleCreate()}
            className="btn btn-accent  text-lg "
          >
            Create Landing Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;
