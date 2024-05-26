import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  landingPages: [
    {
      brandName: "FibrAI",
      title: "Box Office News!",
      description:
        "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.",
      footerType: 1,
      live: true,
      searchBar: true,
      profileIcon: true,
      imageBaseUrl:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    },
  ],
  pageViews: [{ pageId: 0, views: 4 }],
};

// const initialState = {
//   landingPages: [
//     {
//       brandName: "FibrAI",
//       title: "Box Office News!",
//       description:
//         "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.",
//       footerType: 1,
//     },
//     {
//       brandName: "Yulu",
//       title: "Easy Commute News!",
//       description:
//         "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.",
//       footerType: 2,
//     },

//     {
//       brandName: "Torrent",
//       title: "Rapid Transfer News!",
//       description:
//         "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.",
//       footerType: 3,
//     },
//   ],
// };

const landingPageSlice = createSlice({
  name: "landingPage",
  initialState,
  reducers: {
    setLandingPages(state, action) {
      state.landingPages = action.payload;
    },
    setPageViews(state, action) {
      state.pageViews = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("pageViews", JSON.stringify(state.pageViews));
      }
    },
    addLandingPage(state, action) {
      state.landingPages.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("landingPages", JSON.stringify(state.landingPages));
      }
    },
    updateLandingPage(state, action) {
      const {
        id,
        brandName,
        title,
        description,
        footerType,
        live,
        searchBar,
        profileIcon,
        imageBaseUrl,
      } = action.payload;
      state.landingPages[id] = {
        brandName,
        title,
        description,
        footerType,
        live,
        searchBar,
        profileIcon,
        imageBaseUrl,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("landingPages", JSON.stringify(state.landingPages));
      }
    },
    deleteLandingPage(state, action) {
      const landingPageId = action.payload;
      state.landingPages = state.landingPages.filter((landingPage, index) => index !== landingPageId);
      if (typeof window !== "undefined") {
        localStorage.setItem("landingPages", JSON.stringify(state.landingPages));
      }
    },
    deletePageView(state, action) {
      const pageViewId = action.payload;
      state.pageViews = state.pageViews.filter(
        (page, index) => index !== pageViewId
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("pageViews", JSON.stringify(state.pageViews));
      }
    },
  },
});

export const {
  setLandingPages,
  addLandingPage,
  updateLandingPage,
  deleteLandingPage,
  setPageViews,
  deletePageView,
} = landingPageSlice.actions;
export default landingPageSlice.reducer;
