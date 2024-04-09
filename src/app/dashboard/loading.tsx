export default function Loading() {
    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-start justify-start">
            <div className="loading-bar w-full animate-appearance-in bg-blue-500/90 h-2 transition-all ease-soft-spring"></div>
        </div>
    )
}