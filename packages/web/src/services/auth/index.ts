
class AuthClientService {
  static API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  static authProprs: any = {
    headers: { 'Content-Type': 'application/json', },
    credentials: 'include',
  };

  static AuthRoutes = {
    login: `${this.API_URL}/auth/login`,
    register: `${this.API_URL}/auth/register`,
    me: `${this.API_URL}/auth/me`,
  };

  static async registerUser(username: string, email: string, password: string) {
    console.log('Registering with:', { username, email, password });
    if(!this.API_URL)
      throw new Error('No API found');

    const body = JSON.stringify({ username, email, password, });
    const res = await fetch(this.AuthRoutes.register, {
      ...this.authProprs,
      method: 'POST',
      body,
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to register: ${errorMessage}`);
    };

    return res.json();
  };

  static async login(emailOrUserName: string, password: string) {
    console.log('Logging in with:', { emailOrUserName, password });
    if(!this.API_URL)
      throw new Error('No API found');
    console.log({'w': 'w'})
    const body = JSON.stringify({ emailOrUserName, password, });
    const res = await fetch(this.AuthRoutes.login, {
      ...this.authProprs,
      method: 'POST',
      body,
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to login: ${errorMessage}`);
    };
    console.log(await res.json())
    return res.json();
  };

  static async me() {
    if(!this.API_URL)
      throw new Error('No API found');
    try {
      const res = await fetch(this.AuthRoutes.me, {
        ...this.authProprs,
        method: 'GET',
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Failed to login: ${errorMessage}`);
      };
      return res.json();
    } catch(e) {};
  };
};


export default AuthClientService;
