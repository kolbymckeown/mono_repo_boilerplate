import { useState } from 'react';

import Session from '@/components/auth';
import { Layout } from '@/components/layout';
import useAuth from '@/hooks/use-auth';

const Login = () => {
  const { signInWithEmailAndPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (values: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    setLoading(true);
    signInWithEmailAndPassword(values.email, values.password)
      .catch((error) => {
        setError(error.message);
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
