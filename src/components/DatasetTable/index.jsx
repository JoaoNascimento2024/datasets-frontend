/* eslint-disable no-unused-vars */
"use client";
import { MoreHorizontal, Search } from "lucide-react";
import { useEffect, useState, useContext, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AuthContext } from "@/context/AuthContext";
import { DatasetService } from "@/services/DatasetService";
import { toast } from "sonner";
import UserIcon from "../UserIcon";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

const DatasetTable = () => {
  const { user } = useContext(AuthContext);
  const [datasets, setDatasets] = useState([]);
  const [myDatasets, setMyDatasets] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch datasets
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await DatasetService.getAll();
        setDatasets(response.data);
      } catch (error) {
        toast.error("Erro ao buscar datasets");
      }
    };

    const fetchMyDatasets = async () => {
      try {
        const response = await DatasetService.getByUser(user.id);
        setMyDatasets(response.data);
      } catch (error) {
        toast.error("Erro ao buscar datasets do usuário");
      }
    };

    fetchDatasets();
    fetchMyDatasets();
  }, [user.id]);

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nome",
        cell: ({ row }) => row.original.name || "Sem nome",
      },
      {
        accessorKey: "user.username",
        header: "Enviado por",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <UserIcon name={row.original.user?.username || "N/A"} />
            {row.original.user?.username || (
              <Badge variant="secondary">Sem usuário</Badge>
            )}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Criado em",
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to={`/datasets/${row.original._id}`}>
                <DropdownMenuItem>Detalhes</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  // Set up table instance for "Todos os Datasets"
  const table = useReactTable({
    data: datasets,
    columns,
    state: {
      globalFilter: search,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Set up table instance for "Meus Datasets"
  const myTable = useReactTable({
    data: myDatasets,
    columns,
    state: {
      globalFilter: search,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <Tabs defaultValue="all-datasets" className="mx-4">
      <TabsList>
        <TabsTrigger value="all-datasets">Todos</TabsTrigger>
        <TabsTrigger value="my-datasets">Meus datasets</TabsTrigger>
      </TabsList>

      <div className="py-4 w-2/4 mt-4 relative">
        <Input
          className="pl-10" // Adiciona padding à esquerda para o ícone não sobrepor o texto
          placeholder="Filtrar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          size={15}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <TabsContent value="all-datasets">
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:rounded-lg">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : header.column.columnDef.header}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="hover:rounded-lg">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.column.columnDef.cell
                            ? cell.column.columnDef.cell({ row })
                            : cell.getValue()}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      Nenhum dataset encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={table.previousPage}>
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={table.nextPage}>
            Próximo
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="my-datasets">
        <Card className="mt-6">
          <CardContent>
            <Table>
              <TableHeader>
                {myTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : header.column.columnDef.header}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {myTable.getRowModel().rows.length ? (
                  myTable.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.column.columnDef.cell
                            ? cell.column.columnDef.cell({ row })
                            : cell.getValue()}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      Nenhum dataset encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={!myTable.getCanPreviousPage()}
            onClick={myTable.previousPage}>
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!myTable.getCanNextPage()}
            onClick={myTable.nextPage}>
            Próximo
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DatasetTable;
