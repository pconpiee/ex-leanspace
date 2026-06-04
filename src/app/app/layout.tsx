import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { AppSidebar } from "@/components/app/sidebar";

export const metadata: Metadata = {
  title: "Career app — ex-Leanspace",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <AppSidebar email={user.email} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
