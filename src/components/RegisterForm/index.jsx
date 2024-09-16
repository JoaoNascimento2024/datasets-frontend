/* eslint-disable no-unused-vars */

"use strict";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import InputPassword from "@/components/InputPassword";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserService } from "@/services/UserService";
import { toast } from "sonner";



const formSchema = z
  .object({
    username: z.string().min(3, "Username deve ter no mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
      });
    }
  });

const RegisterForm = () => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignIn = async (values) => {
    
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      profile: "admin"
    };
    

    try {
      const response = await UserService.create(data);
      form.reset();
      toast.success("Sucesso", {
        description: "Usuário cadastrado com sucesso",
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
      console.log(error);
      
    }

  };

  return (
    <Card className="w-full max-w-lg p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tighter mt-6">
          Cadastre sua conta
        </CardTitle>
        <CardDescription>
          Preencha os campos abaixo para criar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignIn)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="exemplo@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Choose Password</FormLabel>
                  <FormControl>
                    <InputPassword placeholder="Cria senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="Confirme sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-6 w-full p-5 rounded-2xl">
              Cadastrar
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-6 mt-4">
          <Separator />
          <span className="text-xs text-muted-foreground">OU</span>
          <Separator />
        </div>
        <Link to="/login">
          <Button
            variant="outline"
            className="mt-4 w-full p-5 rounded-2xl mb-4">
            Entrar
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
