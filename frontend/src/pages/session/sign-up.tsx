import Session from "@/components/auth";
import { Layout } from "@/components/layout";
import React from "react";

const SignUp = () => {
	const handleSignUpSubmit = (values: {
		email: string;
		password: string;
		verifyPassword?: string;
	}) => {
		console.log("SignUp values:", values);
	};

	return (
		<Layout>
			<Session isSigningIn={false} onSubmit={handleSignUpSubmit} />
		</Layout>
	);
};

export default SignUp;
