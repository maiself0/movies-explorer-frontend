import React, { useCallback } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


//хук управления формой и валидации формы
export default function useFormWithValidationForProfile() {
  const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = React.useState({ name: currentUser.name, email: currentUser.email});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}