
export const MainWrapperContent = (props: { children: React.ReactNode }) => {
    return (
        <div className="content py-2 px-16">
            {props.children}
        </div>
    )
}
