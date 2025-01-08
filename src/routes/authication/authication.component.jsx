import SignUpForm from '../../components/sig-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import { AuthicationContainer } from './authication.style.jsx';

const Authication = () => {
  return (
    <AuthicationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthicationContainer>
  );
};

export default Authication;
