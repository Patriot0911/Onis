'use server';

export async function registerUser(username: string, email: string, password: string) {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  console.log("res", res);

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Failed to register: ${errorMessage}`);
  }

  return await res.json();
};

export async function loginUser(emailOrNickname: string, password: string) {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emailOrNickname,
      password,
    }),
  });

  console.log("res", res);

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Failed to login: ${errorMessage}`);
  }

  return await res.json();
};
