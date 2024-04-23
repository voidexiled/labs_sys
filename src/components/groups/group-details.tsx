"use client"

import { Tables } from "@/lib/types/supabase"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Input, ScrollShadow, Tab, Tabs } from "@nextui-org/react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

// import { Tab, Tabs } from "@nextui-org/react"

export const GroupDetails = ({ course, subject }: { course: Tables<"courses"> | null, subject: Tables<"subjects"> | null }) => {

    if (!course) return <>loading</>
    return (
        <div className="sticky w-full flex flex-col">
            <div className="relative z-10 flex flex-row w-full h-[90px] bg-background px-6 items-center">
                <Link href="/dashboard/teacher/grupos" className="mr-6">
                    <Button size="icon" variant="ghost" >
                        <ArrowLeft />
                        <span className="sr-only">Back</span>
                    </Button>
                </Link>
                <h1 className="text-2xl tracking-wide">{`${subject?.label} ${subject?.key}-${course.label} `}  </h1>
            </div>
            <Tabs color="default" className="rounded-none" radius="none"
                classNames={{
                    tabList: "w-full bg-background/80 p-0 shadow-[0px_9px_20px] shadow-black/10",
                    cursor: "group-data-[selected=true]:bg-secondary ",
                    tab: "p-6 ",
                    tabContent: "group-data-[selected=true]:text-foreground text-foreground/60 ",
                }}

            >

                <Tab key="general" title="General"></Tab>
                <Tab key="unit1" title="Unidad 1" ></Tab>
                <Tab key="unit2" title="Unidad 2"></Tab>
                <Tab key="unit3" title="Unidad 3"></Tab>
                <Tab key="unit4" title="Unidad 4"></Tab>
                <Tab key="unit5" title="Unidad 5"></Tab>
                <Tab key="unit6" title="Unidad 6"></Tab>
            </Tabs>
        </div>
        // <Tabs defaultValue="general" className="w-full h-full " >

        //     <div className="sticky w-full flex flex-col">
        //         <div className="flex flex-row w-full h-[90px] bg-background border-b px-4">
        //             <h1 className="text-2xl tracking-wide">{`${subject?.label} `}</h1>

        //         </div>
        //         <ScrollShadow orientation="horizontal" hideScrollBar className="w-96">
        //             <div className="flex flex-row w-[800px]">

        //                 <TabsList className="bg-background/80 rounded-none m-0 p-2 py-6 gap-2 md:gap-3 w-full justify-start shadow-[0px_9px_20px] shadow-muted/20">

        //                     <TabsTrigger value="general" className="px-4 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">General</TabsTrigger>
        //                     <TabsTrigger value="unit1" className="px-4 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Unidad 1</TabsTrigger>
        //                     <TabsTrigger value="unit2" className="px-4 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Unidad 2</TabsTrigger>
        //                     <TabsTrigger value="unit3" className="px-4 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Unidad 3</TabsTrigger>
        //                     <TabsTrigger value="unit4" className="px-4 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Unidad 4</TabsTrigger>
        //                     <TabsTrigger value="unit5" className="px-4 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Unidad 5</TabsTrigger>
        //                     <TabsTrigger value="unit6" className="px-4 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Unidad 6</TabsTrigger>
        //                     <TabsTrigger value="manage" className="px-4 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Gestión del curso</TabsTrigger>
        //                 </TabsList>

        //             </div>
        //         </ScrollShadow>
        //     </div>
        //     <div className=" px-2 py-0">

        //         <TabsContent value="general">
        //             <Card className="w-full h-full">
        //                 <CardHeader>General</CardHeader>
        //                 <CardContent><Input></Input><Button>Enviar</Button></CardContent>
        //             </Card>
        //         </TabsContent>
        //         <TabsContent value="unit1">unidad1</TabsContent>
        //         <TabsContent value="unit2">unidad2</TabsContent>
        //         <TabsContent value="unit3">unidad3</TabsContent>
        //         <TabsContent value="unit4">unidad4</TabsContent>
        //         <TabsContent value="unit5">unidad5</TabsContent>
        //         <TabsContent value="unit6">unidad6</TabsContent>
        //         <TabsContent value="unit6">gestion del curso</TabsContent>
        //     </div>


        // </Tabs>
    )
}