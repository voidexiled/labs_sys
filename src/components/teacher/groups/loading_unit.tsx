import { GroupUnitContainer } from "@/components/groups/units/group-unit-container"
import { Spinner } from "@nextui-org/spinner"

export const LoadingUnit = () => {

    return (
        <div className=" w-full h-full px-6 py-5 bg-card text-card-foreground flex flex-row justify-center items-center">
            <Spinner label="Cargando..." size="lg"></Spinner>
        </div>
    )
}