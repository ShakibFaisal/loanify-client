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
import AdminRoute from "./AdminRoute/AdminRoute";
import AllLoans from "../Pages/Dashboard/AllLoans";
import LoanApplications from "../Pages/Dashboard/LoanApplications";
import AddLoan from "../Pages/Dashboard/AddLoan";
import ManagerRoute from "./AdminRoute/ManagerRoute";
import ManageLoans from "../Pages/Dashboard/ManageLoans";
import PendingLoans from "../Pages/Dashboard/PendingLoans";
import ApprovedLoans from "../Pages/Dashboard/ApprovedLoans";
import Profile from "../Pages/Dashboard/Profile";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import AboutUs from "../Pages/About";
import ContactUs from "../Pages/ContactUs";


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
      },{
        path:"about",
        Component:AboutUs
      },{
        path:"contact",
        Component:ContactUs
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
      element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>

    },{
      path:"all-loans",
      element:<AdminRoute><AllLoans></AllLoans></AdminRoute>
    },{
      path:"loan-applications",
      element:<AdminRoute><LoanApplications></LoanApplications></AdminRoute>
    },{
      path:"add-loan",
      element: <ManagerRoute><AddLoan></AddLoan></ManagerRoute>
    },{
      path:"manage-loans",
      element:<ManagerRoute><ManageLoans></ManageLoans></ManagerRoute>
    },{
      path:"pending-loans",
      element:<ManagerRoute><PendingLoans></PendingLoans></ManagerRoute>
    },{
      path:"approved-loans",
      element:<ManagerRoute><ApprovedLoans></ApprovedLoans></ManagerRoute>
    },{
      path:"profile",
      element:<Profile></Profile>
    },{
      path:"payment-success",
      element:<PaymentSuccess></PaymentSuccess>
    }]
  }
]);