const Header = ({ customClasses = "" }) => {
	return (
		<h1
			className={`${customClasses} text-5xl font-extrabold text-blue-500 mb-8 tracking-widest`}
		>
			Task Management System
		</h1>
	);
};

export default Header;
