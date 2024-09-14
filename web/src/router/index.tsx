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
import Experience from "@pages/experience";
import NetworkUse from "@pages/networkUse";
import NetworkUseDetail from "@pages/networkUse/detail";
const route = [
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
   },{
      path: "/experience",
      element: <Experience/>
   },{
      path: "/networkUse/detail",
      element: <NetworkUseDetail></NetworkUseDetail>
   }
];
route.push({
   path: "/networkUse",
   element: <NetworkUse></NetworkUse>
});
function Router(){
   return useRoutes(route);
}

export default Router;