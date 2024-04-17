"use client";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { useAuth } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";


export const LogOutButton = (props: { title: string, children: React.ReactNode }) => {
    const router = useRouter();
    const { removeUser } = useAuth();
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const handleSignOut = async () => {
        const supabase = createSupabaseBrowser();

        await supabase.auth.signOut().then(() => {

            removeUser();
            router.refresh();
            console.log("Signed out");
            toast({
                title: "Logged Out",
                description: "Sesión cerrada correctamente",
            })
        }).catch((error) => { });
        queryClient.clear();

    }
    return (

        <Link href="" className={clsx("text-foreground/80 stroke-foreground/80 hover:text-foreground hover:stroke-foreground", " w-full px-4 py-3 flex flex-row items-center justify-start gap-4 text-sm transition-all rounded-sm active:bg-gray-700/20")}
            onClick={handleSignOut}>
            {props.children}
            <span>{props.title}</span>
        </Link>

    )
}