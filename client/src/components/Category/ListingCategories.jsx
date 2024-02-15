import { useContext, useEffect } from "react";
import { axiosInstance } from "../../config/axios";
import { userContext } from "../../context/userContext";
import { Link } from "react-router-dom";
export const ListingCategories = () => {
  const { userState, userDispatch } = useContext(userContext);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(`/category/all`);
        userDispatch({
          type: "SET_CATEGORIES",
          payload: data,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const deleteCategory = async (cid, cname) => {
    const confirm = window.confirm(
      `Are you sure you want to delete category ${cname} and its feeds?`
    );
    if (confirm) {
      try {
        const { data } = await axiosInstance.delete(
          `/category/delete?id=${cid}`
        );
        console.log(data);
        userDispatch({
          type: "DELETE_CATEGORY",
          payload: data.category,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="p-3">
      <strong className="text-2xl">
        ListingCategories - {userState.categories.length}
      </strong>
      {userState.categories.map((e) => (
        <div key={e._id}>
          <Link
            className="text-xl"
            to={`/feeds/category/${e._id}`}
            state={{ name: e.name }}
          >
            {e.name}
          </Link>
          <button
            className=" mx-2 px-2 py-0"
            onClick={() => deleteCategory(e._id, e.name)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};
