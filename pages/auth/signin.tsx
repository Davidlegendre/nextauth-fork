import { NextPage } from "next";
import { getSession, signIn } from 'next-auth/react';
import { FormEventHandler, useState } from "react";
import Router from 'next/router';

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    if(res?.status === 200)
    {
      Router.push("/")
    }
  };
  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type="email"
          placeholder="john@email.com"
        />
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="********"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default SignIn;

export async function getServerSideProps(Context: any) {

  const session = await getSession(Context)

  if(session)
  {
    return{
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }

  return {
    props: {},
  };
  
}
