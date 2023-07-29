export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container m-auto h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
