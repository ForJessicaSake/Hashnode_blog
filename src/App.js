import "./App.css";
import { useEffect,useState, useCallback } from "react";

function App() {

  const variables = { page: 0 };

  const query = `
  query GetUserArticles($page: Int!) {
      user(username: "ForJessicasake") {
          publication {
              posts(page: $page) {
                  title
                  brief
                  slug
                  coverImage
              }
          }
      }
  }
`;

  const fetchData = async () => {
    const data = await fetch("https://api.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const result = await data.json();
    const post = result.data.user.publication.posts;
    setPosts(post)
    setLoading(false)
  };

  const memoedFunction = useCallback(()=>{
    return fetchData()},[])

  useEffect(() => {
    memoedFunction()
  });

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true)
  return (

    <section className="App">

      <h1 className="font-bold lg:text-4xl text-3xl text-center mt-10 mb-14">Hi, welcome to my blog</h1>
      
      {loading && <p className="ml-6">fetching blogs...</p> }

      {posts &&
        posts.map((post) => (
          <article key={post.id} className="flex justify-between ml-6 mr-4 mb-6 items-center text-justify">
            <img src={post.coverImage} alt="blog post cover" className="lg:w-96 w-36" />
            <figcaption className="ml-6">
            <h2 className="font-bold lg:text-lg text-sm mb-2">{post.title}</h2>
            <p className="lg:text-base text-xs">{post.brief}</p>
            </figcaption>
          </article>
        ))}
    </section>
  );
}

export default App;
