import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { addCategory, editCategory, getCategory } from '@/actions/CategoryAction';
import SubmitBtn from './SubmitBtn';
import { toast } from 'sonner';
import { Category } from '@prisma/client';


export default function FormCategory({ id, setOpen }: { id?: number, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log(id)
    useEffect(() => {
        const fetchCategory = async () => {
            if (id) {
                try {
                    const data = await getCategory(id);
                    setCategory(data);
                } catch (err) {
                    setError('Error fetching category');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // No ID provided, skip loading
            }
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (formData: FormData) => {
        let resulte;
        let message: string;
        if (id) {
            resulte = await editCategory(formData, id);
            message = 'Category updated successfully';
        }
        else {
            resulte = await addCategory(formData);
            message = ' Category updated successfully';
        }

        if ('message' in resulte) {
            toast.error(resulte.message);
        }
        else {
            setOpen(false);
            toast.success(message);
        }
    };

   

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <form action={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="name">
                        Category Name
                    </Label>
                    <Input
                        id="name"
                        defaultValue={category?.name}
                        className=" border "
                        name='name'
                        placeholder='Name'
                    />
                </div>
                <div className='flex '>

                    <SubmitBtn name={id ? 'Update' : 'Create'} />
                </div>
            </div>
        </form>
    );
}
