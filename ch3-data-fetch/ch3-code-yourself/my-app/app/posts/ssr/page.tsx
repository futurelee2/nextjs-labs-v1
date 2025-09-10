//SSR

type Post = { id: string; title: string; body: string };

export default async function PostsSSGPage() {
  //두번째 매개변수 옵션을 주게되면 SSR임
  const res = await fetch("http://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", // 매 요청마다 서버에서 fetch 하렴
  });
  if (!res.ok) throw new Error("에러발생");
  const posts: Post[] = await res.json();
  return (
    <>
      <h2>SSR 패칭</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <b>{post.title}</b>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
