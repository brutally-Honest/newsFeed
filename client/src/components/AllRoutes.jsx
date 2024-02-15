import { Route, Routes } from "react-router-dom";

import { Login } from "./Login";
import { Register } from "./Register";
import { Dashboard } from "./Dashboard";
import { ProtectedRoutes } from "../utils/ProtectedRoutes";
import { SingleFeed } from "./Feeds/SingleFeed";
import { CategoryFeeds } from "./Category/CategoryFeeds";
import { Category } from "./Category/Category";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feeds/:id" element={<SingleFeed />} />
          <Route path="/feeds/category/:id" element={<CategoryFeeds />} />
          <Route path="/categories" element={<Category />} />
        </Route>
      </Routes>
    </>
  );
};
