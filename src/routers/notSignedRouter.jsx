import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import HeaderHome from "@/components/HeaderHome";
import NotFound from "@/pages/NotFound";

export const NotSignedRouter = () => {
  return (
    <>
      <HeaderHome />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
