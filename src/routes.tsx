import { BsBoxSeam } from "react-icons/bs";
import { GoGraph, GoHome } from "react-icons/go";
import { PiShoppingCartSimple } from "react-icons/pi";

export const  clientRoutes=[
    {
        path: "/",
        name:"Home",
       
    },
    {
        path: "/products",
        name:"Products",
       
    },
    {
        path: "/Contact",
        name:"Contact",
      
    },
    {
        path: "/About",
        name:"About",

    }

]

export const dashboardRoutes = [
    { name: "Dashboard", icon: <GoHome />, path: "/dashboard" },
    { name: "Products", icon: <BsBoxSeam />, path: "/dashboard/products" },
    { name: "Orders", icon: <PiShoppingCartSimple />, path: "/dashboard/orders" },
    { name: "Analytics", icon: <GoGraph />, path: "/dashboard/analytics" },
    
];
