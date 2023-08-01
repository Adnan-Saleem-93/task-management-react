import useSchema from "../../custom-hooks/useSchema";
import { Controller, useForm } from "react-hook-form";
import {
	signupForm,
	signupDefaultValues,
	signupValidations,
} from "./schema/signup.js";
import {
	loginForm,
	loginDefaultValues,
	loginValidations,
} from "./schema/login.js";
import { Fragment, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../../components/form/TextField";
import Select from "../../components/form/Select";
import Header from "../../components/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";

export default function Auth() {
	const navigate = useNavigate();
	const { showNotification, closeNotification } = useStore(
		(state) => state.notifier
	);
	const { authenticateUser } = useStore((state) => state.auth);

	const [isLogin, setIsLogin] = useState(true);
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(isLogin ? loginValidations : signupValidations),
	});
	const inputFields = useSchema({
		form: isLogin ? loginForm : signupForm,
		defaultValues: isLogin ? loginDefaultValues : signupDefaultValues,
		errors,
	});

	// method to switch between login and signup pages
	const switchTab = () => {
		reset();
		setIsLogin(!isLogin);
	};

	const onSubmit = async (values) => {
		try {
			let url = isLogin ? "/api/login" : "/api/register"; // if page is Login, api url set to login, otherwise to register
			let method = "POST";
			const response = await fetch(url, {
				method,
				body: {
					email: values.email,
					password: values.password,
					groupId: values.groupId,
				},
			});

			if (response) {
				const result = await response.json();

				// if errors are returned, show error message
				if (result?.errors) {
					showNotification({
						type: "error",
						message: result.errors[0],
					});
				} else {
					const {
						users: { email, groupId },
					} = result;
					authenticateUser({ email, groupId }); // is login or registration successful, save user email and groupId to localStorage
					navigate("/tasks"); // redirect to tasks page
				}
			}
		} catch (error) {
			// if something went wrong, show error message
			showNotification({
				type: "error",
				message: error.message,
			});
		} finally {
			setTimeout(() => {
				closeNotification(); // hide notification
			}, 4000);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col items-center h-screen justify-center lg:w-[50vw] md:w-[60vw] sm:w-[80vw] w-[90vw] m-auto text-center"
		>
			<Header />
			<div className="border border-slate-400 bg-slate-200 rounded-lg w-full flex flex-col text-left p-12">
				<h2 className="text-center text-4xl font-bold -mt-4 mb-4">
					{isLogin ? "Log In" : "Create Account"}
				</h2>
				{inputFields.map((field, index) => {
					const {
						name,
						label,
						required,
						type,
						placeholder,
						error,
						value,
						options,
					} = field;

					return (
						<Fragment key={index}>
							<div className="flex justify-between items-center">
								<label
									htmlFor={name}
									className="text-lg text-black font-semibold w-2/5"
								>
									{label} {required && <span className="text-red-500">*</span>}
								</label>
								{error && (
									<span className="text-red-500 w-3/5 text-right">
										{error.message}
									</span>
								)}
							</div>
							<Controller
								name={name}
								control={control}
								defaultValue={value}
								render={({ field }) => {
									return ["text", "password"].includes(type) ? (
										<TextField
											name={name}
											type={type}
											placeholder={placeholder}
											value={value}
											index={index}
											error={error}
											{...field}
										/>
									) : (
										<Select
											name={name}
											type={type}
											placeholder={placeholder}
											value={value}
											index={index}
											error={error}
											options={options}
											{...field}
										/>
									);
								}}
							/>
						</Fragment>
					);
				})}

				<button type="submit" className="primary--button">
					{isLogin ? "Log In" : "Sign Up"}
				</button>
			</div>
			<div className="m-1">
				<p className="">
					{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
					<span
						onClick={switchTab}
						className="font-semibold text-blue-800 hover:cursor-pointer hover:text-blue-900 hover:tracking-widest duration-300 uppercase"
					>
						{isLogin ? "Sign Up" : "Log In"}
					</span>
				</p>
			</div>
		</form>
	);
}
