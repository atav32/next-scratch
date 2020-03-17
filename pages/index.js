import Head from 'next/head';
import Link from 'next/link';

const Index = () => (
  <div>
    <Head>
      <script type="text/javascript" src="https://polyfill.io/v3/polyfill.min.js?features=fetch%2CPromise%2CURL%2CUint8Array%2CObject.assign"></script>
    </Head>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
);

export default Index;
