import React, { useMemo } from "react";
import { Menu } from "@headlessui/react";

import Header from "./Header";
import { useStore } from "../store";
import DropdownMenu from "./Dropdown-Menu";
import { GROUPS } from "../constants";

const Navbar = () => {
	const { email, groupId, logOutUser } = useStore((state) => state.auth);
	const groupName = useMemo(() => {
		return GROUPS.find((x) => x.id === groupId)?.text || "N/A";
	}, [groupId]);

	return (
		<div className="flex justify-between items-center w-full mb-8 shadow-md p-4">
			<Header customClasses="!mb-1 !tracking-tight !text-3xl" />
			{/* <div className="w-[20%]">
				<DefaultButton
					customClasses="font-bold"
					action={() => logOutUser()}
					text="Log Out"
				/>
			</div> */}
			<DropdownMenu buttonText={email}>
				<p className="px-4 py-2 bg-slate-300">
					Group: <span className="font-bold"> {groupName}</span>
				</p>
				<Menu.Item onClick={logOutUser}>
					{({ active }) => (
						<p
							className={`${
								active ? "bg-gray-100 text-gray-900" : "text-gray-700"
							}
								"block px-4 py-2 text-sm"`}
						>
							Log Out
						</p>
					)}
				</Menu.Item>
			</DropdownMenu>
		</div>
	);
};

export default Navbar;
