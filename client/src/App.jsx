import { useEffect, useState, useReducer } from "react";
import { Navbar } from "./components/Navbar";
import { PuffLoader } from "react-spinners";
import { AllRoutes } from "./components/AllRoutes";
import { axiosInstance } from "./config/axios";
import { userContext } from "./context/userContext";
import { userReducer } from "./reducers/userReducer";

function App() {
  const [loading, setLoading] = useState(false);
  const [userState, userDispatch] = useReducer(userReducer, {
    feeds: [],
    categories: [],
    totalPages: 0,
  });
  useEffect(() => {
    if (localStorage.getItem("token"))
      (async () => {
        try {
          setLoading(true);
          const responses = await Promise.allSettled([
            await axiosInstance.get("/feeds/category?limit=20&skip=0"),
            await axiosInstance.get(`/category/all`),
          ]);
          userDispatch({
            type: "SET_FEEDS_AND_CATEGORIES",
            payload: responses.map((e) => e.value.data),
          });
          setLoading(false);
        } catch (e) {
          setLoading(false);
          console.log(e);
        }
      })();
  }, []);
  return (
    <>
      {loading ? (
        <div className="h-screen w-screen">
          <div className="flex justify-center items-center h-full">
            <PuffLoader size={90} speedMultiplier={1.5} color="#6238cf" />
          </div>
        </div>
      ) : (
        <userContext.Provider value={{ userDispatch, userState }}>
          <div className="flex flex-col h-screen w-screen">
            <Navbar />
            <AllRoutes />
          </div>
        </userContext.Provider>
      )}
    </>
  );
}

export default App;
