'use client';

import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase/client';

import { insertItem } from './actions';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import AddProductModal from "./addProductModal"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

import { PlusCircledIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

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

export default function Products() {
  const router = useRouter();

  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [value, setValue] = useState("")
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchProducts = async () => {
    const { data: products, error } = await supabase.from('products').select('*');

    if (error) {
      console.error('Product error:', error);
    } else {
      setProducts(products || []);
    }
  }

  const fetchCategories = async () => {
    const { data: categories, error } = await supabase.from('categories').select('*');

    if (error) {
      console.error('Category error:', error);
    } else {
      setCategories(categories);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [router]);

  if (!products) {
    return <p>No products found</p>;
  // Proceed to render the dashboard for authenticated users
  }

  const handleAddProduct = async (newProduct: Product) => {
    // Add product to Supabase or wherever
    const result = await insertItem(newProduct); // Call the server-side action
    if (result.error) {
      console.error('Failed to insert product:', result.error);
    } else {
      await fetchProducts(); // Fetch the updated products
    }
  };

  return (
    <div className="w-full px-4 py-2">
      <h1 className='font-extrabold text-4xl'>Welcome back!</h1>
      <p className='text-lg mt-4'>Here are you current products:</p>
      <div className='flex mt-12'>
        <Button className=' max-h-[30px]' onClick={() => setModalOpen(true)}>
          <PlusCircledIcon className='mr-2'/>New Product
        </Button>
        <AddProductModal
          categories={categories}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddProduct} // Function to handle product addition
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="ml-4 w-[200px] justify-between max-h-[30px]"
            >
              {value
                ? categories.find((category) => category.name === value)?.name
                : "Category"}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search categories..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.name}
                      value={category.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {category.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === category.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="rounded-md border mt-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products
              // Filter products where the category name matches the selected value
              .filter((product) => {
                const productCategory = categories.find(category => category.id === product.category)?.name;
                return value ? productCategory === value : true; // Show all if no category selected
              })
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{categories?.find((category) => category.id === product.category)?.name}</TableCell>
                  <TableCell className="text-right">{product.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
