import type { NextPage } from "next";
import Head from "next/head";
import { TodoList } from "../components/todo-list";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen  bg-slate-200">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodoList />
    </div>
  );
};

export default Home;
