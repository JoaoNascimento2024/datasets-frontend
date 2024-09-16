/* eslint-disable react/prop-types */
import { Sheet, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";

const SendDatasets = ({ datasets }) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-foreground select-none">
            Uploads Recentes
          </CardTitle>
          <Upload className="ml-auto h-4 w-4" />
        </div>
        <CardDescription>
          Últimos uploads enviados para o sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!datasets || datasets.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-12 h-12 border-4 border-t-4 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
          </div>
        ) : (
          datasets
            .slice()
            .reverse()
            .slice(0, 5)
            .map((dataset) => (
              <Link
                className="cursor-pointer"
                to={`/datasets/${dataset._id}`}
                key={dataset._id}>
                <article
                  key={dataset._id}
                  className="border-b rounded-md py-2 hover:bg-muted">
                  <div className="mx-4 flex items-center">
                    <Sheet className="text-gray-600" />
                    <h1 className="text-sm sm:text-base font-semibold ml-2">
                      {dataset.name}
                    </h1>
                    <div className="ml-auto">
                      <span className="text-[12px] sm:text-sm text-foreground">
                        Enviado por:
                      </span>
                      <p className="text-[12px] sm:text-sm text-gray-600 font-semibold">
                        {dataset.user ? dataset.user.username : "Sem usuário"}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            ))
        )}
      </CardContent>
    </Card>
  );
};

export default SendDatasets;
