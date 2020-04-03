import Head from 'next/head';
import Link from 'next/link';

import '../styles/global.css';

const App = () => (
  <div>
    <Head>
      <script type="text/javascript" src="https://polyfill.io/v3/polyfill.min.js?features=fetch%2CPromise%2CURL%2CUint8Array%2CObject.assign"></script>
    </Head>
    <nav>
      <Link href="/transpile">
        <a>Transpile Page</a>
      </Link>
      <Link href="/localize">
        <a>Localize Page</a>
      </Link>
    </nav>
    <main>
      <p>Hello Next.js</p>
    </main>
  </div>
);

export default App;
