import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
	return (
		<div className="flex flex-col w-full h-full items-center justify-center">
			<Spinner size="lg" className="m-auto" />
		</div>
	);
}
