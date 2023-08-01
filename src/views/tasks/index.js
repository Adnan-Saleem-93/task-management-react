import { useCallback, useEffect, useMemo, useState } from "react";
import AddTask from "../../components/Add-Task";
import Checkbox from "../../components/form/Checkbox";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { MdDeleteForever } from "react-icons/md";
import { useStore } from "../../store";
import { DefaultButton, DeleteButton } from "../../components/form/Buttons";
import Navbar from "../../components/Navbar";

const columns = [
	{
		id: "id",
		name: "",
		accessor: "id",
		width: "w-[5%]",
	},
	{
		id: "title",
		name: "Task",
		accessor: "title",
		width: "w-[30%]",
	},
	{
		id: "description",
		name: "Description",
		accessor: "description",
		width: "w-[55%]",
	},
	{
		id: "actions",
		name: "",
		accessor: "",
		width: "w-[10%]",
	},
];

const Tasks = () => {
	const [data, setData] = useState([]);
	const { showNotification, closeNotification } = useStore(
		(state) => state.notifier
	);
	const { groupId } = useStore((state) => state.auth);
	const { show, startLoader, stopLoader } = useStore((state) => state.loader);

	const getData = useCallback(async () => {
		try {
			startLoader();
			const response = await fetch("/api/tasks/" + groupId, {
				method: "GET",
			});
			if (response) {
				const result = await response.json();

				if (result) {
					setData(result);
				}
			}
		} catch (error) {
			showNotification({
				type: "error",
				message: "Failed to get tasks",
			});
		} finally {
			setTimeout(() => {
				closeNotification();
			}, 4000);
			stopLoader();
		}
	}, []);

	const deleteTask = useCallback(async (id) => {
		try {
			startLoader();
			const response = await fetch("/api/task/delete/" + id, {
				method: "DELETE",
			});
			if (response) {
				getData();
			}
			stopLoader();
		} catch (error) {
			showNotification({
				type: "error",
				message: "Failed to delete task",
			});
			stopLoader();
		} finally {
			setTimeout(() => {
				closeNotification();
			}, 4000);
		}
	}, []);

	useEffect(() => {
		getData();
	}, []);

	const rows = useMemo(() => {
		return data?.map((item) => {
			const { id, title, description, isComplete } = item;
			return {
				id: <Checkbox id={id} isComplete={isComplete} callback={getData} />,
				title,
				description,
				actions: <DeleteButton action={() => deleteTask(id)} />,
				isComplete: isComplete,
			};
		});
	}, [data]);

	return show ? (
		<Loader />
	) : (
		<>
			<Navbar />
			<div className="flex flex-col items-center h-full p-4 lg:w-[80vw] md:w-[80vw] sm:w-[90vw] xs:w-[95vw] w-[90vw] m-auto text-center">
				<div className="flex justify-center items-center w-full mb-4">
					<AddTask
						callback={getData}
						customClasses="w-[100%] sm:w-[50%] md:w-[30%]"
					/>
				</div>
				<table className="w-full text-left border-spacing-1 border-separate border border-slate-400 rounded-md">
					<thead className="bg-blue-800">
						<tr>
							{columns.map((col, index) => {
								return (
									<th
										className={`px-4 py-2 rounded-md text-white ${col.width} tracking-wider`}
										key={index}
									>
										{col.name}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{rows.length ? (
							rows.map((item, index) => {
								const isOddRow = index % 2 !== 0 ? true : false;
								return (
									<tr key={index}>
										<td
											className={`table--row } ${
												isOddRow ? "bg-slate-100" : ""
											}`}
										>
											{item.id}
										</td>
										<td
											className={`table--row ${
												item.isComplete ? "line-through" : ""
											} ${isOddRow ? "bg-slate-100" : ""}`}
										>
											{item.title}
										</td>
										<td
											className={`table--row ${
												item.isComplete ? "line-through" : ""
											} ${isOddRow ? "bg-slate-100" : ""}`}
										>
											{item.description}
										</td>
										<td
											className={`table--row p-1 ${
												isOddRow ? "bg-slate-100" : ""
											}`}
										>
											{item.actions}
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td className="text-center text-2xl" colSpan={4}>
									No Tasks Yet
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Tasks;
