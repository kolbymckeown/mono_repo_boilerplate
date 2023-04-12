import { useState } from "react";

import {
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	useColorModeValue,
	VStack,
	Checkbox,
	Link,
	Image,
	Flex,
} from "@chakra-ui/react";

interface SessionProps {
	isSigningIn: boolean;
	onSubmit: (values: {
		email: string;
		password: string;
		verifyPassword?: string;
		rememberMe?: boolean;
	}) => void;
}

const Session: React.FC<SessionProps> = ({ isSigningIn, onSubmit }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verifyPassword, setVerifyPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({
			email,
			password,
			verifyPassword: isSigningIn ? undefined : verifyPassword,
			rememberMe: isSigningIn ? rememberMe : undefined,
		});
	};

	return (
		<Stack
			minHeight="100%"
			flex={1}
			direction={{ base: "column-reverse", md: "row" }}
		>
			<Flex flex={1}>
				<Image
					alt="Cover image"
					objectFit="cover"
					src="https://bit.ly/2k1H1t6"
				/>
			</Flex>
			<Flex p={8} flex={1} align="center" justify="center">
				<Stack spacing={4}>
					<Stack align="center">
						<Heading fontSize="2xl">
							{isSigningIn ? "Sign in to your account" : "Create an account"}
						</Heading>
					</Stack>
					<VStack
						as="form"
						onSubmit={handleSubmit}
						spacing={8}
						boxSize={{ base: "xs", sm: "sm", md: "md" }}
						h="max-content !important"
						bg={useColorModeValue("white", "gray.700")}
						rounded="lg"
						boxShadow="lg"
						p={{ base: 5, sm: 10 }}
					>
						<VStack spacing={4} w="100%">
							<FormControl id="email">
								<FormLabel>Email</FormLabel>
								<Input
									rounded="md"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<Input
									rounded="md"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormControl>
							{!isSigningIn && (
								<FormControl id="verifyPassword">
									<FormLabel>Verify Password</FormLabel>
									<Input
										rounded="md"
										type="password"
										value={verifyPassword}
										onChange={(e) => setVerifyPassword(e.target.value)}
									/>
								</FormControl>
							)}
						</VStack>
						<VStack w="100%">
							{isSigningIn && (
								<Stack direction="row" justify="space-between" w="100%">
									<Checkbox
										colorScheme="accent"
										size="md"
										isChecked={rememberMe}
										onChange={(e) => setRememberMe(!rememberMe)}
									>
										Remember me
									</Checkbox>
									<Link fontSize={{ base: "md", sm: "md" }}>
										Forgot password?
									</Link>
								</Stack>
							)}
							<Button
								type="submit"
								bg="accent.500"
								color="white"
								_hover={{
									bg: "accent.700",
								}}
								rounded="md"
								w="100%"
							>
								{isSigningIn ? "Sign in" : "Create account"}
							</Button>
						</VStack>
					</VStack>
				</Stack>
			</Flex>
		</Stack>
	);
};

export default Session;
