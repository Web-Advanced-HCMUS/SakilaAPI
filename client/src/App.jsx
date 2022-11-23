import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./index.css";
import { HomePage, RoomPage } from "./pages";
import { v4 as uuidv4 } from "uuid";
import socketClient from "./configs/socketClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const uuid = () => uuidv4();
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socketClient.on("user-is-joined", (data) => {
      if (data.success) {
        setUsers(data.users);
      }
    });

    socketClient.on("all-users", (data) => {
      setUsers(data.users);
    });
  }, [users, setUsers]);

  return (
    <div className="h-screen w-screen">
      {/* <nav className="bg-slate-200 p-4 mb-2">
        <ul className="flex text-2xl">
          <li className="mx-3">
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav> */}
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage uuid={uuid} socket={socketClient} setUser={setUser} />
          }
        />
        <Route
          path="/room/:id"
          element={<RoomPage user={user} users={users} socket={socketClient} />}
        />
      </Routes>
    </div>
  );
}

export default App;
