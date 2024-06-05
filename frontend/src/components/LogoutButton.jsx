import { useState, useEffect } from 'react';

export default function LogoutButton() {
  const [apiResponse, setApiResponse] = useState({});

  const onClickLogout = async (data) => {
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((resData) => {
        setApiResponse(resData);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
      <p>{JSON.stringify(apiResponse)}</p>
    </>
  );
}
