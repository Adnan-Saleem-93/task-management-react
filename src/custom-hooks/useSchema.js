const useSchema = ({ form, defaultValues, errors }) => {
	const inputFields = [];

	for (const field in form) {
		const { name, label, type, placeholder, required, options } = form[field];
		const error = errors[name];
		const value = defaultValues[name];

		inputFields.push({
			name,
			label,
			type,
			placeholder,
			required,
			value,
			options,
			error,
		});
	}

	return inputFields;
};

export default useSchema;
