export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white shadow p-4">Dashboard Menu</aside>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
