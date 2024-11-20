import z from 'zod';

export const socialSchema = z.object({
    user_id: z.string()
        .min(3, 'name length must be greater than 2') 
        .nonempty('name is required'),
    platform: z.string()
        .max(1000, 'description must be less than 1000 in length'),
    platform_user: z.string()
        .nonempty('tag is required')
});

