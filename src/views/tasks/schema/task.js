import { object, string } from "yup";

export const form = {
	title: {
		name: "title",
		type: "text",
		label: "Task Title",
		required: true,
		placeholder: "Enter title of the task",
		error: "Task Title is required",
	},
	description: {
		name: "description",
		type: "textarea",
		label: "Description",
		required: true,
		placeholder: "Enter description for the task",
		error: "Description is required",
	},
};

const { title, description } = form;

export const defaultValues = {
	[title.name]: "",
	[description.name]: "",
};

export const validations = object({
	[title.name]: string().required(title.error),
	[description.name]: string().required(description.error),
});
