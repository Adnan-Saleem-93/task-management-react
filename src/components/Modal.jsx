import { useStore } from "../store";
import PrimaryButton from "./form/Buttons";
import Select from "./form/Select";
import TextField from "./form/TextField";
import { Controller, useForm } from "react-hook-form";
import { Fragment } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	validations,
	form,
	defaultValues,
} from "../views/tasks/schema/task.js";
import useSchema from "../custom-hooks/useSchema";
import TextArea from "./form/TextArea";

const Modal = ({ callback = null }) => {
	const { isOpen, closeModal } = useStore((state) => state.modal);
	const { showNotification, closeNotification } = useStore(
		(state) => state.notifier
	);
	const { groupId } = useStore((state) => state.auth);
	const { startLoader, stopLoader } = useStore((state) => state.loader);

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(validations),
	});
	const inputFields = useSchema({
		form,
		defaultValues,
		errors,
	});

	const onSubmit = async (values) => {
		try {
			startLoader(); // start loading
			closeModal(); // close modal to show loader & notifications
			reset(); // reset form to initial state (empty)
			const response = await fetch("/api/tasks", {
				method: "POST",
				body: { ...values, groupId, isComplete: false },
			});
			if (response) {
				const result = await response.json();

				if (result) {
					showNotification({
						type: "success",
						message: "Task added successfully",
					});

					callback(); // get all updated tasks
				}
			}
		} catch (error) {
			showNotification({ type: "error", message: "Failed to add task" });
		} finally {
			setTimeout(() => {
				closeNotification(); // hide notification
			}, 4000);
			stopLoader(); // stop loading
		}
	};

	const onClose = () => {
		reset();
		closeModal();
	};

	return (
		<>
			{isOpen ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 min-w-full outline-none focus:outline-none duration-500">
						<div className="relative sm:w-[90%] lg:w-[40%] my-6 mx-auto max-w-[90%]">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">Add New Task</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={onClose}
									>
										<span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex flex-col justify-center items-start">
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
											<div
												key={index}
												className="w-full flex flex-col justify-start"
											>
												<div className="flex justify-between items-start">
													<label
														htmlFor={name}
														className="text-lg text-left text-black font-semibold w-2/5"
													>
														{label}{" "}
														{required && (
															<span className="text-red-500">*</span>
														)}
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
														return (
															(["text", "password"].includes(type) && (
																<TextField
																	name={name}
																	type={type}
																	placeholder={placeholder}
																	value={value}
																	index={index}
																	error={error}
																	{...field}
																/>
															)) ||
															(type === "textarea" && (
																<TextArea
																	name={name}
																	type={type}
																	placeholder={placeholder}
																	value={value}
																	index={index}
																	error={error}
																	{...field}
																/>
															)) || (
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
															)
														);
													}}
												/>
											</div>
										);
									})}
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={onClose}
									>
										Close
									</button>
									<PrimaryButton
										action={null}
										id="modal"
										type="submit"
										text="Add Task"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</form>
			) : null}
		</>
	);
};

export default Modal;
