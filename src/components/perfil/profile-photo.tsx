"use client";
import { useUser } from "@/hooks/useUser";
import { useUsers } from "@/hooks/useUsers";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const ProfilePhoto = (props: { targetUser?: Tables<"users_profile">, setFile?: Dispatch<SetStateAction<File | null>>, setPpHasChanged?: Dispatch<SetStateAction<boolean>>, name: string }) => {
    const router = useRouter();
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { isFetching, refetch: refetchUser, data: currentUser } = useUser();
    const { refetch: refetchUsers, data: usersData } = useUsers();
    const supabase = createSupabaseBrowser();

    const user = props.targetUser || currentUser;

    useEffect(() => {
        if (user && user.image_url) {
            setImageUrl(user.image_url);
        }
    }, [user]);

    useEffect(() => {
        const updateImageUrl = async () => {
            if (user) {
                if (user.image_url) {
                    const { data, error } = await supabase.from("users_profile").select("updated_at").eq("id", user.id).single();
                    if (error) {
                        console.error(error.message);
                        return;
                    }

                    const pathUrl = supabase.storage.from("avatars").getPublicUrl(user.image_url);
                    console.log(pathUrl.data.publicUrl + "?t=" + data.updated_at);
                    setImgUrl(pathUrl.data.publicUrl + "?t=" + data.updated_at);
                }
            }
        }
        updateImageUrl();

    }, [imageUrl, user]);


    const handleFileInputChange = async (e: any) => {

        const basePathStorage = supabase.storage.from("avatars").getPublicUrl("").data.publicUrl;
        const file: File = e.target.files[0];
        if (!file) return;
        if (props.setPpHasChanged) {
            props.setPpHasChanged(true);
        }

        if (props.setFile) {
            props.setFile(file);
        } else {
            if (user) {
                console.log("✅ user not null")


                // Uploading to storage
                const pathToUpload: string = `${basePathStorage}${user.id}`;
                console.log("✅ pathToUpload", pathToUpload);
                const { data, error } = await supabase.storage.from("avatars").upload(user.id, file,
                    { upsert: true, contentType: "image/jpeg", cacheControl: "0" }
                );

                if (error) {
                    console.error(error.message);
                    return;
                }

                console.log("DATA: ", data);


                // Inserting into user table
                const { data: dbData, error: dbError } = await supabase.from("users_profile").update({ image_url: user.id }).eq("id", user.id).single();
                if (dbError) {
                    console.error(dbError.message);
                    return;
                }
                console.log("DB DATA: ", dbData);
            } else {
                console.log("❌ user null")
            }
            // setImageUrl(file);
        }
        setImgUrl(URL.createObjectURL(file));
        refetchUsers();

    }


    return (
        <Avatar className="w-40 h-40 group">
            <div className="absolute opacity-0 top-0 left-0 w-full h-full flex items-center justify-center group-hover:opacity-100 group-hover:bg-background/45 transition-all group-hover:cursor-pointer">
                <Label htmlFor="upload_image" className="group-hover:cursor-pointer w-full h-full flex justify-center items-center">
                    Cambiar imagen...
                </Label>
                <Input
                    id="upload_image"
                    accept="image/jpeg"
                    type="file"
                    className="hidden w-full h-full"
                    onChange={handleFileInputChange}
                    name={props.name}
                />
            </div>
            <AvatarImage src={"" + imgUrl} className="object-cover" />
            <AvatarFallback>
                {props.targetUser ? props.targetUser.display_name?.split(" ").map((name) => name[0]).join("").slice(0, 1).toUpperCase() : "?"}
            </AvatarFallback>
        </Avatar>

    )

}