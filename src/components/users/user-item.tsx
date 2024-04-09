"use client"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu"
import { createSupabaseBrowser } from "@/lib/supabase/browser"
import { Tables } from "@/lib/types/supabase"
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import Image from "next/image"
import { memo, useEffect, useState } from "react"
import { ProfilePhoto } from "../perfil/profile-photo"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"


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
    // Fetching

    const [imgUrl, setImgUrl] = useState("");
    // const { isFetching: isFetchingLaboratories, data: laboratories } = useLaboratories();
    // const { isFetching: isFetchingTypes, data: types } = useUserRoles();

    const supabase = createSupabaseBrowser();

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
        if (types) {
            const type = types.filter((t) => t.id === role_id)[0];

            if (type) {
                setType(type.label);
            }
        }

    }, [types])

    useEffect(() => {
        const getImageFromSupabase = async () => {
            if (image_url) {
                const pathUrl = image_url
                console.log(" correct image_url");
                console.log(pathUrl)
                if (pathUrl) {
                    console.log(" correct pathUrl");
                    const { data: dataImg, error: errorImg } = (await supabase.storage.from("avatars").download(pathUrl));
                    if (errorImg) {
                        console.log("Error downloading image: ", errorImg);
                        return;
                    }
                    if (dataImg) {
                        console.log(" correct dataImg");
                        //const arrBuffer = await dataImg.arrayBuffer();
                        setImgUrl(dataImg ? URL.createObjectURL(dataImg) : "");
                        console.log("Image setted: ", dataImg);
                    }
                }

            }
        }
        getImageFromSupabase();
        const getUsersFromSupabase = async () => {
            const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
            if (users) {
                console.log("users: ", users);
            }
            if (usersError) {
                console.log("error: ", usersError.message);
            }

        }

        // getUsersFromSupabase();

    }, [])





    const handleSaveChanges = async () => {
        if (file && correo && noId && displayName && role) {

            // Update user in Supabase

            // refetchUsers();
        }
    }


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




    return (
        <ContextMenu>
            <Sheet>
                <ContextMenuTrigger>

                    {/* <Link href={"usuarios/" + props.user.id}> */}
                    <SheetTrigger asChild>
                        <div
                            className="relative grid grid-cols-client-item transition-all duration-300 hover:cursor-pointer group min-h-24 max-h-24 hover:bg-secondary rounded-md "
                        >
                            <div className=" flex items-center transition-all h-full w-full p-4 ">
                                <AspectRatio ratio={1 / 1} className="bg-zinc-400/80 rounded-md">
                                    <Image loading="lazy" quality={5} src={image_url && imgUrl ? `${imgUrl}` : "/profile-default.svg"} alt="" fill className="drop-shadow-lg shadow-black rounded-md object-cover transition-all opacity-0 duration-[2s] group-hover:opacity-100 group-hover:[box-shadow:0_0_6px_1px_rgba(0,0,0,0.08)] "
                                        onLoadingComplete={(image) => {
                                            image.classList.remove("opacity-0")
                                            image.classList.add("opacity-80")
                                        }}
                                    />
                                </AspectRatio>
                            </div>
                            <div className="py-4 px-5 flex flex-col justify-between tracking-wider text-sm text-muted-foreground transition-all text-pretty">
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
                    <SheetHeader>
                        <SheetTitle>{props.user.display_name}</SheetTitle>
                        <SheetDescription>
                            Edita la informacion de este usuario
                        </SheetDescription>

                    </SheetHeader>
                    <div className="flex flex-col">
                        <div className="flex justify-center items-center pt-4">
                            <ProfilePhoto targetUser={props.user} setFile={setFile} />
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
                            <Button type="submit" onClick={handleSaveChanges} disabled={!file}>Save changes</Button>
                        </SheetClose>
                    </SheetFooter>

                </SheetContent>
            </Sheet>
            <ContextMenuContent>
                <ContextMenuItem>
                    Cambiar nombre
                </ContextMenuItem>
                <ContextMenuItem>
                    Cambiar Numero Identificador
                </ContextMenuItem>
                <ContextMenuItem>
                    Cambiar Rol
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>

                        Ver mas...
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <ContextMenuItem>
                            Editar
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>
                            Eliminar
                        </ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
            </ContextMenuContent>
        </ContextMenu>)
}

export default memo(ClientItem);