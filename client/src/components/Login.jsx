import { useFormik } from "formik";
import { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../config/axios";
import { jwtDecode } from "jwt-decode";
import * as Yup from "yup";
export const Login = () => {
  const navigate = useNavigate();

  const { userDispatch } = useContext(userContext);
  const [serverError, setServerError] = useState("");
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email format")
      .required("Email is required *"),
    password: Yup.string().required("Password is required *"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      try {
        const token = await axiosInstance.post("/users/login", formData);
        localStorage.setItem("token", token.data);
        const { role } = jwtDecode(token.data);
        const responses = await Promise.allSettled([
          await axiosInstance.get("/feeds/category?limit=20&skip=0"),
          await axiosInstance.get(`/category/all`),
        ]);

        userDispatch({
          type: "SET_FEEDS_AND_CATEGORIES",
          payload: responses.map((e) => e.value.data),
        });

        resetForm();
        role === "admin" ? navigate("/categories") : navigate("/dashboard");
      } catch (e) {
        console.log(e.response);
        setServerError(e.response.data);
      }
    },
  });

  return (
    <div className="bg-violet-400  flex-1 flex justify-center items-center">
      <div className="loginDiv bg-black flex flex-col justify-center items-center rounded-md shadow-md  h-[400px] w-[400px] ">
        <div className="mb-6 w-full flex justify-center text-xl">
          <h1 className="text-white  font-semibold text-xl">
            Sign in to see Latest News
          </h1>
        </div>
        <div className="flex flex-2 items-center justify-center w-full text-white">
          <form
            className="flex flex-col items-center  mb-3"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col w-full">
              <label htmlFor="email" className=" mb-2 text-sm font-medium  ">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className=" sm:text-sm rounded-[3px] w-[255px] p-1.5 mt-0.5 border-none outline-black bg-slate-700"
                placeholder="name@email.com"
              />
              <div className="h-6 pl-[2px] mt-[2px] text-sm text-red-500">
                {formik.errors.email}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password" className=" mb-2 text-sm font-medium ">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="••••••••"
                className=" sm:text-sm rounded-[3px] w-[255px] p-1.5 mt-0.5 border-none outline-black bg-slate-700"
              />
              <div className="h-6 pl-[2px] mt-[2px] text-sm text-red-500">
                {formik.errors.password}
                {serverError}
              </div>
            </div>
            <div className="flex justify-center ">
              <input
                type="submit"
                value={`Sign In`}
                className={`cursor-pointer text-indigo-600 px-5 p-2 mt-0 border-none outline-indigo-400 rounded-md  font-semibold hover:bg-indigo-600 hover:text-white hover:shadow-md `}
              />
            </div>
          </form>
        </div>
        <div className="flex items-center">
          <p className="text-sm font-light text-gray-500 flex justify-center  mt-2">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:underline pl-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
