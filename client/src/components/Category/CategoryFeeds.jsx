import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axios";
import { Paginate } from "../Paginate";
import { userContext } from "../../context/userContext";

export const CategoryFeeds = () => {
  const { userState } = useContext(userContext);
  const { id } = useParams();
  const { state } = useLocation();

  const [categoryBasedFeeds, setCategoryBasedFeeds] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(
          `/feeds/category?id=${id ? id : ""}&limit=${itemsPerPage}&skip=${
            currentPage * itemsPerPage - itemsPerPage
          }`
        );
        setCategoryBasedFeeds(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [currentPage, id]);
  return (
    <>
      {userState?.feeds?.length > 0 && categoryBasedFeeds?.feeds?.length > 0 ? (
        <div className="flex  justify-center ">
          <div className="flex flex-col p-3">
            {userState?.categories.map((e) => (
              <Link
                key={e._id}
                state={{ name: e.name }}
                to={`/feeds/category/${e._id}`}
                className="text-lg text-emerald-500 hover:text-teal-100"
                onClick={() => setCurrentPage(1)}
              >
                {e.name}
              </Link>
            ))}
          </div>
          <div className=" px-10 pt-5 text-xl flex flex-col shadow-lg font-medium items-center border-2 border-black rounded pb-5 ">
            <div className="text-3xl ">
              {state ? state.name : "Latest Feeds"}
            </div>
            <div className="h-[70vh] w-[45vw] flex flex-col ">
              {categoryBasedFeeds?.feeds?.map((e) => (
                <h3 key={e._id} className="py-1">
                  <Link to={`/feeds/${e._id}`}>{e.title}</Link>
                  {!id && (
                    <span>
                      {" "}
                      -{" "}
                      <Link
                        to={`/feeds/category/${e.category?._id}`}
                        state={{ name: e.category?.name }}
                        className="text-green-400 hover:text-green-200"
                      >
                        ( {e.category?.name} )
                      </Link>
                    </span>
                  )}
                </h3>
              ))}
            </div>
            {categoryBasedFeeds?.feeds?.length > 0 && (
              <Paginate
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={categoryBasedFeeds.totalPages}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex  justify-center text-2xl">
          OOPs!!! News not available at the moment!
        </div>
      )}
    </>
  );
};
