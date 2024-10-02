'use server';

import { createClient } from '@/lib/supabase/server';

interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  category?: string; // UUID type
}

export async function insertItem(product: Product) {
  const supabase = createClient();

  console.log('Inserting item:', product);

  const { data, error } = await supabase.from('products').insert(product);

  if (error) {
    console.error('Error inserting item:', error.message, error.details, error.hint);
    return { error: error.message || 'Unknown error', details: error.details, hint: error.hint };
  } else {
    console.log('Item inserted:', data);
    return { data };
  }
}
