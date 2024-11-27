interface CreateCollection {
    name: string;
    description?: string;
};

class CollectionsService {
    static API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    static AuthRoutes = {
        login: `${this.API_URL}/collections`,
    };

    static async createCollection({ name, description }: CreateCollection) {
        if (!this.API_URL)
            throw new Error('No API found');

        const body = JSON.stringify({ name, description });
        const res = await fetch(this.AuthRoutes.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        });

        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Failed to create collection: ${errorMessage}`);
        };

        return res.json();
    };

};

export default CollectionsService;