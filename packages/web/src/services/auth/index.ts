'use server';

export async function registerUser(nickname: string, email: string, password: string) {
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
        email,
        password,
      }),
    });
  
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to register: ${errorMessage}`);
    }
  
    return await res.json();
  }
  