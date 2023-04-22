import * as yup from 'yup';

interface SchemaContext {
  isSigningIn: boolean;
}

export const loginOrRegisterSchema = yup.object().shape({
  firstName: yup
    .string()
    .test('isSigningIn', 'First name is required', function (value) {
      const { isSigningIn } = this.options.context as SchemaContext;
      return isSigningIn ? true : !!value;
    }),
  lastName: yup
    .string()
    .test('isSigningIn', 'Last name is required', function (value) {
      const { isSigningIn } = this.options.context as SchemaContext;
      return isSigningIn ? true : !!value;
    }),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  verifyPassword: yup
    .string()
    .test('isSigningIn', 'Verify password is required', function (value) {
      const { isSigningIn } = this.options.context as SchemaContext;
      if (isSigningIn) {
        return true;
      } else {
        if (!value) return false;
        return value === this.resolve(yup.ref('password'))
          ? true
          : this.createError({ message: 'Passwords must match' });
      }
    }),
});
