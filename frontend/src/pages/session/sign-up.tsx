import Session from "@/components/auth";
import { Layout } from "@/components/layout";
import useAuth from "@/hooks/use-auth";
import React, { useState } from "react";

const SignUp = () => {
	const { createAccountWithEmailAndPassword } = useAuth();
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const handleSignUpSubmit = (values: {
		firstName?: string;
		lastName?: string;
		email: string;
		password: string;
		verifyPassword?: string;
	}) => {
		console.log({ values });
		setLoading(true);
		if (values.password === values.verifyPassword) {
			createAccountWithEmailAndPassword(
				values.email,
				values.password,
				values.firstName,
				values.lastName
			)
				.catch((error) => {
					setError(error.message);
					setLoading(false);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setError("Passwords do not match.");
			setLoading(false);
		}
	};

	return (
		<Layout>
			<>
				<Session
					isSigningIn={false}
					onSubmit={handleSignUpSubmit}
					error={error}
					loading={loading}
				/>
			</>
		</Layout>
	);
};

export default SignUp;
