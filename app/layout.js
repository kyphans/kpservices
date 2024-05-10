import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: 'KP API Services',
  description: 'RESTful API for KP Services.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
