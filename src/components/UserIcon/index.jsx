
import { Avatar, AvatarFallback } from "../ui/avatar";

/* eslint-disable react/prop-types */
const UserIcon = ({ name }) => {
  const initial = name.charAt(0).toUpperCase();
  

  return (
    <Avatar className="h-6 w-6" >
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  );
};

export default UserIcon;
