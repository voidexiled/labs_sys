"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "../theme-toggle";

export default function UserPreview(props: {}) {
    const { isFetching: isFetchingUser, data: user } = useUser();
    const [img, setImg] = useState<string | null>(null);
    const supabase = createSupabaseBrowser();

    useEffect(() => {
        const getImageFromSupabase = async () => {
            if (user) {

                if (user.image_url) {
                    const pathUrl = user.image_url
                    console.log(" correct image_url");
                    console.log(pathUrl)
                    if (pathUrl) {
                        console.log(" correct pathUrl");
                        console.log(pathUrl, user.image_url)
                        const { data: dataImg, error: errorImg } = await supabase.storage.from("avatars").download(user.image_url);
                        if (errorImg) {
                            console.log("Error downloading image: ", errorImg);
                            return;
                        }
                        if (dataImg) {
                            console.log(" correct dataImg");
                            //const arrBuffer = await dataImg.arrayBuffer();
                            setImg(dataImg ? URL.createObjectURL(dataImg) : "");
                            console.log("Image setted: ", dataImg);
                        }
                    }

                }
            }
        }
        getImageFromSupabase();
    }, [user]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                delay: 0.6
            }}
            className="flex w-full  self-end  items-center justify-center px-8 py-5 relative">

            <div className="flex flex-row w-full h-full rounded-xl justify-start relative z-5 px-1 pr-2 text-sm py-3 gap-3 backdrop-blur-sm bg-secondary border shadow-sm">
                {/* <div className="user-preview"></div> */}
                <div className="flex justify-center items-center w-1/4 h-full relative">
                    <div className="relative w-12 h-12 justify-center items-center flex">
                        <Avatar className="">
                            <AvatarImage src={img ? img : "/profile-default.svg"} className="object-cover" />
                            <AvatarFallback>
                                {user && user.display_name?.split(" ").map((name) => name[0]).join("").slice(0, 1).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                    </div>
                </div>
                <div className="w-3/4 break-words overflow-hidden text-ellipsis flex items-center justify-start text-foreground font-light tracking-wider" >
                    <span>
                        {user ? user.display_name : "Cargando..."}
                    </span>


                </div>

            </div>
        </motion.div>);
}