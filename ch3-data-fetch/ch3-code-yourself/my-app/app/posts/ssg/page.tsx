//SSG 방식 (빌드 시점에 렌더링 -> 빌드시점에 코드 쭈욱 읽은뒤 다 만들어서 HTML로 보내줌)
// 리액트 훅 사용불가
// 한번 빌드가 되면 안바뀜

type Post = { id: string; title: string; body: string };

export default async function PostsSSGPage() {
  //자바스크립트 쓰듯이 씀
  const res = await fetch("http://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("에러발생");
  const posts: Post[] = await res.json();
  return (
    <>
      <h2>SSG 패칭</h2>
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
