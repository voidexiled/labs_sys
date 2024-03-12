export const MainWrapperHeader = (props: { title: string }) => {
    return (
        <div className="header sticky top-0 left-0 z-30 bg-background/20 rounded-b-md pt-9 pb-5 px-14 section-header">
            <h1 className="transition-all text-2xl font-semibold ">{props.title}</h1>
        </div>
    )
}
