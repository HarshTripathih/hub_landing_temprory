// components/ToastProvider.tsx
'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      closeButton={false}
      toastClassName="bg-black text-white rounded-md shadow-lg p-4 text-sm"
      className="top-0 sm:top-16"
      newestOnTop
      theme="colored"
    />
  );
}
