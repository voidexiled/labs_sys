import { ScrollArea } from "./ui/scroll-area"

export const MainWrapper = (props: { children: React.ReactNode }) => {
    return (
        <ScrollArea className="h-screen pb-[100px]">
            <main className="h-full w-full grid  bg-background">
                <div className="m-auto relative rounded-sm bg-card w-full h-full flex flex-col">
                    {props.children}
                </div>
            </main>
        </ScrollArea>
    )
}