import { GroupUnitContainer } from "@/components/groups/units/group-unit-container";
import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
    return <GroupUnitContainer className="flex flex-row justify-center items-center">
        <Spinner size="lg" />

    </GroupUnitContainer>
}