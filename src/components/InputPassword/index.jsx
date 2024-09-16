/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { Eye, EyeOff } from "lucide-react";

import { forwardRef, useState } from "react";
import { Input } from "../ui/input";


const InputPassword = forwardRef(({ value, onChange, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      return (
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            {...rest}
          />
          <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2">
              {showPassword ? (
                <EyeOff size={20} color="#64748b" />
              ) : (
                <Eye size={20} color="#64748b" />
              )}
            </button>
        </div>
      );
});
 
export default InputPassword;