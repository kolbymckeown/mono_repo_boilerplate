import Session from "@/components/auth";
import { Layout } from "@/components/layout";
import React from "react";

const Login = () => {
	const handleLoginSubmit = (values: {
		email: string;
		password: string;
		verifyPassword?: string;
		rememberMe?: boolean;
	}) => {
		console.log("Login values:", values);
	};

	return (
		<Layout>
			<Session isSigningIn={true} onSubmit={handleLoginSubmit} />
		</Layout>
	);
};

export default Login;
