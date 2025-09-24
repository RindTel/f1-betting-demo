import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <nav>
            <Link href="/">Home</Link> | <Link href="/race/1">SAMPLE</Link>
          </nav>
        </header>

        {children}

        <footer style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          F1 Betting Demo
        </footer>
      </body>
    </html>
  );
}

