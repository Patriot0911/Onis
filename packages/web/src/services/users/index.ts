class UsersService {
    static API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    static authProprs: Partial<RequestInit> = {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    };

    static UsersRoutes = {
        getCollections: `${this.API_URL}/users/collections/me`,
    };

    static async getCollections() {
        if (!this.API_URL)
            throw new Error('No API found');

        const res = await fetch(this.UsersRoutes.getCollections, {
            ...this.authProprs,
            method: 'GET',
        });

        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Failed to get collection: ${errorMessage}`);
        };

        return res.json();
    };
};

export default UsersService;