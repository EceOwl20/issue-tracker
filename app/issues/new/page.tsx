'use client';

import { Button,Callout,Text,TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import  axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import {z} from 'zod';
import ErrorMessage from '@/app/component/ErrorMessage';
import Spinner from '@/app/component/Spinner';

type IssueForm= z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter(); //use next/navigation useRouter
  //formState represent everything we need to know aboout our form
  const {register, control, handleSubmit, formState:{errors}} = useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)
  });
  const [error,setError] = useState('');
  const [isSubmitting,setSubmitting] = useState(false);
  
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form 
    className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async(data)=>{
      try {
        setSubmitting(true);
        await axios.post('/api/issues',data);
        router.push('/issues');
        
      } catch (error) {
        setSubmitting(false);
        console.log(error)
        setError('An unexpected error occured.')
      }
//now finally we want to redirect yhe user with the issue page to do that we use the router hook in nextjs
    })}>
      <TextField.Root placeholder='Title' {...register('title')}>
      </TextField.Root>
        <ErrorMessage>
        {errors.title?.message}
        </ErrorMessage>
      <Controller
      name="description"
      control={control}
      render={({field })=> <SimpleMDE placeholder='Description' {...field}/>}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default NewIssuePage
