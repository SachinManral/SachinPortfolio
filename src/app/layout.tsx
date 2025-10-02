import './globals.css';
import ClientWrapper from './ClientWrapper';

export const metadata = {
  title: 'Sachin Manral Portfolio',
  description: 'Futuristic, animated personal portfolio of Sachin Manral',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
