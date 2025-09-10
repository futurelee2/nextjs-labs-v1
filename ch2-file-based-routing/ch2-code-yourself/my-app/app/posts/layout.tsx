export default function Postslayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>레이아웃 연습입니당</h1>
      {children}
    </div>
  );
}
