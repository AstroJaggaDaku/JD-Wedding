export const metadata = {
  title: "JD Matrimony",
  description: "User Dashboard and Site Pages",
};

export default function RootSiteLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
