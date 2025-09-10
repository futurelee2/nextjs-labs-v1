//"use client" // useEffect 사용. async await 사용안됨
// 서버 컴포넌트 SSG
// 미리 만들어놓는 방식(동적라우팅도 SSG로 가능하다.)
// SSG <> SSR 중 뭐가 좋을지는 본인이 판단해야함
type Post = { id: string; title: string; body: string }; //매개변수 ({ params }: any)

type Props = {
  params: { id: string };
};
export async function generateStaticParams() {
  // next js 예약된 함수?
  const res = await fetch("http://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await res.json();
  return posts.slice(0, 10).map((post) => ({
    id: post.id.toString(),
  }));
} // return ["1","2","3"...]

// SSG 방식의 HTML을 10개 만들겠다
export default async function DetailPage({ params }: Props) {
  const { id } = params;
  const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${id}`);
  const post: Post = await res.json();
  return (
    <>
      <div>
        <h2> 게시글 상세 (ID :{params.id})</h2>
        <div>
          <h3>{post.title}</h3>
          <h3>{post.body}</h3>
        </div>
      </div>
    </>
  );
}
