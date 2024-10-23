'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { updateProfile } from "@/actions/authAction";
import { UserProfile } from "@/types/type";

export function FormProfile({ user }: { user: UserProfile }) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);

            // Create a preview URL for the image
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    };

    const handleSubmit = async (formData: FormData) => {
      
       await updateProfile(formData);
       console.log("okd")
       
    };

    return (
        <form action={handleSubmit}>
            <div className="gap-4 flex">
                <Image src={preview || user?.image as string} width={55} height={55} alt="Profile image" className="w-32 h-32 object-cover rounded-full" />
                 <input type="hidden" name="id" value={user?.id as string} />
                <div className="grid gap-4 py-4">
                    <div className="grid   gap-4">
                        <Label htmlFor="name" className="">
                            Name
                        </Label>
                        <Input
                            name="name"
                            defaultValue={user?.name as string}
                            id="name"
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid   gap-4">
                        <Label htmlFor="username" className="">
                            Email
                        </Label>
                        <Input
                            name="email"
                            defaultValue={user?.email as string}
                            id="email"
                            className="col-span-3"
                        />
                    </div>

                    {/* Image upload input */}
                    <div className="grid   gap-4">
                        <Label htmlFor="image" className="">
                            Profile Image
                        </Label>
                        <Input
                            name="image"
                            type="file"
                            id="image"
                            accept="image/*"
                            className="col-span-3"
                            onChange={handleImageChange}
                        />
                    </div>

                  
                </div>
            </div>

            <div className="w-full flex  justify-end">
                <Button type="submit">Save changes</Button>
            </div>
        </form>
    );
}
