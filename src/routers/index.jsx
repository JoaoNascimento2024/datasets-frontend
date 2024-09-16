import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { SignedRouter } from "./signedRouter";
import { NotSignedRouter } from "./notSignedRouter";
import { Route, Routes } from "react-router-dom";
import Footer from "@/components/Footer";

export const AppRouter = () => {
  const { signed } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex-grow">
        <Routes>
          {!signed ? (
            <Route path="/*" element={<NotSignedRouter />} />
          ) : (
            <Route path="/*" element={<SignedRouter />} />
          )}
        </Routes>
      </div>
      

      <Footer />
    </div>
  );
};
