import  { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

import { SignUpContainer, ButtonsContainer } from './sign-in-form.style.jsx';
import { useDispatch } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [loadingValue, setLoadingValue] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChanges = (event) => {
    const { name = '', value = '' } = event.target ?? {};
    setFormFields({ ...formFields, [name]: value });
  };
  const onResetForm = () => {
    setFormFields(defaultFormFields);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formFields ?? {};

    setLoadingValue(true);
    try {
      dispatch(emailSignInStart(email, password));
      onResetForm();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password or email.');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email.');
          break;
        default:
          console.error(error);
          break;
      }
    } finally {
      setLoadingValue(false);
    }
  };
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  return (
    <SignUpContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={onSubmit}>
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
        <ButtonsContainer>
          <Button buttonType={BUTTON_TYPES_CLASSES.base} type="submit" disabled={loadingValue}>
            Sign in
          </Button>
          <Button
            buttonType={BUTTON_TYPES_CLASSES.google}
            type="button"
            disabled={loadingValue}
            onClick={signInWithGoogle}>
            Google Sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
