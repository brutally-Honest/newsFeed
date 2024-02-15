import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { axiosInstance } from "../../config/axios";

export const SingleFeed = () => {
  const { id } = useParams();
  const { userState } = useContext(userContext);
  const feedFound = userState?.feeds?.find((e) => e._id === id);
  const [feed, setFeed] = useState(feedFound || {});
  useEffect(() => {
    if (!feedFound) {
      (async () => {
        try {
          const { data } = await axiosInstance.get(`/feeds/one?id=${id}`);
          setFeed(data);
        } catch (e) {
          console.log(e.response);
        }
      })();
    }
  }, []);

  return (
    <div className=" flex flex-col items-center ">
      <div className="w-[60vw] border-[1.5px] rounded p-5 bg-stone-900">
        <div className="text-3xl font-semibold text-center">{feed?.title}</div>

        {feed?.image !== "No image" && (
          <div className="flex justify-center m-3  ">
            <div className=" p-2 border-[1.5px] bg-white rounded w-fit ">
              <img
                src={feed?.image}
                width={500}
                height={400}
                className="border-[2px] border-black rounded object-cover h-[400px]"
              />
            </div>
          </div>
        )}
        <div className="px-0 my-5 border-b-2"></div>
        <div className="text-xl font-semibold pb-2">
          {feed?.description === ""
            ? "No description Available"
            : feed?.description}
        </div>
        <div className="pb-2 font-medium ">
          Published -
          <span className="px-2 text-teal-200">
            {new Date(feed?.pubDate).toDateString()}
          </span>
          <span className=" text-teal-200">
            {" "}
            {new Date(feed?.pubDate).toLocaleTimeString()}
          </span>
        </div>
        <a target="_blank" href={feed?.link}>
          Read more ...
        </a>
      </div>
    </div>
  );
};
