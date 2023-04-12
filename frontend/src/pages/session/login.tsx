import Session from "@/components/auth";
import { Layout } from "@/components/layout";
import useAuth from "@/hooks/use-auth";
import React, { useState } from "react";

const Login = () => {
	const { signInWithEmailAndPassword } = useAuth();
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const handleLoginSubmit = (values: {
		email: string;
		password: string;
		rememberMe?: boolean;
	}) => {
		setLoading(true);
		signInWithEmailAndPassword(values.email, values.password)
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Layout>
			<Session
				isSigningIn={true}
				onSubmit={handleLoginSubmit}
				error={error}
				loading={loading}
			/>
		</Layout>
	);
};

export default Login;
