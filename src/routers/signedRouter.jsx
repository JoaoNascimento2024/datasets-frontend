import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import NotFound from "@/pages/NotFound";
import Datasets from "@/pages/Datasets";
import CreateDataset from "@/pages/CreateDataset";
import DetailsDatasets from "@/pages/DetailsDataset";

export const SignedRouter = () => {
  return (
    <>
    <Sidebar />
    <Header />
      <Routes>
        <>
        <Route path="/" element={<Dashboard />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/datasets/create" element={<CreateDataset />} />
        <Route path="/datasets/:id" element={<DetailsDatasets />} />
        </>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
