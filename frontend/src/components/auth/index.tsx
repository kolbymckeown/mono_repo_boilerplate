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
	Text,
	FormErrorMessage,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginOrRegisterSchema } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";

interface SessionProps {
	isSigningIn: boolean;
	onSubmit: (values: {
		firstName?: string;
		lastName?: string;
		email: string;
		password: string;
		verifyPassword?: string;
		rememberMe?: boolean;
	}) => void;
	error?: string;
	loading?: boolean;
}

type FormData = {
	firstName?: string;
	lastName?: string;
	email: string;
	password: string;
	verifyPassword?: string;
	rememberMe?: boolean;
};

const Session: React.FC<SessionProps> = ({
	isSigningIn,
	onSubmit,
	error,
	loading,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(loginOrRegisterSchema),
		context: { isSigningIn },
	});

	const onSubmitForm: SubmitHandler<FormData> = (data) => {
		onSubmit(data);
	};

	console.log({ errors });

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
						onSubmit={handleSubmit(onSubmitForm)}
						spacing={8}
						boxSize={{ base: "xs", sm: "sm", md: "md" }}
						h="max-content !important"
						bg={useColorModeValue("white", "gray.700")}
						rounded="lg"
						boxShadow="lg"
						p={{ base: 5, sm: 10 }}
					>
						<VStack spacing={4} w="100%">
							{!isSigningIn && (
								<Flex
									direction={["column", "column", "row"]}
									w="100%"
									justifyContent="space-between"
								>
									<FormControl
										id="firstName"
										w={{ base: "100%", md: "48%" }}
										isInvalid={!!errors.firstName}
									>
										<FormLabel>First Name</FormLabel>
										<Input
											rounded="md"
											type="text"
											{...register("firstName", { required: !isSigningIn })}
										/>
										<FormErrorMessage>
											{errors.firstName?.message}
										</FormErrorMessage>
									</FormControl>
									<FormControl
										id="lastName"
										w={{ base: "100%", md: "48%" }}
										isInvalid={!!errors.lastName}
									>
										<FormLabel>Last Name</FormLabel>
										<Input
											rounded="md"
											type="text"
											{...register("lastName", { required: !isSigningIn })}
										/>
										<FormErrorMessage>
											{errors.lastName?.message}
										</FormErrorMessage>
									</FormControl>
								</Flex>
							)}
							<FormControl id="email" isInvalid={!!errors.email}>
								<FormLabel>Email</FormLabel>
								<Input
									rounded="md"
									type="email"
									{...register("email", { required: true })}
								/>
								<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
							</FormControl>
							<FormControl id="password" isInvalid={!!errors.password}>
								<FormLabel>Password</FormLabel>
								<Input
									rounded="md"
									type="password"
									{...register("password", { required: true })}
								/>
								<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
							</FormControl>
							{!isSigningIn && (
								<FormControl
									id="verifyPassword"
									isInvalid={!!errors.verifyPassword}
								>
									<FormLabel>Verify Password</FormLabel>
									<Input
										rounded="md"
										type="password"
										{...register("verifyPassword", { required: !isSigningIn })}
									/>
									<FormErrorMessage>
										{errors.verifyPassword?.message}
									</FormErrorMessage>
								</FormControl>
							)}
						</VStack>
						<VStack w="100%">
							{isSigningIn && (
								<Stack direction="row" justify="space-between" w="100%">
									<Checkbox
										colorScheme="accent"
										size="md"
										{...register("rememberMe")}
									>
										Remember me
									</Checkbox>
									<Link fontSize={{ base: "md", sm: "md" }}>
										Forgot password?
									</Link>
								</Stack>
							)}
							{error && <Text>{error}</Text>}
							<Button
								type="submit"
								bg="accent.500"
								color="white"
								_hover={{
									bg: "accent.700",
								}}
								rounded="md"
								w="100%"
								isLoading={loading}
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
