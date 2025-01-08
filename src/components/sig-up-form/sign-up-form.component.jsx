import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import { SignUpContainer } from './sign-up-form.style.jsx';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [loadingValue, setLoadingValue] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChanges = (event) => {
    const { name = '', value = '' } = event.target ?? {};
    setFormFields({ ...formFields, [name]: value });
  };
  const onResetForm = () => {
    setFormFields(defaultFormFields);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { password = '', confirmPassword = '', email = '', displayName = '' } = formFields ?? {};
    if (password === confirmPassword) {
      setLoadingValue(true);
      try {
        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        await createUserDocumentFromAuth(user, { displayName });

        onResetForm();
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Can not create email. Email already in user.');
        }
        console.error(error);
      } finally {
        setLoadingValue(false);
      }
    } else {
      alert('Wrong password or Confirm password');
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have and account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={onSubmit}>
        <FormInput
          label="Display name"
          disabled={loadingValue}
          required
          type="text"
          onChange={handleChanges}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          disabled={loadingValue}
          required
          type="email"
          onChange={handleChanges}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          disabled={loadingValue}
          required
          type="password"
          onChange={handleChanges}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm password"
          disabled={loadingValue}
          required
          type="password"
          onChange={handleChanges}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button buttonType={BUTTON_TYPES_CLASSES.base} type="submit" disabled={loadingValue}>
          Sign up
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
