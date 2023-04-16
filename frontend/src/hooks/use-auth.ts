import {
  signInWithEmailAndPassword as signIn,
  createUserWithEmailAndPassword as createUser,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { asyncRequest } from '@/api/asyncRequest';
import { setUser } from '@/redux/slices/user.slice';
import { dateDaysFromNow, deleteCookie, setCookie } from '@/utils/cookies';
import { auth } from '@/utils/firebase';

type AuthHook = {
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  createAccountWithEmailAndPassword: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const useAuth = (): AuthHook => {
  const router = useRouter();
  const dispatch = useDispatch();

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      dispatch(
        setUser({
          email: null,
          uid: null,
          firstName: null,
          lastName: null,
        })
      );
      deleteCookie('current_user');
      return;
    }

    const { user: dbUser } = await asyncRequest(`user/${authState.uid}`);

    dispatch(setUser(dbUser));
    setCookie('current_user', authState.uid, {
      expires: dateDaysFromNow(7),
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);

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
      router.push('/');
    } catch (error) {
      console.error('Error signing in with email and password', error);
      throw error;
    }
  };

  const createAccountWithEmailAndPassword = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const { user } = await createUser(auth, email, password);

      setCookie('current_user', user.uid, {
        expires: dateDaysFromNow(7),
      });

      await asyncRequest('user', {
        method: 'POST',
        body: {
          uid: user.uid,
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        },
      });

      router.push('/');
    } catch (error) {
      console.error('Error creating account with email and password', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
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
