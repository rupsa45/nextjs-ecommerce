import { Metadata } from 'next'
import Form from './Form'

export const metadata: Metadata = {
  title: 'User SignUp',
}

export default async function ShippingPage() {
  return <Form />
}