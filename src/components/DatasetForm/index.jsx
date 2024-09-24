/* eslint-disable no-unused-vars */
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Link } from "react-router-dom";
import { DatasetService } from "@/services/DatasetService";
import { toast } from "sonner";
import { useRef } from "react";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  file: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Arquivo é obrigatório",
    })
    .refine(
      (files) => {
        const allowedExtensions = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "text/csv",
        ];
        const file = files[0];
        return (
          allowedExtensions.includes(file?.type) ||
          /\.(xlsx|csv)$/.test(file?.name)
        );
      },
      {
        message: "O arquivo deve ser do tipo .xlsx ou .csv",
      }
    ),
});

const DatasetForm = () => {
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      file: null,
    },
  });

  const handleSignIn = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("file", values.file[0]);

    try {
      const response = await DatasetService.create(formData);

      form.reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      
      form.reset();
      toast.success("Sucesso", {
        variant: "success",
        description: "Dataset cadastrado com sucesso",
        action: {
          label: "Fechar",
        },
      });
    } catch (error) {
      toast.error("Error", {
        variant: "error",
        description: error.message,
        action: {
          label: "Fechar",
        },
      });
      form.reset()
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }
    }
    
    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do Dataset" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição do Dataset" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Arquivo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    field.onChange(e.target.files);
                  }}
                  className="py-2 dark:file:text-muted-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center mt-6 gap-4">
          <Button type="submit" className="w-28 h-9 rounded-2xl">
            Confirmar
          </Button>
          <Link to="/datasets">
            <Button variant="outline" className="w-28 h-10 rounded-2xl">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default DatasetForm;
