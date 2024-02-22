import React, { useEffect, useState } from 'react'
import { CreatePostList } from './Main'
import { CollectionReference, DocumentData, addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Props {
  post: CreatePostList 
}

interface Like {
  userId : string
}


function Post(props: Props) {
  const[postCount, setPostCount] = useState<number | null>(null)
  const{post} = props;
  const [user]= useAuthState(auth)
  const likesRef =collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id))
const getlikes = async() =>{
 const data= await getDocs(likesDoc)
 setPostCount(data.docs.length);
 
}

useEffect(()=>{
  getlikes()
},[])
  async function addLikes() {
  await addDoc (likesRef, {userId:user?.uid, postId: post.id})
  
}

  const styles = {
    margin: "0 auto",
    background: "slateblue",
    width: "100%",
    height: "100%",
    paddimg: "30px",
    marginTop: "40px"

}
  return (
    <div style={styles}>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <h1>{post.description}</h1>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={addLikes}>&#128077;</button>
          {postCount && <p> Likes:{postCount} </p>}
      </div>
    </div>
  )
}

export default Post
function addLike(likesRef: CollectionReference<DocumentData, DocumentData>, arg1: { userId: string | undefined; postId: any }) {
  throw new Error('Function not implemented.')
}

