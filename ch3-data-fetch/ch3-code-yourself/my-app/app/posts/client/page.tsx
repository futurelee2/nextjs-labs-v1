//CSR 방식
// data fetching -> rendering
// 기본적으로 ssr 방식임.
//페이지로 가자마자 데이터 가져오기 위함
"use client";
import { useEffect, useState } from "react";

type Post = { id: string; title: string; body: string };

// 넣어줘야 csr
export default function PostClientPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("http://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("네트워크 에러");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1>로딩중</h1>;
  if (error) return <h1>오류: {error}</h1>;

  return (
    <>
      <h2>클라이언트 패칭</h2>
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
