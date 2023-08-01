import { MdDeleteForever } from "react-icons/md";

const PrimaryButton = ({
	action = null,
	id = "",
	type = "button",
	text = "",
	customClasses = "",
}) => {
	return (
		<button
			className={`primary--button ${customClasses}`}
			onClick={action}
			id={id}
			type={type}
		>
			{text}
		</button>
	);
};

export const DeleteButton = ({
	action = null,
	id = "",
	type = "button",
	customClasses = "",
}) => {
	return (
		<button
			onClick={action}
			id={id}
			type={type}
			className={`delete--button ${customClasses}`}
		>
			<span className="font-bold md:flex hidden">Delete</span>
			<span className="inline">
				<MdDeleteForever size={28} />
			</span>
		</button>
	);
};

export const DefaultButton = ({
	action = null,
	id = "",
	type = "button",
	text = "",
	customClasses = "",
}) => {
	return (
		<button
			className={`default--button ${customClasses}`}
			onClick={action}
			id={id}
			type={type}
		>
			{text}
		</button>
	);
};

export default PrimaryButton;
