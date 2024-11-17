import React from "react";
// PImport "page.tsx"(Profil)
// import ProfilPage from './profil/page'
// import DosenPage from './profil/dosen/page'
// Impport file "style.module.css"
import udin from './file_css/style.module.css'
// Udin adalah contoh penamaan variable import
export default function MainPage() {
  return (
    <div>
      ini halaman home
      {/* Panggil isi fungsi profil page */}
      {/* <ProfilPage></ProfilPage>
    <DosenPage></DosenPage> */}
      {/* <div>Halaman Mahasiswa</div>
    <h1> Daftar Mahasiswa IF22dx</h1>
    <table>
        <tr>
            <td>No</td>
            <td>Nama</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Heru</td>
        </tr>
    </table> */}


    {/* pemberlakuan pemanggilan css spesifik apabila lebih dari 2 kata.
    solusi 1 = gunakan underscore = styles.text_footer
    solusi 2 = styles["text-footer"] */}
    <footer className={udin["text-footer"]}>Bagian Footer</footer>
    </div>
  );
}

// export function Home() {
//     return (
//       <div>
//       <div>Halaman Mahasiswa</div>
//       <h1> Daftar Mahasiswa IF22dx</h1>
//       </div>
//     )
//   }
