import Link from "next/link";

const Home = () => {
  return (
    <div className="container m-auto h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl">Task list project using PERN</h2>

      <Link href={"/projects"} className="text-xl text-red-500">
        Go to projects
      </Link>
    </div>
  );
};

export default Home;
