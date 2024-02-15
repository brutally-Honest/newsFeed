import { useFormik } from "formik";
import { axiosInstance } from "../../config/axios";
import { useContext, useState } from "react";
import { userContext } from "../../context/userContext";
import * as Yup from "yup";
export const AddCategory = () => {
  const [serverErrors, setServerErrors] = useState([]);
  const { userDispatch } = useContext(userContext);
  const categoryValidationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required *"),
    url: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      )
      .required("Category URL is required *"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
    },
    validateOnChange: false,
    validationSchema: categoryValidationSchema,
    onSubmit: async (formData, { resetForm }) => {
      try {
        const { data } = await axiosInstance.post("/category/new", formData);
        resetForm();
        userDispatch({
          type: "ADD_CATEGORY",
          payload: data,
        });
      } catch (e) {
        console.log(e);
        setServerErrors(e.response.data.errors);
      }
    },
  });
  return (
    <div className="p-3 w-fit">
      <strong className="text-2xl">AddCategory</strong>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col ">
          <div className="py-1 px-1 w-[300px]">
            <label>
              <div className="text-lg font-semibold py-1">Name</div>
              <input
                type="text"
                className="p-1 rounded w-[300px]"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </label>
            <div className="h-5 text-normal text-red-500">
              {formik.errors.name}
              {serverErrors.filter((e) => e.path === "name").map((e) => e.msg)}
            </div>
          </div>

          <div className="py-1 px-1 ">
            <label>
              <div className="text-lg font-semibold py-1">Url</div>
              <input
                type="text"
                className="p-1 rounded w-[300px]"
                name="url"
                value={formik.values.url}
                onChange={formik.handleChange}
              />
            </label>
            <div className="h-5 text-normal text-red-500">
              {formik.errors.url}
              {serverErrors.filter((e) => e.path === "url").map((e) => e.msg)}
            </div>
          </div>

          <div className="flex justify-center my-4">
            <input
              className="px-1 py-1.5  rounded bg-indigo-500 font-semibold cursor-pointer hover:bg-indigo-400"
              type="submit"
              value={"Add Category"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
