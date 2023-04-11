import Navbar from "./navbar";

export const Layout = ({ children }: { children: JSX.Element }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};
