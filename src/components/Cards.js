import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { movieRef } from "./firebase/Firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(movieRef);
      _data.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between px-3">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ThreeDots height={56} color="white" />
        </div>
      ) : (
        data.map((e) => {
          return (
            <Link key={e.id} to={`/details/${e.id}`}>
              <div className="card-font-small shadow-lg p-2 bg-gray-800 card-shadow-lg hover:-translate-y-2 cursor-pointer mt-6 transition-all duration-500">
                <img
                  className="mx-auto h-60 md:h-72 object-cover"
                  src={e.image}
                  alt={e.title}
                />
                <h1>{e.title}</h1>
                <h1 className="flex items-center">
                  <span className="text-gray-500 mr-1">Rating: </span>
                  <ReactStars
                    size={20}
                    half={true}
                    edit={false}
                    value={e.rating / e.rated}
                  />
                </h1>
                <h1>
                  <span className="text-gray-500">Year: </span>
                  {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
