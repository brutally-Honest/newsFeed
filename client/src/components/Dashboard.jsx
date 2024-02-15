import { CategoryFeeds } from "./Category/CategoryFeeds";
import { jwtDecode } from "jwt-decode";
export const Dashboard = () => {
  let token;
  if (localStorage.getItem("token")) {
    token = jwtDecode(localStorage.getItem("token"));
  }
  return (
    <div className="flex justify-center ">
      <CategoryFeeds />
    </div>
  );
};
