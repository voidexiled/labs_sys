"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { useAuth } from "@/store/auth";
import { useToast } from "@/components/ui/use-toast"
import { NextRequest } from "next/server";
import { useQueryClient } from "@tanstack/react-query";
import { Label } from "../ui/label";
import Link from "next/link";
import Image from "next/image";


export const LoginForm = (props: {}) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { toast } = useToast();


    const handleSignIn = async (formData: FormData) => {
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();

        if (!email || !password) {
            return;
        }

        const supabase = createSupabaseBrowser();

        const { error, data } = await supabase.auth.signInWithPassword({
            email, password
        })
        console.log("login data: ", data);
        console.log("login error: ", error);
        if (error) {
            console.log(error?.message)
            toast({
                title: "Error",
                description: error?.message,
                variant: "destructive",
            });
            return;
        }

        toast({
            title: "Logged In",
            description: "Sesión iniciada correctamente como " + data.user?.email,
        })

        router.refresh();
        queryClient.resetQueries();

    }

    return (

        <>


            <div className="w-full lg:grid lg:grid-cols-2 h-screen ">
                <div className="hidden bg-muted lg:block">
                    <Image
                        src="/itcm-central.jpg"
                        alt="Image"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Iniciar sesión</h1>
                            <p className="text-balance text-muted-foreground">
                                Ingresa tu correo electronico para inciar sesión
                            </p>
                        </div>

                        <form className="grid gap-4" autoComplete="off" action={handleSignIn}>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto inline-block text-sm underline"
                                    >
                                        Olvidaste tu contraseña?
                                    </Link>
                                </div>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <Button className="w-full"
                                onClick={
                                    async (e) => {
                                        // e.preventDefault();
                                        // e.currentTarget.disabled = true;
                                        // e.currentTarget.innerText = "Iniciando sesión...";
                                        // console.log(e.currentTarget.parentElement);
                                        const formData = new FormData(e.currentTarget.parentElement as HTMLFormElement);
                                        await handleSignIn(formData);
                                        // if (e.currentTarget) {
                                        //     e.currentTarget.disabled = false;
                                        //     e.currentTarget.innerText = "Iniciar sesión";
                                        // }
                                    }
                                }
                            >
                                Iniciar sesión
                            </Button>
                            <Button variant="outline" className="w-full">
                                Iniciar sesión con Google
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            No tienes una cuenta?{" "}
                            <Link href="#" className="underline">
                                Registrate
                            </Link>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}