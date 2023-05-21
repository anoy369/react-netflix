import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/auth-context";
import {
  AiOutlineClose,
  AiOutlinePlus,
  AiFillPlayCircle,
  AiOutlineLike,
  AiFillSound,
  AiOutlineSound 
} from "react-icons/ai";
import { db } from "../firebase";
import { arrayUnion, doc, onSnapshot, QuerySnapshot, updateDoc } from "firebase/firestore";
import './movie-details.css'
import requests from "../requests";

const MovieDetails = ({ details, setDetails, item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);
  const [trendyMovies, setTrendyMovies] = useState([]);
  const [likedShows, setLikedShows] = useState([]);
  const movieID = doc(db, "users", `${user?.email}`);
  const [sound, setSound] = useState(false);

  // console.log(item);

  
  const  fetchURL = requests.requestUpcoming;
useEffect(() => {
  axios.get(fetchURL).then((response) => {
    setTrendyMovies(response.data.results);
    console.log(trendyMovies);
  });
}, [fetchURL]);
  
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieID, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveShow = async () => {
    if (user?.email) {
      setSaved(true);
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
    } else {
      alert("Please log in to save a movie");
    }
  };

  const changeSound = () => {
    setSound(!sound)
  }
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str
    }
  }

  return (
    <div className="fixed z-30 top-[0%] left-[0%] w-[100%] h-[100vh] overflow-y-auto flex items-center justify-center">
      <div className="truncate relative rounded w-[60%] h-auto">
        <div className="relative rounded w-full h-auto text-white">
          <div className="rounded w-full h-[70%] movie-poster relative">
            <img
              className="w-full object-contain"
              src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
              alt={item?.title}
            />
            <div className="absolute w-full bottom-[0%] p-4 md:p-8">
              <h4 className="font-bold text-white">
                {item?.title}
              </h4>
              <div className="my-4 flex flex-row justify-between">
                <div className="flex flex-row">
                  <button className="border  rounded bg-white text-black py-2 px-5 flex items-center">
                    <AiFillPlayCircle className="mr-1" /> Play
                  </button>
                  <button className="border rounded-full bg-[#42424206] text-white border-gray-300 p-3 ml-4">
                    <AiOutlinePlus />
                  </button>
                  {item.liked == null ? (
                    <button
                      onClick={saveShow}
                      className="border rounded-full bg-[#42424206] text-white border-gray-300 p-3 ml-4"
                    >
                      <AiOutlineLike />
                    </button>
                  ) : (
                    <button
                      onClick={deleteShow}
                      className="border rounded-full bg-white text-black border-gray-300 p-3 ml-4"
                    >
                      <AiOutlineLike />
                    </button>
                  )}
                </div>
                <div className="flex flex-row">
                    <button onClick={changeSound}
                      className="border rounded-full bg-[#42424206] text-white border-gray-300 p-3 ml-4"
                    >
                      { sound ? <AiFillSound   /> : <AiOutlineSound /> }
                    </button>
                </div>

              </div>
              {/* <p onClick={saveShow}>
              {like ? (
                <FaHeart className="absolute top-4 left-4 text-gray-300" />
              ) : (
                <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
              )}
            </p> */}
            </div>
          </div>
          <div className="h-[30%] bg-[#141414] p-4 md:p-8 flex">
            <div className="w-2/3 whitespace-normal leading-none pr-[5%]">
              <div className="text-gray-400 text-sm">
              Released: {item?.release_date}
              </div>
              <div className="w-full text-gray-200">
              {truncateString(item?.overview, 200)}
              </div>
            </div>
            <div className="w-1/3 whitespace-normal leading-none">
              <div className="cast mb-2">
                <span className="text-gray-400 text-sm">Cast: </span> {item?.cast ? <span>{item?.cast}</span> : <span>No data found...</span>}
              </div>
              <div className="genres mb-2">
                <span className="text-gray-400 text-sm">Genres: </span> {item?.cast ? <span>{item?.cast}</span> : <span>No data found...</span>}
              </div>
              <div className="type mb-2">
                <span className="text-gray-400 text-sm">This Movie is: </span> {item?.cast ? <span>{item?.cast}</span> : <span>No data found...</span>}
              </div>
            </div>
          </div>
        </div>
        <p
          onClick={() => setDetails(false)}
          className="absolute rounded-full bg-black text-gray-300 top-4 right-4 p-1"
        >
          <AiOutlineClose />
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
