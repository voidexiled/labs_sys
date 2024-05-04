import Link from "next/link"
import { GroupDetailsTabItem } from "./group-details-tab-item"
import { cn } from "@nextui-org/react"

export const GroupDetailsTabs = ({ tabs, courseId }: { tabs: number[], courseId: number }) => {

    return (
        <div className="overflow-x-auto scrollbar-hide border-b h-[52px]">
            <nav className="flex flex-row h-full">
                {
                    tabs.map((tab, index) => {
                        return (
                            <GroupDetailsTabItem key={index} title={`Unidad ${tab}`} href={`/dashboard/teacher/grupos/${courseId}/unidad/${tab}`} />
                        )
                    })
                }
                <GroupDetailsTabItem title={`Gestión`} href={`/dashboard/teacher/grupos/${courseId}/gestion`} />

            </nav>

        </div>
    )
}