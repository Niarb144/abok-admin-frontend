import Image from "next/image";
import AdminGuard from '@/app/components/AdminGuard'
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <AdminGuard>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Link href="/admin/login" className="text-blue-500 hover:underline mt-4 block">
              Go to Admin Login
            </Link>
          </div>
        </AdminGuard>
      </main>
    </div>
  );
}
