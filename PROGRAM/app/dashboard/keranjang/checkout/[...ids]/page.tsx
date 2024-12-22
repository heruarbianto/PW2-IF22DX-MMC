import React from 'react'

  
export default function pageCheckout({params}:{params: {ids:string}}) {
    console.log(params.ids)
  return (
    <div>
    <h1>Selected IDs</h1>
    <ul>
        {params.ids}
      {/* {ids.map((id, index) => (
        <li key={index}>{id}</li>
      ))} */}
    </ul>
  </div>
  )
}
