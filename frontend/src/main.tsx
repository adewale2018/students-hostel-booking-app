import './index.css'

import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
