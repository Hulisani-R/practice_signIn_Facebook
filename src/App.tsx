import React from 'react';
import './App.css';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import HomePage from "./views/Home/Home";
import {useFirebaseContext} from "./context";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login/>} />
        <Route path={"/login/*"} element={<Login/>}/>
        <Route path={"/signup"} element={<SignUp/>}/>
        <Route element={<Authenticated />}>
            <Route path={"/home"} element={<HomePage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;

const Authenticated = () => {
    const {firebaseUser } = useFirebaseContext()
    if (firebaseUser) {
        return <Outlet />
    }
    return <Navigate to={"/"}/>
}