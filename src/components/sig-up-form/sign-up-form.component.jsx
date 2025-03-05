import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import { SignUpContainer } from './sign-up-form.style.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { emailSignUpStart } from '../../store/user/user.action';
import { selectLoadingStatus } from '../../store/user/user.selector';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const loadingValue = useSelector(selectLoadingStatus)
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChanges = (event) => {
    const { name = '', value = '' } = event.target ?? {};
    setFormFields({ ...formFields, [name]: value });
  };
  const onResetForm = () => {
    setFormFields(defaultFormFields);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(emailSignUpStart(formFields));
    onResetForm();
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
