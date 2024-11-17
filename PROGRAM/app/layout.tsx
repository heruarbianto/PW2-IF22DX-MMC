import Link from "next/link";
// Import file "globals.css"
import './globals.css'
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        
        {/* Area Header */}
        <header className="text-header">
         <h1>INI NAVBAR</h1>
          
        </header>

        {/* Area content */}
        {children}

        {/* Area footer */}
        {/* <footer>Bagian Footer</footer> */}
      </body>
    </html>
  );
}
