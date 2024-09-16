import DatasetTable from "@/components/DatasetTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Datasets = () => {
  return (
    <main className="sm:ml-14 p-6 sm:h-screen w-auto">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-4xl font-bold my-4">Datasets</h1>

        <Link to="/datasets/create">
          <Button className="p-4 w-28">Novo</Button>
        </Link>
      </div>
      <section>
        <DatasetTable />
      </section>
    </main>
  );
};

export default Datasets;
