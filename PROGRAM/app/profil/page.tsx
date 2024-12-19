import React from 'react'
import TambahMenu from '../modal/tambahMenu'
import Cart from './carttest'
const initialKeranjang = {
  1: { menuId: 1, name: "Nasi Goreng", price: 15000, quantity: 2, total: 30000 },
  2: { menuId: 2, name: "Mie Goreng", price: 12000, quantity: 1, total: 12000 },
};
export default function ProfilePage() {
  return (
    <div>
      
      <Cart></Cart>
    </div>
  )
}
