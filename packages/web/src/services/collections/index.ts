interface CreateCollection {
    title: string;
    description?: string;
}

class CollectionsService {
    static API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    static authProprs: Partial<RequestInit> = {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    };

    static CollectionRoutes = {
        create: `${this.API_URL}/collections`,
        getById: `${this.API_URL}/collections`,
    };

    static async createCollection({ title, description }: CreateCollection) {
        if (!this.API_URL) throw new Error('No API found');

        const body = JSON.stringify({ title, description });
        const res = await fetch(this.CollectionRoutes.create, {
            ...this.authProprs,
            method: 'POST',
            body,
        });

        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Failed to create collection: ${errorMessage}`);
        }

        return res.json();
    }

    static async getById(id: string) {
        if (!this.API_URL) throw new Error('No API found');

        const res = await fetch(`${this.CollectionRoutes.getById}/${id}`, {
            ...this.authProprs,
            method: 'GET',
        });

        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Failed to create collection: ${errorMessage}`);
        }

        return res.json();
    }
}

export default CollectionsService;
