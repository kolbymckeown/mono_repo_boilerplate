import { Flex } from "@chakra-ui/react";
import Footer from "./footer";
import Navbar from "./navbar";

export const Layout = ({ children }: { children: JSX.Element }) => {
	return (
		<>
			<Navbar />
			<Flex
				as="main"
				flexDirection="column"
				minHeight={`calc(100vh - 65px - 105px)`}
				flex={1}
			>
				{children}
			</Flex>
			<Footer />
		</>
	);
};
