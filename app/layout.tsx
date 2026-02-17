// app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Team Diamonds",
  description: "Diamond in the Sky — Space learning for kids",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-space text-slate-100 overflow-x-hidden">
        <Header />

        {/* main content area */}
        <main className="mx-auto min-h-[calc(100vh-64px)]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}