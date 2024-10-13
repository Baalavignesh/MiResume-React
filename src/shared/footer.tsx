import { Button, Typography } from "@material-tailwind/react";
import {  appLogo2 } from "../assets";
import { useDispatch } from "react-redux";
import { setTokens } from "../features/auth/authSlice";
import { clearLocalStorage } from "../helper/localStorage";
import { useNavigate } from "react-router-dom";

const MyFooter: React.FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(
      setTokens({
        accessToken: "",
        email: "",
      })
    );
    clearLocalStorage();
    navigate("/");
  };


  return (
    <footer className="w-full  p-12 py-6 border-t-2 mt-12">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between">
        <div className="flex flex-col gap-0 justify-center items-center">
          <img src={appLogo2} className="w-36"></img>
          {/* @ts-ignore */}
          <Typography
            color="blue-gray"
            className="text-center font-normal text-xs self-start pl-2"
          >
            &copy; 2024 MiResume
          </Typography>
        </div>


        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">

          <li>
            {/* @ts-ignore */}
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            {/* @ts-ignore */}

            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            {/* @ts-ignore */}
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </Typography>
          </li>
          <li>
            {/* @ts-ignore */}
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
          <Button onClick={handleLogout}>Logout</Button>

        </ul>
      </div>
    </footer>
  );
};

export default MyFooter;
