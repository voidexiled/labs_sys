export const SunIcon = (props: Readonly<{ className: string, width: number, height: number }>) => {

    return (
        <svg viewBox="0 0 24 24" fill="none" width={props.width} height={props.height} className={props.className}>
            <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" strokeWidth="1.5" />
            <path d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714" strokeWidth="1.5" strokeLinecap="round" />
        </svg>



    )
}