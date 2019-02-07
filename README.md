# LIBRARY

To start the app just run:
```javascript
yarn
yarn start
```

# ARCHITECTURE

The entry point is `src/index.jsx` this starts by initializating our `libraryLoader` who's job is to listen to a web worker that generates our book library, create our data, and provide access to it indirectly by exporting the functions that will handle our books.

If in the future we decide that the web worker needs to go away in favour of a server this should make our life easier.

Then we render the main component `<Library>` which handles the logic for filtering and sorting. This component is a `Provider` in our instance of Context API.

The `<Header>` is the host of our `<Search>` and `<Sort>` components, it needs to wait for the library to be fully loaded before sharing this features with the user. Be patient, it's million books ;). The performance tests that I've realized gave a result of ~10sg to generate them, but this might vary depending of the computer.

The app has been generated with create-react-app but I had to `eject` to add the webpack loader for the web worker.

The number of books to load can be changed in `src/configuration` as well as other configuration parameters that in a real scenario will come from other sources.

# THINGS I WOULD LIKE TO DO IF THIS WERE A REAL PRODUCT

- First of all, I would get the data from a server, generating them in the client is a super expensive operation, and in a production-ready environment it would make much more sense to just realize request to the server.

- Make the app responsive & create styles for the Search tools

- Develop real unit-tests, not just snapshots comparison

- End to End tests, with for example Cypress

- Type safety, flow-type for the win

- Continuous integration and deployment pipeline

- Improve the sorting, is full of non-pure functions I'm not very proud of it.

# COMMENT

No matter what the result of the process is, I want to thank you for this challenge, it was a fun one, I've learn a lot by doing it and I hope you'll enjoy reviewing it as well :)
