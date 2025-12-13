import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Login/Register";
import AvailableLoan from "../Pages/AvailableLoan/AvailableLoan";
import LoanDetails from "../Pages/LoanDetails";
import PrivetRoute from "../PrivetRoute/PrivetRoute";


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
      },{
        path:"/available",
        Component:AvailableLoan
      },{
        path:"/loans/:id",
        element:<PrivetRoute><LoanDetails></LoanDetails></PrivetRoute>
       
      }
    ]
  },
]);