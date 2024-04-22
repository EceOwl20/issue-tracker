'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller, Form} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import  axios from 'axios';
import React from 'react'
import { useRouter } from 'next/navigation';

//interface defines the shape of our form
//it specifies what fields we have and what are their types
interface IssueForm{
  title:string;
  description:string;
}

const NewIssuePage = () => {
  const router = useRouter(); //use next/navigation useRouter
  const {register, control, handleSubmit} = useForm<IssueForm>();
  
  return (
    <form 
    className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async(data)=>{
      await axios.post('/api/issues',data);
      router.push('/issues');
//now finally we want to redirect yhe user with the issue page to do that we use the router hook in nextjs
    })}>
      <TextField.Root placeholder='Title' {...register('title')}>
      </TextField.Root>
      <Controller
      name="description"
      control={control}
      render={({field })=> <SimpleMDE placeholder='Description' {...field}/>}
      ></Controller>
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
