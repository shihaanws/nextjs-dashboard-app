import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Redis } from "@upstash/redis";
import Header from "../../components/Header";
import ProtectedRoute from "../../components/ProtectedRoute";
import ModernSocialIcons from "../../components/footers/ModernSocialIcons";
import SimpleCopyright from "../../components/footers/SimpleCopyright";
import TraditionalBranding from "../../components/footers/TraditionalBranding";
import EditIcon from "../../components/icons/EditIcon";
import { ReportView } from "../../components/reportView";
import { setPageViews } from "../../store/reducers/landingPageSlice";
const LandingPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;
  const landingPage = useSelector(
    (state) => state.landingPage.landingPages[id]
  );
  const pageViews = useSelector((state) => state.landingPage.pageViews);
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
          return { ...item, views: parseInt(viewsCount) };
        }
        return item;
      });

      if (!updatedPageViews.some((item) => item.pageId === id)) {
        updatedPageViews.push({ pageId: id, views: parseInt(viewsCount) });
      }

      dispatch(setPageViews(updatedPageViews));
    };

    fetchViews();
    console.log("landingPage", landingPage);
  }, []);

  if (!landingPage) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div>
        <ReportView slug={`page-${id}`} />
        <Header
          searchBar={landingPage.searchBar}
          profileIcon={landingPage.profileIcon}
          brandName={landingPage.brandName}
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
            src={landingPage.imageBaseUrl}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">{landingPage.title}!</h1>
            <p className="py-6">{landingPage.description}</p>
            <div className="flex gap-2">
              <button className="btn btn-primary">Documentation</button>
              <button className="btn btn-neutral">Try for free!</button>
            </div>
          </div>
        </div>

        {landingPage.footerType == 1 ? (
          <SimpleCopyright brandName={landingPage.brandName} />
        ) : landingPage.footerType == 2 ? (
          <TraditionalBranding brandName={landingPage.brandName} />
        ) : (
          <ModernSocialIcons brandName={landingPage.brandName} />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default LandingPage;
