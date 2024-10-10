export const MainWrapperHeader = (props: { title: string }) => {
	return (
		<div className="header md:sticky top-0 left-0 z-30 rounded-b-md pt-9 pb-5 px-16 section-header">
			<h1 className="transition-all text-2xl font-medium tracking-wider flex justify-center lg:justify-start">
				{props.title}
			</h1>
		</div>
	);
};
