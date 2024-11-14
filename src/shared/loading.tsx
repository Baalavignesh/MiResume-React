import { Bars } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="text-center">
      <div role="status">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default Loading;
