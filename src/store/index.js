import { create } from "zustand";

export const useStore = create((set) => ({
	modal: {
		isOpen: false,
		showModal: () =>
			set((state) => ({
				modal: { ...state.modal, isOpen: true },
			})),
		closeModal: () =>
			set((state) => ({
				modal: { ...state.modal, isOpen: false },
			})),
	},
	notifier: {
		show: false,
		type: "success",
		message: "",
		showNotification: ({ type, message }) =>
			set((state) => ({
				notifier: { ...state.notifier, type, message, show: true },
			})),
		closeNotification: () =>
			set((state) => ({
				notifier: { ...state.notifier, type: "", message: "", show: false },
			})),
	},
	auth: {
		email: localStorage.getItem("email") || null,
		groupId: localStorage.getItem("groupId") || null,

		authenticateUser: ({ email, groupId }) =>
			set((state) => {
				localStorage.setItem("email", email);
				localStorage.setItem("groupId", groupId);
				return {
					auth: { ...state.auth, email: email, groupId: groupId },
				};
			}),
		logOutUser: () =>
			set((state) => {
				localStorage.removeItem("email");
				localStorage.removeItem("groupId");
				return {
					auth: { ...state.auth, email: null, groupId: null },
				};
			}),
	},
	loader: {
		show: false,
		startLoader: () =>
			set((state) => {
				return {
					loader: { ...state.loader, show: true },
				};
			}),
		stopLoader: () =>
			set((state) => {
				return {
					loader: { ...state.loader, show: false },
				};
			}),
	},
}));
