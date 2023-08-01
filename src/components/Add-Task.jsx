import { useStore } from "../store";
import PrimaryButton from "./form/Buttons";
import Modal from "./Modal";

const AddTask = ({ callback = null, customClasses = "w-[15rem]" }) => {
	const { showModal } = useStore((state) => state.modal);

	return (
		<>
			<PrimaryButton
				action={showModal}
				id="modal"
				type="button"
				text="Add New Task"
				customClasses={customClasses}
			/>
			<Modal callback={callback} />
		</>
	);
};

export default AddTask;
