import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignupForm() {
  const [apiResponse, setApiResponse] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setApiResponse(resData);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="usernamesignup">Username</label>
        <input
          name="usernamesignup"
          id="usernamesignup"
          type="text"
          placeholder="Username"
          maxLength="20"
          {...register('username', {
            required: 'Username is required',
          })}
        />
        <span>{errors.username && errors.username.message}</span>
        <label htmlFor="passwordsignup">Password</label>
        <input
          name="passwordsignup"
          id="passwordsignup"
          type="password"
          placeholder="Password"
          maxLength="20"
          {...register('password', {
            required: 'Password is required',
          })}
        />
        <span> {errors.password && errors.password.message}</span>
        <input type="submit" value="Sign Up" />
      </form>
      <div>{JSON.stringify(apiResponse)}</div>
    </>
  );
}
