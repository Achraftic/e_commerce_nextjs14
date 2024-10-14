import React from 'react';
import H1 from './ui/h1'; // Assuming you have H1 component in your ui folder
import { AiOutlineLaptop } from 'react-icons/ai';
import { SlScreenSmartphone } from "react-icons/sl";
import { CiCamera, CiHeadphones } from 'react-icons/ci';
import { TbDeviceWatch } from "react-icons/tb";
import { IoCameraOutline } from "react-icons/io5";
// Define a list of categories with their names and corresponding icons
const categories = [
  { name: 'Laptops', icon: AiOutlineLaptop },
  { name: 'Phones', icon: SlScreenSmartphone },
  { name: 'Cameras', icon: IoCameraOutline },
  { name: 'Headphones', icon: CiHeadphones },
  { name: 'Watch', icon: TbDeviceWatch },
];

export default function BrowseByCategory() {
  return (
    <div className="  my-20">
      <H1 className="  mb-16">Browse by Category</H1>

      <ul className="grid grid-cols-2 sm:grid-cols-5 gap-6 h-32">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex flex-col items-center justify-center bg-zinc-100 p-4 rounded-md hover:bg-primary text-zinc-900 hover:text-zinc-50 cursor-pointer transition"
          >
            {/* Render the icon */}
            <category.icon className=" text-4xl mb-2" />
            {/* Render the category name */}
            <span className=" text-base">{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
