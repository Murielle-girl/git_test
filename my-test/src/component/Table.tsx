import React, { Fragment } from 'react'


interface ProductTable {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  brand: string,
  category: number
}

export function Table(props: any) {
  const { data } = props

   return (
    <Fragment>
      <table className="">
        <thead className="">
          <tr>
            <th className="">Number</th>
            <th className="" >Title</th>
            {/* <th className="">Description</th> */}
            <th className="">Price</th>
            <th className="">Discount Percentage</th>
            <th className="">Brand</th>
            <th className="">category</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: ProductTable, index: number) => (
            <tr key={index} className="">
              <td className="">{item.id}</td>
              <td className="">{item.title}</td>
              {/* <td className="">{item.description}</td> */}
              <td className="">{item.price}</td>
              <td className="">{item.discountPercentage}</td>
              <td className="">{item.brand}</td>
              <td className="">{item.category}</td>             
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

