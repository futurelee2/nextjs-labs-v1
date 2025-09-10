"use client";

import useSWR from "swr";
// swr 라이브러리 -> 훅을 좀 더 쉽게 사용 가능
// 리액트에서 사용 가능

const fetcher = (url: string) => fetch(url).then((res) => res.json());
type Post = {
  id: string;
  title: string;
  body: string;
};

export default function PostList() {
  const { data, error, isLoading } = useSWR(
    "http://jsonplaceholder.typicode.com/posts",
    fetcher,
    {
      refreshInterval: 5000,
    }
  );
  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;
  return (
    <ul>
      {data.slice(0, 5).map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
