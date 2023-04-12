import { useState, useEffect } from "react";
import { auth } from "@/utils/firebase";
import {
	signInWithEmailAndPassword as signIn,
	createUserWithEmailAndPassword as createUser,
	signOut,
	onAuthStateChanged,
	User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user.slice";

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
};

const useAuth = (): AuthHook => {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setUser({ email: user.email, uid: user.uid }));
			} else {
				dispatch(setUser({ email: null, uid: null }));
			}
		});

		return () => {
			unsubscribe();
		};
	}, [dispatch]);

	const signInWithEmailAndPassword = async (
		email: string,
		password: string
	) => {
		try {
			await signIn(auth, email, password);
			router.push("/");
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
			router.push("/");
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
	};
};

export default useAuth;
