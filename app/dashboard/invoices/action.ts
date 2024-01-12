'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0' }),
  cost: z.coerce.number(),
  location: z.enum(['cabin', 'salon'], {
    invalid_type_error: 'Please select an invoice location',
  }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status',
  }),
  date: z.string(),
});

const CreateInvoiceSchema = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    cost?: string[];
    location?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    cost: formData.get('cost'),
    location: formData.get('location'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice',
    };
  }
  const { amount, customerId, status, cost, location } = validatedFields.data;

  const amountInCents = amount * 100;
  const costInCents = cost * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, cost, status,location, date)
      VALUES (${customerId},${amountInCents}, ${costInCents} ,${status},${location}, ${date})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateInvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    cost: formData.get('cost'),
    location: formData.get('location'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields when trying to update invoice',
    };
  }

  const { amount, customerId, status, cost, location } = validatedFields.data;

  const amountInCents = amount * 100;
  const costInCents = cost * 100;

  try {
    await sql`
    UPDATE invoices SET customer_id = ${customerId}, amount = ${amountInCents}, cost = ${costInCents}, location = ${location}, status = ${status} WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice',
    };
  }

  revalidatePath('/dashboard/invoices');
}
