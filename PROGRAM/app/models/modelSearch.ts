// modelSearch.ts
let searchQuery = ""; // Variabel untuk menyimpan query pencarian

// Fungsi untuk memperbarui query pencarian
export const setSearchQuery = (query: string) => {
  searchQuery = query;
};

// Fungsi untuk mendapatkan query pencarian
export const getSearchQuery = () => {
  return searchQuery;
};

// tombol search
export async function fetchData(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(["Item 1", "Item 2", "Item 3"]); // Contoh data
      }, 1000);
    });
  }
  