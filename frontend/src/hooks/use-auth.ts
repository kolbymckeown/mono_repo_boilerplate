import { useState, useEffect } from "react";
import { auth } from "@/utils/firebase";
import {
	signInWithEmailAndPassword as signIn,
	createUserWithEmailAndPassword as createUser,
	signOut,
	onAuthStateChanged,
	User,
} from "firebase/auth";

type AuthHook = {
	signInWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<void>;
	createAccountWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<void>;
	logout: () => Promise<void>;
	user: User | null;
};

const useAuth = (): AuthHook => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const signInWithEmailAndPassword = async (
		email: string,
		password: string
	) => {
		try {
			await signIn(auth, email, password);
		} catch (error) {
			console.error("Error signing in with email and password", error);
			throw error;
		}
	};

	const createAccountWithEmailAndPassword = async (
		email: string,
		password: string
	) => {
		try {
			await createUser(auth, email, password);
		} catch (error) {
			console.error("Error creating account with email and password", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("Error signing out", error);
			throw error;
		}
	};

	return {
		signInWithEmailAndPassword,
		createAccountWithEmailAndPassword,
		logout,
		user,
	};
};

export default useAuth;
