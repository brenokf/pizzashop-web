import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";
import { registerRestaurant } from "@/api/register-restaurant";

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;
export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });
  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        phone: data.phone,
        email: data.email,
      });

      toast.success("Restaurante cadastrado com sucesso", {
        action: {
          label: "Login",
          onClick: () => {
            navigate(`/sign-in?email=${data.email}`);
          },
        },
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar o restaurante");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in" className="">
            Fazer Login
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar Conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              seja um parceiro e comece suas vendas !
            </p>
          </div>
          <div>
            <form
              className="space-y-4"
              action=""
              onSubmit={handleSubmit(handleSignUp)}
            >
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
                <Input
                  id="restaurantName"
                  type="text"
                  {...register("restaurantName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="managerName">Seu nome</Label>
                <Input
                  id="managerName"
                  type="text"
                  {...register("managerName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input id="email" type="email" {...register("email")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Seu celular</Label>
                <Input id="phone" type="tel" {...register("phone")} />
              </div>
              <Button className="w-full" disabled={isSubmitting}>
                Finalizar Cadastro
              </Button>
              <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                Ao continuar , voce concorda com os nossos{" "}
                <a className="underline underline-offset-4" href="">
                  Termos de serviço
                </a>{" "}
                e{" "}
                <a className="underline underline-offset-4" href="">
                  políticas de privacidade.
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
