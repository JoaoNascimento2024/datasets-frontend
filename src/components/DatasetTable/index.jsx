"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import UserIcon from "../UserIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useContext, useEffect, useState } from "react";
import { DatasetService } from "@/services/DatasetService";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import DatasetDelete from "../DatasetDelete";
import { Link } from "react-router-dom";

const DatasetTable = () => {
  const { user } = useContext(AuthContext);
  const [datasets, setDatasets] = useState([]);
  const [myDatasets, setMyDatasets] = useState([]);

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

    const getDatasetsByUser = async () => {
      try {
        const response = await DatasetService.getByUser(user.id);
        setMyDatasets(response.data);
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
    getDatasetsByUser();
  }, []);

  return (
    <Tabs defaultValue="all-datasets">
      <TabsList>
        <TabsTrigger value="all-datasets">Todos</TabsTrigger>
        <TabsTrigger value="my-datasets">Meus Datasets</TabsTrigger>
      </TabsList>
      <TabsContent value="all-datasets">
        <Card className="mt-6">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Enviado por
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Criado em
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datasets.length !== 0 ? (
                  datasets.map((dataset, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {dataset.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {dataset.user ? (
                          <div className="md:flex md:flex-row md:items-center gap-1">
                            <UserIcon name={dataset.user.username} />
                            {dataset.user.username}{" "}
                          </div>
                        ) : (
                          <Badge variant="secondary">Sem usuário</Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {dataset.createdAt}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <Link to={`/datasets/${dataset._id}`}>
                                Detalhes
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      <p className="mt-4 text-lg">Nenhum dataset encontrado</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="my-datasets">
        <Card className="mt-6">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Enviado por
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Criado em
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myDatasets.length !== 0 ? (
                  myDatasets.map((dataset, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {dataset.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {dataset.user ? (
                          <div className="md:flex md:flex-row md:items-center gap-1">
                            <UserIcon name={dataset.user.username} />
                            {dataset.user.username}{" "}
                          </div>
                        ) : (
                          <Badge variant="danger">Sem usuário</Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {dataset.createdAt}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <Link to={`/datasets/${dataset._id}`}>
                                Detalhes
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-800"
                              onSelect={(e) => e.preventDefault()}>
                              <DatasetDelete id={dataset._id} />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      <p className="mt-4 text-lg">
                        Você não tem nenhum dataset
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DatasetTable;
