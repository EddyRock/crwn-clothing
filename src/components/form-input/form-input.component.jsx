import { Group, FormInputItem, FormInputLabel } from './form-component.style.jsx';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <FormInputItem {...otherProps} />
      <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
    </Group>
  );
};

export default FormInput;
