let SetLocalUserInfo = (userData: any) => {
  localStorage.setItem("userinfo", JSON.stringify(userData));
};

let clearLocalStorage = () => {
  localStorage.clear();
};

let fetchLocalData = () => {
  let data = localStorage.getItem("userinfo");
  return data ? JSON.parse(data) : null;
};


export { SetLocalUserInfo, clearLocalStorage, fetchLocalData };
