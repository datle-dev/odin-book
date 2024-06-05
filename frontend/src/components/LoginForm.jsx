import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const [apiResponse, setApiResponse] = useState({});

  const { register, handleSubmit } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="usernamelogin">Username</label>
          <input
            name="usernamelogin"
            id="usernamelogin"
            type="text"
            placeholder="Username"
            {...register('username')}
          />
          <label htmlFor="passwordlogin">Password</label>
          <input
            name="passwordlogin"
            id="passwordlogin"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <input type="submit" value="Login" />
        </form>
        <p>{JSON.stringify(apiResponse)}</p>
      </div>
    </>
  );
}
