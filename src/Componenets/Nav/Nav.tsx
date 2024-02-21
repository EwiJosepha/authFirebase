import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from 'firebase/auth'

function Nav() {
  const [user] = useAuthState(auth)
  //auth.currentUser

  const signOutUser = async () => {
    await signOut(auth)
  }
  return (
    <div>
      <div className="flexx" style={{ display: "flex", width: "100%", height: "80px", background: "slateblue", alignItems: "center", justifyContent: "flex-end" }}>
        <div className="links" style={{ textAlign: "center", marginRight: "50px", display: "flex" }}>
          <Link to="/" style={{ marginRight: "10px" }} ><p>Home</p></Link>
          { !user? <Link to="/login"><p>Login</p></Link>:
          <Link to="/createpost"><p>Create Post</p></Link>}
        </div>
        {user && (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginLeft: "5px", marginRight: "10px" }}>{user?.displayName}</p>
              <img src={user?.photoURL || ""} width="20px" height="20px" style={{ borderRadius: "50%" }} />
              <button onClick={signOutUser}>Log Out</button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Nav
