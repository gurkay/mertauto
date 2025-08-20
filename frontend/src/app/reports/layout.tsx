import { getServerAuthSession } from "@/utils/auth";
import Providers from "@/components/Providers";

export default async function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  
  return (
    <div className="print-layout">
      <Providers>
        <main className="flex-grow">
          {children}
        </main>
      </Providers>
    </div>
  );
} 