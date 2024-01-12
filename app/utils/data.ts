'use server';

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  // LatestInvoiceRaw,
  User,
  // Revenue,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
