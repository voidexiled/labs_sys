"use client"

import { Tables } from "@/lib/types/supabase"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardHeader } from "../ui/card"

import { ArrowLeft, Scroll } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
// import { GroupUnitTab } from "./group-unit-tab"
import { createSupabaseBrowser } from "@/lib/supabase/browser"
import { ScrollArea } from "../ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import { GroupDetailsTabs } from "./group-details-tabs"

// import { Tab, Tabs } from "@nextui-org/react"

export const GroupDetails = ({ course, subject, units }: { course: Tables<"courses"> | null, subject: Tables<"subjects"> | null, units: Tables<"units">[] | null }) => {

    if (!course) return <>loading</>
    return (
        <div className="flex flex-col">
            <div className="z-10 flex flex-row w-full min-h-[90px] flex-basis-[90px]   items-center px-6 ">
                <Link href="/dashboard/teacher/grupos" className="mr-6">
                    <Button size="icon" variant="ghost" >
                        <ArrowLeft />
                        <span className="sr-only">Back</span>
                    </Button>
                </Link>
                <h1 className="text-2xl tracking-wide text-pretty ">{`${subject?.label} ${subject?.key}-${course.label} `}  </h1>
            </div>
            <GroupDetailsTabs tabs={Array.from(units!, (unit) => unit.unit)} courseId={course.id} />
        </div>
    )
}