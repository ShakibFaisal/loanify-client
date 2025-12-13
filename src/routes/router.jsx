import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Login/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout></MainLayout>,
    children:[
      {
        index:true,
        Component:Home
      },{
        path:"/login",
        Component: Login
      },{
        path:"/register",
        Component: Register
      }
    ]
  },
]);