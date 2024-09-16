/* eslint-disable no-unused-vars */
import ChartOverview from "@/components/Chart";
import SendDatasets from "@/components/SendigDatasets";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatasetService } from "@/services/DatasetService";
import { UserService } from "@/services/UserService";
import { Download, Search, SheetIcon, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [datasets, setDatasets] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const getDatasets = async () => {
      try {
        const response = await DatasetService.getAll();
        setDatasets(response.data);
      } catch (error) {
        toast.error("Error", {
          variant: "error",
          description: "Erro ao buscar datasets",
          action: {
            label: "Fechar",
          },
        });
      }
    };

    const getUsers = async () => {
      try {
        const response = await UserService.getAll();
        setUsers(response.data);
      } catch (error) {
        toast.error("Error", {
          variant: "error",
          description: "Erro ao buscar datasets",
          action: {
            label: "Fechar",
          },
        });
      }
    };

    getDatasets();
    getUsers();
  }, []);

  return (
    <>
      <main className="flex-grow sm:ml-14 p-6 w-auto mb-8">
        <h1 className="text-4xl font-bold my-4">Dashboard</h1>
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-foreground select-none">
                  Total de Datasets
                </CardTitle>
                <SheetIcon className="ml-auto h-4 w-4" />
              </div>
              <CardDescription>
                Total de datasets importados no sistema.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold">
                {datasets ? datasets.length : 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-foreground select-none">
                  Total de Downloads
                </CardTitle>
                <Download className="ml-auto h-4 w-4" />
              </div>
              <CardDescription>
                Total de downloads realizados no sistema.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold">Não integrado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-foreground select-none">
                  Total de Usuários
                </CardTitle>
                <Users className="ml-auto h-4 w-4" />
              </div>
              <CardDescription>
                Total de usuários ativos no sistema.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold">
                {users ? users.length : 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <CardTitle className="text-lg sm:text-xl text-foreground select-none">
                  Total de Consultas
                </CardTitle>
                <Search className="ml-auto h-4 w-4" />
              </div>
              <CardDescription>
                Total de consultas realizadas no sistema.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-base sm:text-lg font-bold">Não integrado</p>
            </CardContent>
          </Card>
        </section>
        <section className="mt-4 flex flex-col md:flex-row gap-4">
          <ChartOverview datasets={datasets} />
          <SendDatasets datasets={datasets} />
        </section>
      </main>
    </>
  );
};

export default Dashboard;
