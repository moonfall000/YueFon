'use client';
import Navbar from '../components/Navbar';
import './globals.css'; 

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" className="scroll-smooth dark">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
