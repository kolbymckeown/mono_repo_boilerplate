import { useState } from 'react';

import Session from '@/components/auth';
import { Layout } from '@/components/layout';
import useAuth from '@/hooks/use-auth';

const SignUp = () => {
  const { createAccountWithEmailAndPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUpSubmit = (values: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    verifyPassword?: string;
  }) => {
    setLoading(true);
    const {
      firstName = '',
      lastName = '',
      email,
      password,
      verifyPassword,
    } = values;

    if (password === verifyPassword) {
      createAccountWithEmailAndPassword(email, password, firstName, lastName)
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('Passwords do not match');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Session
        isSigningIn={false}
        onSubmit={handleSignUpSubmit}
        error={error}
        loading={loading}
      />
    </Layout>
  );
};

export default SignUp;
