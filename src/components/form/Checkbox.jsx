import { useStore } from "../../store";

const Checkbox = ({ id, isComplete = false, callback = null }) => {
	const { showNotification, closeNotification } = useStore(
		(state) => state.notifier
	);
	const { startLoader, stopLoader } = useStore((state) => state.loader);

	const onClick = async () => {
		try {
			startLoader();
			const response = await fetch("/api/task/mark/" + id, {
				method: "PUT",
			});
			if (response) {
				const result = await response.json();
				if (result) {
					callback(); // get all updated tasks
				}
			}
		} catch (error) {
			showNotification({
				type: "error",
				message: "Failed to mark task",
			});
		} finally {
			setTimeout(() => {
				closeNotification(); // hide notification
			}, 4000);
			stopLoader(); // stop loading
		}
	};
	return (
		<div className="flex gap-2 cursor-pointer" onClick={onClick}>
			<input
				className="peer relative shrink-0 appearance-none w-5 h-5 border-2 border-blue-500 rounded-sm bg-white checked:bg-blue-500"
				type="checkbox"
				checked={isComplete}
			/>
			<svg
				className="absolute w-5 h-5 text-white hidden peer-checked:block"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="20 6 9 17 4 12"></polyline>
			</svg>
		</div>
	);
};

export default Checkbox;
