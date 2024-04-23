"use client"
import { motion } from "framer-motion"
export const GroupWrapper = (props: { children?: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full">
            {props.children}
        </motion.div>
    )
}