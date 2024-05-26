"use client";
import { useEffect, useState } from "react";

export const ReportView = ({ slug }) => {
  const [views, setViews] = useState(null);

  useEffect(() => {
    const fetchViews = async () => {
      const response = await fetch("/api/views", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        // const data = await response;
        // setViews(data.views);
      }
    };

    fetchViews();
  }, [slug]);

//   return views !== null ? <div>{views} views</div> : <div>Loading...</div>;
};
