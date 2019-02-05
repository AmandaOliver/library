import myWorker from './libraryGenerator.worker'
import config from './configuration'

export const worker = new myWorker()

export const booksArray = []
export const isLibraryInitialized = () => booksArray.length > config.booksPerPage
export const isLibraryLoaded = () => booksArray.length === config.librarySize

export const initializeLibrary = () => {
  // initialize worker
  worker.postMessage(config)

  worker.addEventListener('message', ({ data }) => {
    booksArray.push(data)
    isLibraryLoaded() && worker.terminate()
  })
}
