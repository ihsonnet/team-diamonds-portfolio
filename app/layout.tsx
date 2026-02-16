import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Team Diamonds",
  description: "Diamond In The Sky — space learning game for kids."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#05070a] text-slate-100">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
