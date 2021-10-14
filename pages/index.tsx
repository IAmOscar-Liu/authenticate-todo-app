import Head from "next/head";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { table, minifyRecords } from "../utils/airtable";
import Todo from "../components/Todo";
import { Record } from "../types";
import { useTodosContext } from "../contexts/TodosContext";
import auth0 from "../utils/auth0";
import TodoForm from "../components/TodoForm";

export default function Home({
  initialTodos,
  user,
}: {
  initialTodos: Record[];
  user: any;
}) {
  const { todos, setTodos } = useTodosContext();

  useEffect(() => {
    console.log(user);
    setTodos(initialTodos);
  }, []);

  return (
    <div>
      <Head>
        <title>Authenticated Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar user={user} />
        {user && (
          <>
            <h1 className="text-2xl text-center mb-4">My Todos</h1>
            <TodoForm />
            <ul>
              {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await auth0.getSession(context.req);
  let todos = [];
  try {
    if (session?.user) {
      todos = await table
        .select({
          filterByFormula: `userId = '${session.user.sub}'`,
        })
        .firstPage();
    }
    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        err: "something went wrong",
      },
    };
  }
};
