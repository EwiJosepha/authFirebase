import React from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


interface createFormData{
  title: string;
  description: string;
}

function Form() {
  const [user] = useAuthState(auth)
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("ypu must add description")
  })

  const { register, handleSubmit,formState: {errors}, } = useForm<createFormData>({
    resolver: yupResolver(schema),
    })

  const postRef =collection(db, "posts")

   async function onsubmitform(data: createFormData) {
   await addDoc(postRef, {
    title: data.title,
    description : data.description,
    username: user?.displayName,
    id: user?.uid,

   })

  }
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmitform)}>
        <input placeholder='Title..' {...register("title")} />
        <p style={{color: "red"}}>{errors.title?.message}</p>
        <textarea placeholder='Descriptiion..' {...register("description")} />
        <p style={{color: "red"}}>{errors.description?.message}</p>

        <input type="submit" />
      </form>

    </div>
  )
}

export default Form
