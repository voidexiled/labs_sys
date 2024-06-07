import Link from "next/link";
import { GroupDetailsTabItem } from "./group-details-tab-item";
import { cn } from "@nextui-org/react";

export const GroupDetailsTabs = ({
  tabs,
  courseId,
}: {
  tabs: number[];
  courseId: number;
}) => {
  return (
    <div className="flex min-h-[52px] basis-[52px] overflow-x-auto border-b scrollbar-hide">
      <nav className="flex h-full flex-row">
        {tabs.map((tab, index) => {
          return (
            <GroupDetailsTabItem
              key={index}
              title={`Unidad ${tab}`}
              href={`/dashboard/teacher/grupos/${courseId}/unidad/${tab}`}
            />
          );
        })}
        <GroupDetailsTabItem
          title={"Gestión"}
          href={`/dashboard/teacher/grupos/${courseId}/gestion`}
        />
        <GroupDetailsTabItem
          title={"Solicitudes"}
          href={`/dashboard/teacher/grupos/${courseId}/requests`}
        />
      </nav>
    </div>
  );
};
