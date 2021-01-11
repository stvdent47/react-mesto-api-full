import { useState } from 'react';

export default function useForm() {
  const [values, setValues] = useState({});

  const handleInputChange = (evt) => {
    const target = evt.target;
    const { name, value } = target;

    setValues({ ...values, [name]: value });
  };

  return { values, setValues, handleInputChange };
}
