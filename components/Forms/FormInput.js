import React from 'react';

function FormInput({ handleChange, label, ...otherProps }) {
  return (
    <>
      <label htmlFor={otherProps.type}>{label}</label>
      <input {...otherProps} onChange={handleChange} />
    </>
  );
}

export default FormInput;
