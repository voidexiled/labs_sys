
export const MainWrapperContent = (props: { children: React.ReactNode }) => {
    return (
        <div className="content py-2 px-0 lg:px-16 flex justify-center flex-col lg:justify-normal">
            {props.children}
        </div>
    )
}
