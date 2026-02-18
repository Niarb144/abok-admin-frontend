import Image from "next/image";
import AdminGuard from '@/app/components/AdminGuard'

export default function Home() {
  return (
    <div>
      <main>
        <AdminGuard>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
        </AdminGuard>
      </main>
    </div>
  );
}
