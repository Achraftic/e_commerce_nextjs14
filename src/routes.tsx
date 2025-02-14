import { BsBoxSeam } from "react-icons/bs";
import { GoGraph, GoHome } from "react-icons/go";
import { PiShoppingCartSimple } from "react-icons/pi";
import { BiCategoryAlt } from "react-icons/bi";

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
        path: "/contact",
        name:"Contact",
      
    },
    {
        path: "/about",
        name:"About",

    }

]

export const dashboardRoutes = [
    { name: "Dashboard", icon: <GoHome />, path: "/dashboard" },
    { name: "Products", icon: <BsBoxSeam />, path: "/dashboard/products" },
    { name: "Orders", icon: <PiShoppingCartSimple />, path: "/dashboard/orders" },
    { name: "Categories", icon: <BiCategoryAlt />, path: "/dashboard/categories" },
    { name: "Analytics", icon: <GoGraph />, path: "/dashboard/analytics" },
    
];
