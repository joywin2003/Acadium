"use client"
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

type Product = {
  name: string;
  company: string;
  category: string;
  rate: number;
  discount: number;
  available: boolean;
};

const products: Product[] = [
  {
    name: "Product A",
    company: "Company X",
    category: "Category 1",
    rate: 50.0,
    discount: 5,
    available: true,
  },
  {
    name: "Product B",
    company: "Company Y",
    category: "Category 2",
    rate: 30.0,
    discount: 10,
    available: false,
  },
  {
    name: "Product C",
    company: "Company Z",
    category: "Category 1",
    rate: 70.0,
    discount: 15,
    available: true,
  },
  {
    name: "Product D",
    company: "Company X",
    category: "Category 3",
    rate: 90.0,
    discount: 20,
    available: false,
  },
];

export default function TableDemo() {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

  const sortByRate = () => {
    const sorted = [...sortedProducts].sort((a, b) => a.rate - b.rate);
    setSortedProducts(sorted);
  };

  const sortByDiscount = () => {
    const sorted = [...sortedProducts].sort((a, b) => a.discount - b.discount);
    setSortedProducts(sorted);
  };

  const sortByAvailability = () => {
    const sorted = [...sortedProducts].sort((a, b) => Number(b.available) - Number(a.available));
    setSortedProducts(sorted);
  };

  return (
    <div>
      <div className="flex justify-between mb-4 mt-4">
        <button onClick={sortByRate}>Sort by Rate</button>
        <button onClick={sortByDiscount}>Sort by Discount</button>
        <button onClick={sortByAvailability}>Sort by Availability</button>
      </div>
      <Table>
        <TableCaption>Product List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Discount</TableHead>
            <TableHead className="text-right">Available</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.company}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">${product.rate.toFixed(2)}</TableCell>
              <TableCell className="text-right">{product.discount}%</TableCell>
              <TableCell className="text-right">{product.available ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Total Products: {sortedProducts.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
