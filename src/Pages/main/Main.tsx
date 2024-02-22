import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import Post from "./Postt"

 export interface CreatePostList {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}
export const Main = () => {
  const [postsList, setPostsList] = useState<CreatePostList[] | null>(null)
  const postsRef = collection(db, "posts")

  const getPost = async () => {
    const data = await getDocs(postsRef)
    setPostsList(data.docs.map((doc)=>({...doc.data(), id: doc.id})) as CreatePostList []);
    
  }
 

  useEffect(()=>{
    getPost()
  }, [])
  return (
    <>
      <div>
        {postsList?.map((post)=>(
          <>
          <Post post={post}/>
          </>
        ))}
      </div>
    </>
  )
}