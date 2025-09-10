//SSG(빌드시점 렌더링) + ISR

type Post = { id: string; title: string; body: string };

export default async function PostsSSGPage() {
  const res = await fetch("http://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 10 }, // 10초 주기로 재빌드(새로운 HTML을 생성)하겠다.
  });
  if (!res.ok) throw new Error("에러발생");
  const posts: Post[] = await res.json();

  const now = new Date().toLocaleString();

  return (
    <>
      <h2>ISR 패칭 + ISR</h2>
      <h3>페이지 생성 시각 : {now}</h3>
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
