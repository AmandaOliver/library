import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Catalog from './Catalog';
import generateLibrary from './libraryGenerator'
import conf from './configuration'

const { booksArray, authorsMap } = generateLibrary(conf)

export const App = () => (
    <Fragment>
        <Header />
        <Catalog booksArray={booksArray} authorsMap={authorsMap}/>
    </Fragment>

)

ReactDOM.render(<App/>, document.getElementById('root'));
