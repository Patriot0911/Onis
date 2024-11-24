class AuthClientService {
  static API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  static AuthRoutes = {
    login: `${this.API_URL}/auth/login`,
    register: `${this.API_URL}/auth/register`,
  };

  static async registerUser(username: string, email: string, password: string) {
    if(!this.API_URL)
      throw new Error('No API found');

    const body = JSON.stringify({ username, email, password, });
    const res = await fetch(this.AuthRoutes.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to register: ${errorMessage}`);
    };

    return res.json();
  };

  static async login(emailOrUserName: string, password: string) {
    const body = JSON.stringify({ emailOrUserName, password, });
    const res = await fetch(this.AuthRoutes.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to login: ${errorMessage}`);
    };

    return res.json();
  };
};


export default AuthClientService;
