import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
  title: 'User Login',
}

export default async function ShippingPage() {
  return <Form />
}