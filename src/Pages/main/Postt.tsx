import React from 'react'
import { CreatePostList } from './Main'
import { CollectionReference, DocumentData, addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Props {
  post: CreatePostList 
}


function Post(props: Props) {
  const{post} = props;
  const [user]= useAuthState(auth)
  const likesRef =collection(db, "likess")

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

      </div>
    </div>
  )
}

export default Post
function addLike(likesRef: CollectionReference<DocumentData, DocumentData>, arg1: { userId: string | undefined; postId: any }) {
  throw new Error('Function not implemented.')
}

