import conf from './configuration'
import myWorker from './libraryGenerator.worker';

export const worker = new myWorker();
const booksArray = []
worker.postMessage(conf);
worker.addEventListener('message', event => {
    booksArray.push(event.data)
});

export const getLibrary = () => booksArray
export const isLibraryLoaded = () => booksArray.length === conf.librarySize
export const isLibraryInitialized = () => booksArray.length > 10
