import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="container-page grid grid-cols-1 gap-7 pt-7 pb-[72px] lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-16 lg:pt-14 lg:pb-32">
      <Sidebar />
      <div className="min-w-0">{children}</div>
    </main>
  );
}
