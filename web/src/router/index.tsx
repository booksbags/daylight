import React from "react";
import {useRoutes } from "react-router-dom";
import Home from "@pages/home";
import Login from "@pages/login";

function Router(){
   return useRoutes([
      {
       path: "/",
       element:<Home></Home>
      },{
       path: "/login",
       element: <Login></Login>
      }
   ]);
}

export default Router;