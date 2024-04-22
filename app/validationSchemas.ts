import { z } from 'zod';

//an object that defines the shape of object and the body of our request 
export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required.')
});
