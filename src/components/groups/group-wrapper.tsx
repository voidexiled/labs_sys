"use client";
import { motion } from "framer-motion";
export const GroupWrapper = (props: { children?: React.ReactNode }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex max-h-full w-full flex-col "
		>
			{props.children}
		</motion.div>
	);
};
