import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { userContext } from "../context/userContext";
import { jwtDecode } from "jwt-decode";

export const Navbar = () => {
  const { userDispatch } = useContext(userContext);
  let token;
  if (localStorage.getItem("token")) {
    token = jwtDecode(localStorage.getItem("token"));
  }
  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };
  return (
    <>
      {
        <nav className={`w-full py-1 pb-2`}>
          <div
            className={`flex ${
              token ? "justify-around" : "justify-center "
            }   flex-wrap items-center  mx-auto p-2 `}
          >
            {token ? (
              token.role === "admin" ? (
                <div className="flex justify-around">
                  <Link to="/dashboard" className="flex items-center  ">
                    <span className=" text-sm font-bold me-2 px-2.5 py-0.5  ">
                      LATEST FEEDS
                    </span>
                  </Link>
                  <Link to="/categories" className="flex items-center  ">
                    <span className=" text-sm font-bold me-2 px-2.5 py-0.5  ">
                      CATEGORIES
                    </span>
                  </Link>
                </div>
              ) : (
                <>
                  <Link to="/dashboard" className="flex items-center  ">
                    <span className=" text-sm font-bold me-2 px-2.5 py-0.5  ">
                      LATEST FEEDS
                    </span>
                  </Link>
                </>
              )
            ) : (
              <>
                <Link to="/login" className="flex items-center  ">
                  <span className=" text-sm font-bold me-2 px-2.5 py-0.5  ">
                    LOGIN
                  </span>
                </Link>
                <Link to="/register" className="flex items-center  ">
                  <span className=" text-sm font-bold me-2 px-2.5 py-0.5  ">
                    REGISTER
                  </span>
                </Link>
              </>
            )}
            <div className="flex items-center ">
              {token && (
                <>
                  <Link
                    to={"/login"}
                    onClick={handleLogout}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    Logout
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* <Outlet /> */}
        </nav>
      }
    </>
  );
};
