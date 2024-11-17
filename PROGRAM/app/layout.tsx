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
         <Link href={"/"}>Home</Link> |
          <a href={"/profil"}>Profil</a> |
          <Link href={"/profil/dosen"}>Dosen</Link> |
          Visi |
          Visi 1  |
          
        </header>

        {/* Area content */}
        <section id="text-content">{children}</section>

        {/* Area footer */}
        {/* <footer>Bagian Footer</footer> */}
      </body>
    </html>
  );
}
