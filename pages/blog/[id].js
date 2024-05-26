import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import ProtectedRoute from "../../components/ProtectedRoute";
import Footer from "../../components/footer/ModernSocialIcons";
import Header from "../../components/Header";
import TraditionalBranding from "../../components/footer/TraditionalBranding";
import ModernSocialIcons from "../../components/footer/ModernSocialIcons";
import SimpleCopyright from "../../components/footer/SimpleCopyright";
import EditIcon from "../../components/icons/EditIcon";
import { Redis } from "@upstash/redis";
import { ReportView } from "../../components/reportView";
import { setPageViews } from "../../store/reducers/blogSlice";
const Blog = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const post = useSelector((state) => state.blog.posts[id]);
  const pageViews = useSelector((state) => state.blog.pageViews);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchViews = async () => {
      const redis = new Redis({
        url: "https://complete-javelin-51240.upstash.io",
        token:
          "AcgoAAIncDFjNjliOGVlYTk3MzU0N2ViOWE3YjkzMzAzMTM3MGI3ZXAxNTEyNDA",
      });
      const viewsCount =
        (await redis.get(["pageviews", "page", `page-${id}`].join(":"))) || 0;
      console.log("id,viewsCount", id, viewsCount);
      setViews(viewsCount);

      console.log("pageViews", pageViews);
      const updatedPageViews = pageViews.map((item) => {
        if (item.pageId === id) {
          return { ...item, views: viewsCount }; // Update views if pageId exists
        }
        return item;
      });

      if (!updatedPageViews.some((item) => item.pageId === id)) {
        updatedPageViews.push({ pageId: id, views: viewsCount }); // Add new object if pageId doesn't exist
      }

      dispatch(setPageViews(updatedPageViews));
    };

    fetchViews();
    console.log("post", post);
  }, []);
  if (!post) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div>
        <ReportView slug={`page-${id}`} />
        <Header
          searchBar={post.searchBar}
          profileIcon={post.profileIcon}
          brandName={post.brandName}
        />
        <div className="hero min-h-screen bg-base-200 relative hero-content max-w-[100rem]  pl-[12%] flex-col justify-start lg:flex-row">
          <div className="absolute top-4 right-4 flex gap-3">
            <button
              onClick={() => {
                router.push(`/`);
              }}
              className="btn btn-neutral"
            >
              Back Home
            </button>
            <button
              onClick={() => {
                router.push(`/edit?id=${id}`);
              }}
              className="btn btn-accent"
            >
              <EditIcon />
              Edit this Landing Page
            </button>
          </div>

          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{post.title}!</h1>
            <p className="py-6">{post.description}</p>
            <div className="flex gap-2">
              <button className="btn btn-primary">Documentation</button>
              <button className="btn btn-neutral">Try for free!</button>
            </div>
          </div>
        </div>

        {post.footerType == 1 ? (
          <SimpleCopyright brandName={post.brandName} />
        ) : post.footerType == 2 ? (
          <TraditionalBranding brandName={post.brandName} />
        ) : (
          <ModernSocialIcons brandName={post.brandName} />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Blog;