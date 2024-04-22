'use client';

import { Button,Callout,TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller} from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import  axios from 'axios';
import React, { useState } from 'react'
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
  const [error,setError] = useState('');
  
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form 
    className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async(data)=>{
      try {
        await axios.post('/api/issues',data);
        router.push('/issues');
        
      } catch (error) {
        console.log(error)
        setError('An unexpected error occured.')
      }
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
    </div>
  )
}

export default NewIssuePage
