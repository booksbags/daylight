import React from "react";
import {useRoutes } from "react-router-dom";
import Home from "@pages/home";
import Login from "@pages/login";
import Daily from "@pages/daily";

function Router(){
   return useRoutes([
      {
       path: "/",
       element:<Home></Home>
      },{
         path: "/home",
         element:<Home></Home>
      },{
       path: "/login",
       element: <Login></Login>
      },{
         path: "/daily",
         element: <Daily></Daily>
      }
   ]);
}

export default Router;