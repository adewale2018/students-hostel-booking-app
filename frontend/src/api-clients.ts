import { FormValues } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async(formData: FormValues) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  const responseBody = await res.json()
  if(!responseBody.ok) {
    throw new Error(responseBody.message)
  }
}
