import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";

const Header = () => {
  const useAppstate = useContext(Appstate);

  return (
    <div className="sticky top-0 z-10 header text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-4 border-gray-500 bg-white">
      <Link to={"/"}>
        <span>
          Filmy<span className="text-white">Verse</span>
        </span>
      </Link>
      {useAppstate.login ? (
        <Link to={"/addmovie"}>
          <h1 className="text-lg text-white cursor-pointer flex items-center">
            <Button>
              <AddIcon className="mr-2" color="secondary" />
              <span className="text-white">Add New</span>
            </Button>
          </h1>
        </Link>
      ) : (
        <Link to={"/Login"}>
          <h1 className="text-lg bg-green-500 text-white cursor-pointer flex items-center">
            <Button>
              <span className="text-white">Login</span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
