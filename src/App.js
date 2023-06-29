import Cards from "./components/Cards";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Addmovie from "./components/Addmovie";
import Details from "./components/Details";
import { createContext, useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {});
  return (
    <>
      <Appstate.Provider value={{ login, userName, setLogin, setUserName }}>
        <div className="App relative">
          <Header />
          <Routes>
            <Route path="/" element={<Cards />}></Route>
            <Route path="/addmovie" element={<Addmovie />}></Route>
            <Route path="/details/:id" element={<Details />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </Appstate.Provider>
    </>
  );
}

export default App;
export { Appstate };
// so lets check it
