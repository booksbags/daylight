import React from "react";
import {useRoutes } from "react-router-dom";
import Home from "@pages/home";
import Login from "@pages/login";
import Daily from "@pages/daily";
import Test from "@pages/test";
import BodyInfo from "@pages/bodyInfo";
import HandSpeed from "@pages/practice/handSpeed";
import Concentration from "@pages/practice/concentration";
import Skill from "@pages/home/components/skill";

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
      },{
         path: "/bodyInfo",
         element: <BodyInfo/>
      },{
         path: "/practice/handSpeed",
         element: <HandSpeed></HandSpeed>
      },{
         path: "/practice/concentration",
         element: <Concentration></Concentration>
      },{
         path: "/home/skill",
         element: <Skill/>
      }
   ]);
}

export default Router;