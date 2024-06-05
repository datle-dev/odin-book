import { useState, useEffect } from 'react';

export default function AuthTest() {
  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {
    const fetchAuthTest = async () => {
      await fetch('http://localhost:3000/test', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          setApiResponse(resData);
        })
        .catch((err) => console.error(err));
    };

    fetchAuthTest();
  }, []);

  return (
    <>
      <h1>Auth Test</h1>
      <div>{JSON.stringify(apiResponse)}</div>
    </>
  );
}
