import { IUserLogIn, } from '@/interfaces/redux';

const authDataRefresh = process.env.NEXT_PUBLIC_AUTH_REFRESH_REQ;

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
    logOut: `${this.API_URL}/auth/logout`,
  };

  static validateAuthStorage(): (IUserLogIn & { isAuth: boolean; } | undefined) {
    const rawItem = localStorage.getItem('authState');
    if(!rawItem)
      return;
    const item = JSON.parse(rawItem);
    const { expires, } = item;
    if(!expires)
      return;
    if(expires >= new Date().getTime())
      return {
        isAuth: item.isAuth,
        avatar: item.avatar,
        username: item.username,
      };
    localStorage.removeItem('authState');
  };

  static async logOut() {
    if(!this.API_URL)
      throw new Error('No API found');
    const res = await fetch(this.AuthRoutes.logOut, {
      ...this.authProprs,
      method: 'POST',
    });
    return res.ok;
  };

  static async logoutStorage() {
    localStorage.setItem('authState', JSON.stringify({
      isAuth: false,
      expires: new Date().getTime() + parseInt(authDataRefresh),
    }));
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

  static async login(email: string, password: string) {
    console.log('Logging in with:', { email, password });
    if(!this.API_URL)
      throw new Error('No API found');
    const body = JSON.stringify({ email, password, });
    const res = await fetch(this.AuthRoutes.login, {
      ...this.authProprs,
      method: 'POST',
      body,
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to login: ${errorMessage}`);
    };
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
