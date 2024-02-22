import React, { useEffect, useState } from 'react'
import { CreatePostList } from './Main'
import { CollectionReference, DocumentData, addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Props {
  post: CreatePostList
}

interface Like {
  likeId: string
  userId: string
}


function Post(props: Props) {
  const [like, setLike] = useState<Like[] | null>(null)
  const { post } = props;
  const [user] = useAuthState(auth)
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id))
  const getlikes = async () => {
    const data = await getDocs(likesDoc)
    setLike(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));

  }

  useEffect(() => {
    getlikes()
  }, [])


  async function addLikes() {
    try {
     const newDoc =  await addDoc(likesRef, { userId: user?.uid, postId: post.id })
      if (user) {
        setLike((prev) => prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }] : [{ userId: user?.uid }])
      }
    } catch (er) {
      console.log(er);

    }

  }

  async function removeLikes() {
   
    try {
      const liketoDeletequerry = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid))
      const deleteddata = await getDocs(liketoDeletequerry)
      const likeId = deleteddata.docs[0].id
      const likeToDelete= doc(db, "likes", likeId)
      await deleteDoc(likeToDelete)
     
      if (user) {
       setLike((prev)=> prev?.filter((like)=>(
like.id === likeId
       )))
      }
    } catch (er) {
      console.log(er);

    }

  }


const hasuserLiked = like?.find((lik) => (
    lik.userId == user?.uid
  ))

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
        <button onClick={hasuserLiked ? removeLikes: addLikes}>
          {hasuserLiked ? <>&#128078;</> : <>&#128077;</>}{""}
          </button>
        {like && <p> Likes:{like?.length} </p>}
      </div>
    </div>
  )
}

export default Post
function addLike(likesRef: CollectionReference<DocumentData, DocumentData>, arg1: { userId: string | undefined; postId: any }) {
  throw new Error('Function not implemented.')
}

