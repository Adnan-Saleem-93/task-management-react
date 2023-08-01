import React from "react";

const Select = ({
	index,
	name,
	value,
	options,
	placeholder,
	error,
	...rest
}) => {
	return (
		<select
			{...rest}
			name={name}
			placeholder={placeholder}
			className={`input--field mb-4 ${
				!error ? "border border-slate-400" : "border-2 border-red-600"
			} ${!error ? "focus:ring-sky-600" : "focus:ring-red-500"}`}
		>
			<option disabled selected value="">
				{placeholder}
			</option>
			{options?.map((option, opt_index) => {
				const { text, id } = option;
				return (
					<option key={opt_index} value={id} className="p-4">
						{text}
					</option>
				);
			})}
		</select>
	);
};

export default Select;
