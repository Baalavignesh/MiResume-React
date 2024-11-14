import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../shared/loading";
import { setTokens } from "../features/auth/authSlice";
import { fetchLocalData } from "../helper/localStorage";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    let dispatch = useDispatch();

    const data = fetchLocalData();

    const checkAuth = async () => {
      setTimeout(() => {
        if (!data) {
          navigate("/");
          return;
        } else {
          dispatch(
            setTokens({
              email: data.email,
              userInfo: data.userInfo,
              accesstoken: data.accesstoken,
            })
          );
        }
        setLoading(false);
      }, 1000);
    };

    useEffect(() => {
      checkAuth();
    }, [data]);

    if (loading) {
      return (
        <div className="h-screen flex justify-center items-center bg-custom-white">
          <Loading />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
