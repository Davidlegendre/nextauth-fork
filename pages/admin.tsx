import { FC, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { signOut } from "next-auth/react"

interface Props {}

const Admin: FC<Props> = (props): JSX.Element => {
  const [isSession, setIsSession] = useState(false)
  const session = async () => {
    const get = await getSession()
    setIsSession(get !== null)
  }

  useEffect(()=>{
    session()
  },[])

  return (
    <>
      {
        isSession ? <button onClick={() => signOut()}>Sign out</button> : ""
      }
    </>
  )
};

export default Admin;
