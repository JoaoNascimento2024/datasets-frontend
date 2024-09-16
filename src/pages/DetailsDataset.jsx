/* eslint-disable react-hooks/exhaustive-deps */
import { Skeleton } from "@/components/ui/skeleton";
import { DatasetService } from "@/services/DatasetService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const DetailsDatasets = () => {
  const [dataset, setDataset] = useState();
  const params = useParams();

  useEffect(() => {
    const handleSearchDataset = async () => {
      try {
        const response = await DatasetService.getById(params.id);
        setDataset(response.data);
      } catch (error) {
        toast.error("Erro ao buscar dataset", {
          variant: "error",
          description: error.message,
          action: {
            label: "Fechar",
          },
        });
      }
    };

    handleSearchDataset();
  }, []);

  return (
    <main className="sm:ml-14 p-6 sm:h-screen w-auto">
      {!dataset ? (
        <div className="space-y-2">
        <Skeleton className="h-8 w-[300px] my-4" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold my-4">{dataset.name}</h1>
          <p className="text-sm text-muted-foreground">{dataset.description}</p>
        </>
      )}

      <section className="mt-6 max-w-5xl"></section>
    </main>
  );
};

export default DetailsDatasets;
