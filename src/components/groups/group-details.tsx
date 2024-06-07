"use client";

import type { Tables } from "@/lib/types/supabase";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardHeader } from "../ui/card";

import { ArrowLeft, Scroll } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
// import { GroupUnitTab } from "./group-unit-tab"
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { GroupDetailsTabs } from "./group-details-tabs";

// import { Tab, Tabs } from "@nextui-org/react"

export const GroupDetails = ({
  course,
  subject,
  units,
}: {
  course: Tables<"courses"> | null;
  subject: Tables<"subjects"> | null;
  units: Tables<"units">[] | null;
}) => {
  if (!course) return <>loading</>;
  return (
    <div className="flex flex-col bg-background">
      <div className="flex-basis-[90px] z-10 flex min-h-[90px] w-full flex-row items-center px-8 lg:px-6 ">
        <Link href="/dashboard/teacher/grupos" className="mr-6">
          <Button size="icon" variant="ghost">
            <ArrowLeft width={20} height={20} />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-pretty text-2xl tracking-wide ">
          {`${subject?.label} ${subject?.key}-${course.label} `}{" "}
        </h1>
      </div>
      <GroupDetailsTabs
        tabs={Array.from(units!, (unit) => unit.unit)}
        courseId={course.id}
      />
    </div>
  );
};
