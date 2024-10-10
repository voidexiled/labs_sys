import { FavouriteIcon } from "./ready/favourite-icon";
import { ThumbsUpIcon } from "./ready/thumbs-up-icon";

type Props = {
	name: string;
	width: number;
	height: number;
	className: string;
};

export default function SocialIcon(props: Props) {
	const { name } = props;
	switch (name) {
		case "favourite":
			return <FavouriteIcon {...props} />;
		case "thumbs-up":
			return <ThumbsUpIcon {...props} />;
		default:
			return <></>;
	}
}
