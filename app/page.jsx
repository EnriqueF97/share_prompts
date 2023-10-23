import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & write your own
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">
        AI-Useful Prompts
      </span>
    </h1>

    <p className="desc text-center">
      With this app, you will be able to know useful AI Prompts to be
      used on ChatGPT & Google Bard from other users, create your own
      and share them with other users from all the world!
    </p>
    <p className="text-center desc">
      This is a work in progress, search functionality is coming!
    </p>
    <p className="text-center desc">Enrique Favila, Aug 2023</p>
    <Feed />
  </section>
);

export default Home;
