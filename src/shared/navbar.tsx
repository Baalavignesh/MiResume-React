import { useNavigate } from "react-router-dom";
import { appLogo, appLogo2 } from "../assets";

const NavBar: React.FC = () => {
  let navigate = useNavigate();

  return (
    <div className="p-4 py-6 pl-12 pr-12 flex justify-center items-center bg-white border-b-gray-100 border-2 text-black">
      {/* <img
        src={appLogo2}
        className="cursor-pointer w-32 absolute left-10"
      /> */}
      <p
        className="font-light text-3xl cursor-pointer w-32 absolute left-10"
        onClick={() => navigate("/dashboard")}
      >
        MiResume
      </p>
      <div className="flex gap-12 font-light text-md">
        <h4
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer border-b-2 border-b-white hover:border-blue-300 transition-all duration-200"
        >
          MiResume
        </h4>
        <h4
          onClick={() => navigate("/about")}
          className="cursor-pointer border-b-2 border-b-white hover:border-blue-300 transition-all duration-200"
        >
          About us
        </h4>
        <h4
          onClick={() => navigate("/profile")}
          className="cursor-pointer border-b-2 border-b-white hover:border-blue-300 transition-all duration-200"
        >
          Profile
        </h4>
      </div>
      <div></div>
    </div>
  );
};
export default NavBar;
