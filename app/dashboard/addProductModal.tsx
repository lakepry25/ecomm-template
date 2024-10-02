import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'; // Assuming you're using shadcn components
import { Button } from "@/components/ui/button";
import { useState } from 'react';

interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  category?: string; // UUID type
}

interface Category {
  id: string;
  name: string;
}

interface ModalProps {
  categories: Category[]
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newProduct: Product) => void;
}

export default function AddProductModal({ categories, isOpen, onClose, onSubmit }: ModalProps) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(newProduct);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Fill in the details below</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="mb-4 w-full p-2 border rounded"
          />
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
          <input
            name="description"
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="mb-4 w-full p-2 border rounded"
          />
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Product Price</label>
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="mb-4 w-full p-2 border rounded"
          />
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="mb-4 w-full p-2 border rounded"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">Stock of Product</label>
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="mb-4 w-full p-2 border rounded"
          />
        </div>
        <Button onClick={handleSubmit}>Add Product</Button>
      </DialogContent>
    </Dialog>
  );
};
