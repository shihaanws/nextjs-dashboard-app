import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      brandName: "FibrAI",
      title: "Box Office News!",
      description:
        "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.",
      footerType: 1,
      live: true,
      searchBar: true,
      profileIcon: true,
    },
  ],
  pageViews: [{ pageId: 0, views: 4 }],
};

// const initialState = {
//   posts: [
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

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPageViews(state, action) {
      state.pageViews = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("pageViews", JSON.stringify(state.pageViews));
      }
    },
    addPost(state, action) {
      state.posts.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("blogPosts", JSON.stringify(state.posts));
      }
    },
    updatePost(state, action) {
      const {
        id,
        brandName,
        title,
        description,
        footerType,
        live,
        searchBar,
        profileIcon,
      } = action.payload;
      state.posts[id] = {
        brandName,
        title,
        description,
        footerType,
        live,
        searchBar,
        profileIcon,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("blogPosts", JSON.stringify(state.posts));
      }
    },
    deletePost(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post, index) => index !== postId);
      console.log("redposts", state.posts);
      if (typeof window !== "undefined") {
        localStorage.setItem("blogPosts", JSON.stringify(state.posts));
      }
    },
    deletePageView(state, action) {
      const pageViewId = action.payload;
      state.pageViews = state.pageViews.filter(
        (post, index) => index !== pageViewId
      );
      console.log("redposts", state.pageViews);
      if (typeof window !== "undefined") {
        localStorage.setItem("pageViews", JSON.stringify(state.pageViews));
      }
    },
  },
});

export const {
  setPosts,
  addPost,
  updatePost,
  deletePost,
  setPageViews,
  deletePageView,
} = blogSlice.actions;
export default blogSlice.reducer;
