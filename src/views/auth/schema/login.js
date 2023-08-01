import { object, string } from "yup";

export const loginForm = {
	email: {
		name: "email",
		type: "text",
		label: "Email",
		required: true,
		placeholder: "example@gmail.com",
		error: "Email address is required",
		invalid: "Please enter a valid email address",
	},
	password: {
		name: "password",
		type: "password",
		label: "Password",
		required: true,
		placeholder: "Enter your password",
		error: "Password is required",
	},
};

const { email, password } = loginForm;

export const loginDefaultValues = {
	[email.name]: "",
	[password.name]: "",
};

export const loginValidations = object({
	[email.name]: string().required(email.error).email(email.invalid),
	[password.name]: string().required(password.error),
});
