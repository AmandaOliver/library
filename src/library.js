import conf from './configuration'
import myWorker from './libraryGenerator.worker';

export const worker = new myWorker();
const booksMap = new Map()
worker.postMessage(conf);
worker.addEventListener('message', event => {
    booksMap.set(...event.data)
});

// export const getLibrary = () => booksMap
// export const isLibraryLoaded = () => booksMap.size === conf.librarySize
export const isLibraryInitialized = () => booksMap.size > 10
export const getBookById = (id) => booksMap.get(id)
// export const getBooksByIdRange = (indexInit, indexEnd) =>
//     new Array(indexEnd - indexInit).fill().map((_, index) => getBookById(index))
