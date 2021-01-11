import React, { useState } from 'react';

export function useForm() {
  const [values, setValues] = useState({});

  const handleInputChange = (evt) => {
    const target = evt.target;
    const { name, value } = target;
    // const value = target.value;
    // const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, setValues, handleInputChange };
}
