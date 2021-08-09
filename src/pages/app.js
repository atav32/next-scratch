import {Helmet} from 'react-helmet';
import {Link, Route, Switch} from 'react-router-dom';

import '../global.css';

const App = () => (
  <div>
    <Helmet>
      <script type="text/javascript" src="https://polyfill.io/v3/polyfill.min.js?features=fetch%2CPromise%2CURL%2CUint8Array%2CObject.assign"></script>
    </Helmet>
    <nav>
      <div className="ContentContainer">
        <Link to="/localize">
          <a>Localize Page</a>
        </Link>
        <Link to="/transpile">
          <a>Transpile Page</a>
        </Link>
        <Link to="/webcam">
          <a>Webcam Page</a>
        </Link>
      </div>
    </nav>
    <main>
      <Switch>
        <Route path="/">
          <div className="ContentContainer">
            <p>Hello Next.js</p>
          </div>
        </Route>
      </Switch>
    </main>
  </div>
);

export default App;
