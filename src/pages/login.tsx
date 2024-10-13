import { useDispatch } from "react-redux";
import { setTokens } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
//Change the name after vanta. based on the vanta.d.ts
import VANTA from "vanta/dist/vanta.fog.min";
import * as THREE from "three";
import { Divider, Fade } from "@mui/material";
import { Typography, Button, Input } from "@material-tailwind/react";
import GoogleSignInButton from "../shared/google_button/googleauth";
import { appLogo, appLogo2 } from "../assets";
import { fetchLocalData, SetLocalUserInfo } from "../helper/localStorage";
import { fetchUserByEmail } from "../services/UserInfoController";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        VANTA({
          el: vantaRef.current,
          THREE: THREE,
          highlightColor: 0x5b2dff,
          midtoneColor: 0xd6a6eb,
          lowlightColor: 0xe1e1e1,
          baseColor: 0xcfcfcf,
          blurFactor: 0.6,
          speed: 1,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleLogin = async () => {
    const user = await fetchUserByEmail(loginInfo.email);

    if(user) {
      console.log(user);
      dispatch(
        setTokens({
          accessToken: "access_token",
          email: user.email,
          userInfo: user,
        })
      );
      SetLocalUserInfo({
        accessToken: "access_token",
        email: user.email,
        userInfo: user,
      });
    }else {
      dispatch(
        setTokens({
          accessToken: "access_token",
          email: loginInfo.email,
          userInfo: {
            isComplete: "new"
          },
        })
      );
      SetLocalUserInfo({
        accessToken: "access_token",
        email: loginInfo.email,
        userInfo: {
          isComplete: "new"
        },
      });
    }

    navigate("/dashboard");
  };

  let handleInput = (e: any) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("login screen");
    if (fetchLocalData() != null) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="bg-custom-black">
      <Fade in={true} timeout={1000}>
        <div
          className="pl-24 pr-24 pt-12 h-screen text-custom-white bg-custom-black flex justify-center items-center"
          ref={vantaRef}
        >
          <div className="flex  justify-between items-center bg-white rounded-md py-12 px-12">
            <div className=" text-black w-1/2 rounded-md flex flex-col justify-center items-center gap-4 text-center p-6">
              <p className="font-light text-3xl w-32 pb-6">
                MiResume
              </p>{" "}
              <p className="w-full font-light text-xl">
                Your Perfect Resume, Simplified.
              </p>
            </div>
            <div className=" text-black w-72  flex flex-col gap-4 rounded-md">
              <div className="pt-6 px-2 flex flex-col justify-center items-center gap-4">
                <Input
                  label="Email"
                  name="email"
                  crossOrigin={undefined}
                  onChange={handleInput}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  crossOrigin={undefined}
                  onChange={handleInput}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <Button
                  onClick={handleLogin}
                  className="mt-1"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Join Now
                </Button>
              </div>
              {/* <span className="text-xs text-center">or</span> */}
              <Divider />
              <div className="m-4 mt-0 text-center">
                <GoogleSignInButton />

                {/* @ts-ignore */}
                <Typography
                  variant="small"
                  className="mt-4 flex justify-center"
                >
                  What do we do?
                  {/* @ts-ignore */}
                  <Typography
                    as="a"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold cursor-pointer"
                    onClick={() => navigate("/about")}
                  >
                    Learn More
                  </Typography>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Login;
