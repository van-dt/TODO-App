import { auth } from "@clerk/nextjs/server";
import Todo from "../components/Todo";

export default function Home() {
  const { orgId } = auth().protect();
  if (!orgId) return <h1>No organization</h1>;
  console.log("orgId: " + orgId);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="font-bold text-3xl">Todo App</h1>
        <Todo />
      </main>
    </div>
  );
}
