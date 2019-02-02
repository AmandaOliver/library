import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Catalog from './Catalog';

export const App = () => (
    <Fragment>
        <Header />
        <Catalog />
    </Fragment>

)

ReactDOM.render(<App />, document.getElementById('root'));
