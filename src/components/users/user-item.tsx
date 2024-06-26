"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { Tables } from "@/lib/types/supabase";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

import {
  type FormEvent,
  type SyntheticEvent,
  memo,
  useEffect,
  useState,
} from "react";
import { ProfilePhoto } from "../perfil/profile-photo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useToast } from "../ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import updateUserById from "@/api/db/updateUserById";

import { useRouter } from "next/navigation";
import { Chip, avatar } from "@nextui-org/react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type prefetchUsersType = {
  created_at: string;
  display_name: string | null;
  email: string;
  id: string;
  image_url: string | null;
  no_identificador: string | null;
  role_id: number;
  updated_at: string;
};

const UserItem = (props: {
  isBusy: boolean;
  user: Tables<"users">;
  course: Tables<"courses">;
  laboratory: Tables<"laboratories">;
  userRole: Tables<"roles">;
  types: Tables<"roles">[];
  refetchUsers: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<prefetchUsersType[], Error>>;
}) => {
  const { toast } = useToast();

  // Fetching

  const [imgUrl, setImgUrl] = useState("");
  const [ppHasChanged, setPpHasChanged] = useState(false);
  // const { isFetching: isFetchingLaboratories, data: laboratories } = useLaboratories();
  // const { isFetching: isFetchingTypes, data: types } = useUserRoles();

  const supabase = createSupabaseBrowser();
  // const admin = createSupabaseBrowserAdmin();

  const router = useRouter();

  // Decomposing user data
  const { user, laboratory, userRole, types, course, isBusy } = props;
  const { refetchUsers } = props;
  const {
    id,
    display_name,
    email,
    created_at,
    image_url,
    no_identificador,
    role_id,
    updated_at,
  } = user;

  // Edit page
  const [displayName, setDisplayName] = useState<string | null>(display_name);
  const [correo, setCorreo] = useState<string | null>(email);
  const [noId, setNoId] = useState<string | null>(no_identificador);
  const [_role, setRole] = useState<number | null>(role_id);

  const avatar_src = `${
    supabase.storage.from("avatars").getPublicUrl(image_url!).data.publicUrl
  }?t=${updated_at}`;

  // Local States
  const [file, setFile] = useState<File | null>(null);
  // const [type, setType] = useState("???");

  useEffect(() => {
    setDisplayName(user.display_name);
    setCorreo(user.email);
    setNoId(user.no_identificador);
    setRole(user.role_id);
  }, [user]);

  // useEffect(() => {
  //     if (types) {
  //         const type = types.filter((t) => t.id === role_id)[0];

  //         if (type) {
  //             setType(type.label);
  //         }
  //     }

  // }, [types, role_id])

  useEffect(() => {
    const updateImageUrl = async () => {
      if (image_url) {
        const { data, error } = await supabase
          .from("users")
          .select("updated_at")
          .eq("id", id)
          .single();
        if (error) {
          console.error(error.message);
          return;
        }

        const pathUrl = supabase.storage
          .from("avatars")
          .getPublicUrl(image_url);
        // console.log(pathUrl.data.publicUrl + "?t=" + data.updated_at);
        setImgUrl(`${pathUrl.data.publicUrl}?t=${data.updated_at}`);
      }
    };
    updateImageUrl();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const dataWithoutPpFile = { ...data };
    // dataWithoutPpFile.pp_file = undefined;

    console.log("SUBMITTING...");
    // try to update at users_profile table
    console.log("data to upload: ", dataWithoutPpFile);
    const { data: updatedData, error: updateError } = await supabase
      .from("users")
      .update(dataWithoutPpFile)
      .eq("id", id)
      .select("*");

    if (updateError) {
      toast({
        title: "Error",
        description: updateError.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Usuario actualizado",
      description: `${data.display_name.toString()} actualizado.`,
      variant: "default",
    });
    console.log("updatedData: ", updatedData);
    // try to update image or upload image at storage bucket
    if (file) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("avatars")
        .upload(id, file, {
          upsert: true,
          contentType: "image/jpeg",
          cacheControl: "0",
        });
      if (storageError) {
        toast({
          title: "Error",
          description: storageError.message,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Imagen actualizada",
        description: `Imagen de ${data.display_name.toString()} actualizada.`,
        variant: "default",
      });
      console.log("storageData: ", storageData);
    }

    const { data: updateUpdatedAt, error: updateUpdatedAtError } =
      await updateUserById({ id });

    if (updateUpdatedAtError) {
      toast({
        title: "Error",
        description: updateUpdatedAtError.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Usuario actualizado",
      description: `${data.display_name.toString()} actualizado.`,
      variant: "default",
    });
    console.log("updateUpdatedAt: ", updateUpdatedAt);
    refetchUsers();
    // router.refresh();
  };

  return (
    <ContextMenu>
      <Sheet>
        <ContextMenuTrigger>
          <SheetTrigger asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.35,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.35,
                },
              }}
              className="group relative mb-3 flex max-h-24 min-h-24 flex-row rounded-md border transition-all duration-300 hover:cursor-pointer hover:bg-card"
            >
              <div className="relative hidden items-center self-center overflow-visible p-4 py-3 transition-all xs:flex xs:h-full xs:w-[100px]">
                <AspectRatio ratio={1 / 1}>
                  <Avatar
                    className={cn(
                      "duration-[2s] group h-full w-full overflow-hidden border border-transparent shadow-black transition-all [box-shadow:0_0_6px_1px_rgba(0,0,0,0.10)] group-hover:[box-shadow:0_0_6px_1px_rgba(0,0,0,0.18)]",
                      isBusy
                        ? "group-hover:border-primary"
                        : "group-hover:border-transparent"
                    )}
                  >
                    <AvatarImage
                      loading="lazy"
                      alt=""
                      className="duration-[2s] object-cover opacity-0 transition-all group-hover:opacity-100"
                      onLoad={(event: SyntheticEvent<HTMLImageElement>) => {
                        event.currentTarget.classList.remove("opacity-0");
                        event.currentTarget.classList.add("opacity-80");
                      }}
                      src={`${avatar_src}`}
                    />
                    <AvatarFallback className="text-2x">
                      {display_name
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 1)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </AspectRatio>
              </div>
              <div className="flex flex-col justify-between text-pretty px-5 py-4 text-sm tracking-wider text-muted-foreground transition-all ">
                <span className="text-foreground  transition-all">
                  {display_name}
                </span>
                <div className="flex flex-row  text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
                  <span>{no_identificador}</span>
                </div>
                <div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
                  <span>{userRole ? userRole.label : "not found"}</span>
                  {laboratory ? (
                    <>
                      <span> &middot; </span>
                      <span className="text-primary">
                        {" "}
                        {laboratory ? laboratory.label : "not found"}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </motion.div>
          </SheetTrigger>
        </ContextMenuTrigger>
        <SheetContent side="right">
          <form onSubmit={onSubmit}>
            <SheetHeader>
              <SheetTitle>{props.user.display_name}</SheetTitle>
              <SheetDescription>
                Edita la informacion de este usuario
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col">
              <div className="flex items-center justify-center pt-4">
                <ProfilePhoto
                  targetUser={props.user}
                  setFile={setFile}
                  setPpHasChanged={setPpHasChanged}
                  name="pp_file"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <div className="flex w-full flex-col gap-2">
                  <Label htmlFor="display_name">Nombre</Label>
                  <Input
                    name="display_name"
                    id="display_name"
                    type="text"
                    placeholder="Nombre"
                    value={displayName || ""}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="1234@cdmadero.tecnm.mx"
                    value={correo || ""}
                    onChange={(e) => {
                      setCorreo(e.target.value);
                    }}
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label htmlFor="role_id">Rol</Label>
                  <Select
                    onValueChange={(e) => {
                      setRole(Number.parseInt(e) | 5);
                    }}
                    defaultValue={`${userRole.id}`}
                    name="role_id"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {types?.map((type) => {
                        return (
                          <SelectItem key={type.id} value={`${type.id}`}>
                            {type.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label htmlFor="no_identificador">No Identificador</Label>
                  <Input
                    name="no_identificador"
                    id="no_identificador"
                    type="text"
                    placeholder="123456"
                    value={noId || ""}
                    onChange={(e) => {
                      setNoId(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="submit"
                  // disabled={!file}
                >
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
      <ContextMenuContent>
        <ContextMenuItem>Vista rápida</ContextMenuItem>
        <ContextMenuItem>Inspeccionar</ContextMenuItem>
        <ContextMenuItem inset>Más opciones</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default memo(UserItem);
