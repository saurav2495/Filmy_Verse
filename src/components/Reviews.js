import React, { useContext, useState, useEffect } from "react";
import ReactStars from "react-stars";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { reviewsRef, db } from "./firebase/Firebase";
import { Appstate } from "../App";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Reviews = ({ id, prevRating, userRated }) => {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0);

  const sendreview = async () => {
    setLoading(true);
    try {
      if (useAppstate.login) {
        await addDoc(reviewsRef, {
          movieid: id,
          name: useAppstate.userName,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime(),
        });
        swal({
          title: "successfully added",
          icon: "success",
          timer: 3000,
          button: "false",
        });
        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });
        setRating(0);
        setForm("");
        setNewAdded(newAdded + 1);
        swal({
          title: "Review Sent",
          icon: "success",
          timer: 3000,
          button: "false",
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        timer: 3000,
        button: "false",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      setData([]);
      let quar = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quar);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
      setReviewsLoading(false);
    }
    getData();
  }, [newAdded]);
  return (
    <>
      <div className="mt-4 w-full">
        <ReactStars
          size={30}
          half={true}
          value={rating}
          onChange={(rate) => setRating(rate)}
        />
        <input
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-2 outline-none header"
        />
        <button
          onClick={sendreview}
          className="bg-green-600 w-full flex justify-center mt-3 p-2"
        >
          {" "}
          {loading ? <TailSpin height={25} color="white" /> : "Share"}
        </button>
        {reviewsLoading ? (
          <div className="mt-8 flex justify-center ">
            <ThreeDots height={20} color="white" />
          </div>
        ) : (
          <div className="mt-4">
            {data.map((e, i) => {
              return (
                <div
                  className="bg-gray-900 p-2 w-full header border-gray-600 mt-2"
                  key={i}
                >
                  <div className="flex items-center">
                    <p className="text-blue-500">{e.name}</p>
                    <p className="ml-4">
                      {" "}
                      ({new Date(e.timestamp).toLocaleString()})
                    </p>
                  </div>
                  <ReactStars size={30} half={true} value={e.rating} />
                  <p>{e.thought}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
