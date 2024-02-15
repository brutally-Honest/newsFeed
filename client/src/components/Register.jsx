import { useFormik } from "formik";
import { axiosInstance } from "../config/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
export const Register = () => {
  const [serverErrors, setServerErrors] = useState([]);
  const navigate = useNavigate();
  const registerSchema = Yup.object().shape({
    username: Yup.string().required("Username is required *"),
    email: Yup.string()
      .email("Invalid Email format")
      .required("Email is required *"),
    password: Yup.string()
      .min(8, "8 characters minimum")
      .required("Password is required *"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    validateOnChange: false,
    onSubmit: async (formData, { resetForm }) => {
      try {
        const { data } = await axiosInstance.post("/users/register", formData);
        console.log(data);
        resetForm();
        navigate("/login");
      } catch (e) {
        console.log(e);
        setServerErrors(e.response.data.errors);
      }
    },
  });
  return (
    <section className="bg-violet-400 flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center    mx-auto  ">
        <div className="p-6 w-[400px] space-y-4 md:space-y-6 sm:p-8 bg-black rounded-md">
          <h3 className=" font-bold sm:text-xl md:text-2xl dark:text-white">
            Create account
          </h3>
          <div className="flex justify-center items-center ">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col py-3 mt-2 md:mt-5 w-full items-center justify-center "
            >
              <div className="w-[80%] pb-2 ">
                <span className="font-semibold ">Username</span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  className="bg-slate-700 border-none text-white  md:h-[35px]  w-full  sm:h-[30px] sm:text-sm rounded-[3px] p-2.5"
                  placeholder="Your Name"
                />
                <div className="md:h-6 sm:h-4 sm:mt-[1px] pl-[2px] mt-[2px] text-sm text-red-500">
                  {formik.errors.username}
                  {serverErrors.msg}
                </div>
              </div>
              <div className="w-[80%] pb-2">
                <span className="font-semibold ">Email</span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="bg-slate-700 border-none text-white  md:h-[35px]  w-full sm:h-[30px] sm:text-sm rounded-[3px] p-2.5"
                  placeholder="name@email.com"
                />
                <div className="md:h-6 sm:h-4 sm:mt-[1px] pl-[2px] mt-[2px] text-sm text-red-500">
                  {formik.errors.email}
                  {serverErrors
                    .filter((e) => e.path === "email")
                    .map((e) => e.msg)}
                </div>
              </div>
              <div className="w-[80%] pb-2">
                <span className="font-semibold "> Password</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="bg-slate-700 border-none text-white md:h-[35px]  w-full  sm:h-[30px] sm:text-sm rounded-[3px] p-2.5"
                  placeholder="••••••••"
                />
                <div className="md:h-6 sm:h-4 sm:mt-[1px] pl-[2px] mt-[2px] text-sm text-red-500">
                  {formik.errors.password}
                  {serverErrors
                    .filter((e) => e.path === "password")
                    .map((e) => e.msg)}
                </div>
              </div>

              <input
                type="submit"
                className={`cursor-pointer text-indigo-600 px-5 p-2 mt-0 border-none outline-indigo-400 rounded-md  font-semibold hover:bg-indigo-600 hover:text-white hover:shadow-md `}
                value={"Register"}
              />
            </form>
          </div>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400 flex justify-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-1"
            >
              {" "}
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
