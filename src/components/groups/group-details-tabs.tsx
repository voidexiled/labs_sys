import { GroupDetailsTabItem } from "./group-details-tab-item"

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
            </nav>

        </div>
    )
}