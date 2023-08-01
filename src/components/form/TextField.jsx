import React from "react";

const TextField = ({
	index,
	name,
	value,
	type,
	placeholder,
	error,
	...rest
}) => {
	return (
		<input
			{...rest}
			type={type}
			placeholder={placeholder}
			value={value}
			autoFocus={index === 0 ? true : false}
			className={`mb-4 input--field ${
				!error ? "border border-slate-400" : "border-2 border-red-600"
			} ${!error ? "focus:ring-sky-600" : "focus:ring-red-500"}`}
		/>
	);
};

export default TextField;
