export const metadata = {
  title: "JD Matrimony",
  description: "User Dashboard and Site Pages",
};

export default function SiteLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans">
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
