"use client";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { useAuth } from "@/store/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";

export const LogOutButton = (props: {
  title: string;
  children?: React.ReactNode;
}) => {
  const router = useRouter();
  const { removeUser } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowser();

    await supabase.auth
      .signOut()
      .then(() => {
        removeUser();
        router.refresh();
        console.log("Signed out");
        toast({
          title: "Logged Out",
          description: "Sesión cerrada correctamente",
        });
      })
      .catch((error) => {});
    queryClient.clear();
  };
  return (
    <Link
      href=""
      className="flex w-full flex-row items-center justify-center gap-4 rounded-sm stroke-foreground/80 px-4 py-2 text-lg text-foreground/80 transition-all hover:bg-secondary hover:stroke-foreground hover:text-foreground active:bg-gray-700/20 lg:justify-start lg:text-sm"
      onClick={handleSignOut}
    >
      {props.children}
      <span>{props.title}</span>
    </Link>
  );
};
