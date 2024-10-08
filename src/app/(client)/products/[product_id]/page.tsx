import React from 'react'

export default function OneProductPage({ params }: { params: { product_id: string } }) {
  return (
    <div>OneProductPage {params.product_id} </div>
  )
}
