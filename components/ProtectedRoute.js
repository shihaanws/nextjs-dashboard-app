// components/ProtectedRoute.js
import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoggedIn) {
      //   router.push('/login'); 
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && children}
     
    </>
  );
};

export default ProtectedRoute;
