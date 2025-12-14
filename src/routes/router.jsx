import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Login/Register";
import AvailableLoan from "../Pages/AvailableLoan/AvailableLoan";
import LoanDetails from "../Pages/LoanDetails";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import DashBoardLayout from "../Layout/DashBoardLayout";
import LoanApplication from "../Pages/LoanApplication";
import MyLoans from "../Pages/Dashboard/MyLoans";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import UsersManagement from "../Pages/Dashboard/UserManagement";


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
       
      },{
        path:"loan-application/:id",
        Component:LoanApplication
      }
    ]
  },{
    path:"/dashboard",
    element:<PrivetRoute><DashBoardLayout></DashBoardLayout></PrivetRoute>,
    children:[{
      index:true,
      Component:DashboardHome
    },{
      path:"my-loans",
      Component:MyLoans
      
    },{
      path:"user-management",
      element:<UsersManagement></UsersManagement>

    }]
  }
]);