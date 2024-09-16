/* eslint-disable no-unused-vars */

"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import InputPassword from "../InputPassword";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const formSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

const LoginForm = () => {
  const { signIn, signed } = useContext(AuthContext);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await signIn(data);
    } catch (error) {
      toast.error("Error", {
        variant: "error",
        description: error.message,
        action: {
          label: "Fechar",
        },
      });
    }
  };

  if (signed) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <Card className="w-full max-w-lg p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tighter mt-6">
            Entre com sua conta
          </CardTitle>
          <CardDescription>
            Utilize seu e-mail e senha para entrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* FORM */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignIn)}>
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
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <InputPassword placeholder="Sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-6 w-full p-5 rounded-2xl">
                Entrar
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-6 mt-4">
            <Separator />
            <span className="text-xs text-muted-foreground">OU</span>
            <Separator />
          </div>
          <Link to="/register">
            <Button
              variant="outline"
              className="mt-4 w-full p-5 rounded-2xl mb-4">
              Cadastra-se
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
};

export default LoginForm;
