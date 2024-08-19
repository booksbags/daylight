import React from "react";
import {useRoutes } from "react-router-dom";
import Home from "@pages/home";
import Login from "@pages/login";
import Daily from "@pages/daily";
import Test from "@pages/test";

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
      },{
         path: "/test",
         element:<Test></Test>
      }
   ]);
}

export default Router;