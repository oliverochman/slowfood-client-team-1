import React from 'react'

const RegistrationForm = ({ submitFormHandler }) => {
  return (
    <form onSubmit={submitFormHandler} id='signup'>
      <label>Full Name</label>
      <input name='name' type='text' id='name'></input>

      <label>Email</label>
      <input name='email' type='email' id='email'></input>

      <label>Password</label>
      <input name='password' type='password' id='password'></input>

      <label>Confirm Password</label>
      <input name='confirm_password' type='password' id='confirm_password'></input>

      <button id='submit'>Submit</button>
    </form>
  );
};

export default RegistrationForm;