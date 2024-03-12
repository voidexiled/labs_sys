"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {

  useEffect(() => {
    redirect("/dashboard")
  }, [])

  return (
    <div className="">
    </div>
  );
}
