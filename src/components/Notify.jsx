import { useStore } from "../store";
import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";

const Notify = () => {
	const { show, type, message } = useStore((state) => state.notifier);
	if (!show) return null;
	return (
		<div
			className={`text-white rounded-md fixed flex flex-col items-start justify-evenly bottom-10 ${
				show ? "right-[3%] opacity-100" : "right-[-100%] opacity-0"
			} min-w-[20rem] h-[6rem] px-4 py-2 ${
				type === "success" ? "bg-sky-600" : "bg-red-500"
			} duration-500`}
		>
			<h1 className="flex font-bold uppercase text-xl">
				{type}
				<span className="text-white ml-2">
					{type === "success" ? (
						<IoMdCheckmarkCircle size={28} />
					) : (
						<RiErrorWarningFill size={28} />
					)}
				</span>
			</h1>
			<p>{message}</p>
		</div>
	);
};

export default Notify;
