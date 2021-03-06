import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/header";
import { TodoList } from "../components/todo-list";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen min-h-screen bg-disc-dark-not-black">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <TodoList />
    </div>
  );
};

export default Home;
