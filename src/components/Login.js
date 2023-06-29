import React, { useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { query, where, getDocs } from "firebase/firestore";
import { usersRef } from "./firebase/Firebase";
import { Appstate } from "../App";
import bcrypt from "bcryptjs";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where("mobile", "==", form.mobile));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          navigate("/");
        } else {
          swal({
            title: "Invalid credential",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
      });
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
      console.log(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full flex flex-col mt-14 items-center">
        <h1 className="text-xl font-bold">Login</h1>
        <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-300"
            >
              Mobile
            </label>
            <input
              type="number"
              id="message"
              name="message"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></input>
          </div>
        </div>
        <div className="p-2 w-full md:w-1/3">
          <div className="relative">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></input>
          </div>
          <div className="p-2 w-full flex justify-center">
            <button
              onClick={login}
              className="text-lg bg-green-500 text-white cursor-pointer border-2 mt-2 py-2 px-8 flex items-center"
            >
              {loading ? <TailSpin height={20} color="white" /> : "Login  "}
            </button>
          </div>
          <div>
            <p className="mt-4">
              Do not have an account?{" "}
              <Link to="/Signup">
                <span className="text-blue-500">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
