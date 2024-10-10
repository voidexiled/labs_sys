import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
	return (
		<div className="flex flex-row w-full h-full  justify-center items-center p-3">
			<Spinner size="lg" />
		</div>
	);
}
