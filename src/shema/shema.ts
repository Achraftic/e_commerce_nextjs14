import z from "zod"

export const LoginAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})



export const SignUpAuthSchema = z.object({
  name: z.string()
    .min(3, "Name must be at least 3 characters long"),

  email: z.string()
    .email("Invalid email format"),

  password: z.string()
    .min(6, "password is required")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Please enter a stronger password.'),

  confirme_password: z.string()
    .min(1, " required"),

})
  .refine(data => data.password === data.confirme_password, {
    message: "Passwords don't match",
    path: ["confirme_password"], // Error will be attached to the confirme_password field
  });

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number").nonnegative("Price is required"),
  stock: z.number().int().positive("Stock must be a positive integer"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z.union([z.instanceof(File), z.string()]).optional()
})
