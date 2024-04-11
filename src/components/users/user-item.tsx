"use client"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { createSupabaseBrowser } from "@/lib/supabase/browser"
import { Tables } from "@/lib/types/supabase"
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import Image from "next/image"
import { FormEvent, ReactEventHandler, SyntheticEvent, memo, useEffect, useState } from "react"
import { ProfilePhoto } from "../perfil/profile-photo"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import axios from "axios"
import { useToast } from "../ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import updateUserById from "@/api/db/updateUserById"


type prefetchUsersType = {
    created_at: string;
    display_name: string | null;
    email: string;
    id: string;
    image_url: string | null;
    lab_at: number | null;
    noIdentificador: string | null;
    role_id: number;
    updated_at: string;
}

const ClientItem = (props: { user: Tables<"users_profile">, laboratories: Tables<"laboratories">[], types: Tables<"user_roles">[], refetchUsers: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<prefetchUsersType[], Error>> }) => {

    const { toast } = useToast();

    // Fetching

    const [imgUrl, setImgUrl] = useState("");
    const [ppHasChanged, setPpHasChanged] = useState(false);
    // const { isFetching: isFetchingLaboratories, data: laboratories } = useLaboratories();
    // const { isFetching: isFetchingTypes, data: types } = useUserRoles();

    const supabase = createSupabaseBrowser();
    // const admin = createSupabaseBrowserAdmin();

    // Decomposing user data
    const { user, laboratories, types } = props;
    const { refetchUsers } = props;
    const { id, display_name, email, created_at, image_url, lab_at, noIdentificador, role_id } = user;

    const [displayName, setDisplayName] = useState<string | null>(display_name);
    const [correo, setCorreo] = useState<string | null>(email);
    const [noId, setNoId] = useState<string | null>(noIdentificador);
    const [role, setRole] = useState<number | null>(role_id);



    // Local States
    const [file, setFile] = useState<File | null>(null);
    const [type, setType] = useState("???");

    useEffect(() => {
        setDisplayName(user.display_name);
        setCorreo(user.email);
        setNoId(user.noIdentificador);
        setRole(user.role_id);
    }, [user])

    useEffect(() => {
        if (types) {
            const type = types.filter((t) => t.id === role_id)[0];

            if (type) {
                setType(type.label);
            }
        }

    }, [types])

    useEffect(() => {
        const updateImageUrl = async () => {
            if (image_url) {
                const { data, error } = await supabase.from("users_profile").select("updated_at").eq("id", id).single();
                if (error) {
                    console.error(error.message);
                    return;
                }

                const pathUrl = supabase.storage.from("avatars").getPublicUrl(image_url);
                console.log(pathUrl.data.publicUrl + "?t=" + data.updated_at);
                setImgUrl(pathUrl.data.publicUrl + "?t=" + data.updated_at);
            }
        }
        updateImageUrl();
    }, [])

    const getLabNameById = (id: number) => {
        if (laboratories) {
            const lab = laboratories.filter((lab) => lab.id === id)[0];
            if (lab) {
                return lab.label;
            } else {
                return "not found";
            }
        }
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const dataWithoutPpFile = { ...data };
        delete dataWithoutPpFile.pp_file;


        // try to update at users_profile table
        const { data: updatedData, error: updateError } = await supabase.from("users_profile").update(dataWithoutPpFile).eq("id", id).select("*");

        if (updateError) {
            toast({
                title: "Error",
                description: updateError.message,
                variant: "destructive",
            });
            return;
        } else {
            toast({
                title: "Usuario actualizado",
                description: "" + data["display_name"].toString() + " actualizado.",
                variant: "default",
            });
            console.log("updatedData: ", updatedData);
        }
        // try to update image or upload image at storage bucket
        if (file) {
            const { data: storageData, error: storageError } = await supabase.storage.from("avatars").upload(id, file, { upsert: true, contentType: "image/jpeg", cacheControl: "0" });
            if (storageError) {
                toast({
                    title: "Error",
                    description: storageError.message,
                    variant: "destructive",
                });
                return;
            } else {
                toast({
                    title: "Imagen actualizada",
                    description: "Imagen de " + data["display_name"].toString() + " actualizada.",
                    variant: "default",
                });
                console.log("storageData: ", storageData);
            }
        }



        const { data: updateUpdatedAt, error: updateUpdatedAtError } = await updateUserById({ id });

        if (updateUpdatedAtError) {
            toast({
                title: "Error",
                description: updateUpdatedAtError.message,
                variant: "destructive",
            });
            return;
        } else {
            toast({
                title: "Usuario actualizado",
                description: "" + data["display_name"].toString() + " actualizado.",
                variant: "default",
            });
            console.log("updateUpdatedAt: ", updateUpdatedAt);
        }
        refetchUsers();
    }





    return (
        <ContextMenu>
            <Sheet>
                <ContextMenuTrigger>
                    <SheetTrigger asChild>
                        <div
                            className="relative grid grid-cols-client-item transition-all duration-300 hover:cursor-pointer group min-h-24 max-h-24 hover:bg-secondary rounded-md "
                        >
                            <div className=" flex items-center transition-all h-full w-full p-4 ">
                                <AspectRatio ratio={1 / 1} className=" ">
                                    <Avatar className="group w-full h-full overflow-hidden [box-shadow:0_0_6px_1px_rgba(0,0,0,0.10)] shadow-black transition-all group-hover:[box-shadow:0_0_6px_1px_rgba(0,0,0,0.18)] duration-[2s]">
                                        <AvatarImage loading="lazy" alt="" className="object-cover transition-all opacity-0 duration-[2s] group-hover:opacity-100"
                                            onLoad={(event: SyntheticEvent<HTMLImageElement>) => {
                                                event.currentTarget.classList.remove("opacity-0")
                                                event.currentTarget.classList.add("opacity-80")
                                            }}
                                            src={"" + imgUrl} />
                                        <AvatarFallback className="text-2x">
                                            {display_name?.split(" ").map((name) => name[0]).join("").slice(0, 1).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                </AspectRatio>
                            </div>
                            <div className="py-4 px-5 flex flex-col justify-between tracking-wider text-sm text-muted-foreground transition-all text-pretty h">
                                <span className="text-foreground  transition-all">{display_name}</span>
                                <div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
                                    <span>{noIdentificador}</span>
                                </div>
                                <div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
                                    <span className="">{type}</span>
                                    {
                                        lab_at && lab_at >= 0 ? (<>
                                            <span> 	&middot; </span>
                                            <span className="text-primary">  {lab_at ? getLabNameById(lab_at) : "not found"}</span>
                                        </>) :
                                            (<>

                                            </>)
                                    }
                                </div>
                            </div>
                        </div>
                    </SheetTrigger>

                    {/* </Link> */}

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
                            <div className="flex justify-center items-center pt-4">
                                <ProfilePhoto targetUser={props.user} setFile={setFile} setPpHasChanged={setPpHasChanged} name="pp_file" />
                            </div>

                            <div className="flex flex-col justify-center items-center py-8 gap-4">
                                <div className="flex flex-col w-full gap-2">
                                    <Label htmlFor="display_name">Nombre</Label>
                                    <Input name="display_name" id="display_name" type="text" placeholder="Nombre" value={displayName || ""} onChange={(e) => {
                                        setDisplayName(e.target.value)
                                    }} />
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <Label htmlFor="email">Correo electrónico</Label>
                                    <Input name="email" id="email" type="email" placeholder="1234@cdmadero.tecnm.mx" value={correo || ""} onChange={(e) => {
                                        setCorreo(e.target.value)
                                    }} />
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <Label htmlFor="role_id">Rol</Label>
                                    <Select onValueChange={(e) => { console.log("e:", e) }} defaultValue={"" + props.user.role_id} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {types?.map((type) => {
                                                return <SelectItem key={type.id} value={"" + type.id}>{type.label}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <Label htmlFor="noIdentificador">No Identificador</Label>
                                    <Input name="noIdentificador" id="noIdentificador" type="text" placeholder="123456" value={noId || ""} onChange={(e) => {
                                        setNoId(e.target.value)
                                    }} />
                                </div>

                            </div>


                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit"
                                // disabled={!file}
                                >Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
            <ContextMenuContent>
                <ContextMenuItem>
                    Ver
                </ContextMenuItem>
                <ContextMenuItem>
                    Editar
                </ContextMenuItem>
                <ContextMenuItem>
                    Eliminar
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>)
}

export default memo(ClientItem);