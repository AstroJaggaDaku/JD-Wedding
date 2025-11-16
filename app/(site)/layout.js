export const metadata = {
  title: "JD Matrimony",
  description: "User Dashboard and Site Pages",
};

export default function SiteLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <main>{children}</main>
      </body>
    </html>
  );
}
