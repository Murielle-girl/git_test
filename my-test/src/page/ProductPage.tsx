import React, { Fragment, useEffect, useState } from 'react';
import { Table } from '../component/Table';
import axios from 'axios';

interface Product {
  // Définissez ici la structure de votre objet Product
  // par exemple : id: number, name: string, price: number, etc.
}

export function ProductPage() {
  const [product, setProduct] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<number | null>(null);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [productsPerPage, setProductsPerPage] = useState<number>(10); // Nombre de produits par page
  const [searchQuery, setSearchQuery] = useState<string>("");

const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(event.target.value);
};

 const handlefetchProduct = async () => {
  const response = await axios.get<any>(`https://dummyjson.com/products/search?q=${searchQuery}`);
  const products: Product[] = response.data?.products;
  console.log(products);

  // Calculer l'index de début et de fin pour les produits de la page courante
  const indexOfLastProduct: number = currentPage * productsPerPage;
  const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
  const currentProducts: Product[] = products.slice(indexOfFirstProduct, indexOfLastProduct);

  setProduct(currentProducts);

  // Mettre à jour les numéros de page précédent et suivant
  setPrevPage(currentPage > 1 ? currentPage - 1 : null);
  setNextPage(currentPage < Math.ceil(products.length / productsPerPage) ? currentPage + 1 : null);
};



  useEffect(() => {
    handlefetchProduct();
  }, []);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleProductsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const value = parseInt(event.target.value);
  setProductsPerPage(value);
};


 return (
  <Fragment>
    <div className="">
       <div>
            <select value={productsPerPage} onChange={handleProductsPerPageChange}>
          <option value="10">10 produits par page</option>
          <option value="20">20 produits par page</option>
          <option value="30">30 produits par page</option>
        </select>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Rechercher un produit" />
       </div>

      <Table data={product} />

      <div className="pagination">
        

        <button onClick={() => prevPage != null && paginate(prevPage)} disabled={!prevPage}>
          Précédent
        </button>

        {Array.from({ length: Math.ceil(product.length / productsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}

        <button onClick={() => nextPage != null && paginate(nextPage)} disabled={!nextPage}>
          Suivant
        </button>
      </div>
    </div>
  </Fragment>
);


}
