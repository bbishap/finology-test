import { UserInterface } from "@/types/userTypes";
import React from "react";

interface UserCardProps {
  userData: UserInterface;
}

const UserCardComponent: React.FC<UserCardProps> = ({ userData }) => {
  return (
    <div
      key={userData.id}
      className="p-6 border rounded-lg shadow-lg flex flex-col cursor-pointer hover:bg-stone-400 focus:outline-2 focus:outline-offset-2 focus:outline-stone-500 active:bg-stone-700 transform transition-transform duration-300 hover:scale-103"
    >
      <h2 className="font-semibold ">Name : {userData.name}</h2>
      <h4 className="font-regular"> Email : {userData.email}</h4>
      <h4 className="font-regular"> City : {userData.address.city}</h4>
      <h4 className="font-regular"> Company: {userData.company.name}</h4>
      <h4 className="font-regular"> Phone: {userData.phone}</h4>
      <h4 className="font-regular"> Website: {userData.website}</h4>
    </div>
  );
};

export const UserCard = React.memo(UserCardComponent);
