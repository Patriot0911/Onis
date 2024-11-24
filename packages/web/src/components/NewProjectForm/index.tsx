'use client';

import CollectionsService from "@/services/collections";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "../ui/Dialog";
import DescriptionInput from "./DescriptionInput";
import NameInput from "./NameInput";
import ThumbnailInput from "./ThumbnailInput";


type CreateProject = {
    name: string;
    description: string;
    thumbnail: File | null;
};

const NewProjectForm = () => {
    const [formData, setFormData] = useState<CreateProject>({
        name: "",
        description: "",
        thumbnail: null,
    });
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setIsDisabled(formData.name.trim() === '');
    }, [formData.name]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const thumbnail = e.target.files && e.target.files[0];
        if (thumbnail) {
            setFormData((prev) => ({ ...prev, thumbnail }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isDisabled) {
            return;
        };

        try {
            const response = await CollectionsService.createCollection(formData);
            console.log('Project created:', response);
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                Create New Collection
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit} className="px-4">
                    <DialogHeader>
                        <h2 className="text-lg font-bold">New Project</h2>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4">
                        <NameInput
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <DescriptionInput
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <ThumbnailInput
                            thumbnail={formData.thumbnail}
                            onChange={handleFileChange}
                            onFileClick={() => document.getElementById("file-input")?.click()}
                        />
                    </div>
                    <DialogFooter className="px-0">
                        <button
                            type="submit"
                            className="bg-primary text-white rounded px-4 py-2 hover:bg-secondary disabled:bg-gray"
                            disabled={isDisabled}
                        >
                            Create Project
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewProjectForm;
