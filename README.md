# Instructions

1. Use `nvm` to setup node: `nvm install`
2. Install the dependencies: `npm install`
3. Spin up the dependencies using the setup script (Docker required): `npm run spinUp`. Alternatively, you can run postgres yourself and update the connection parameters in `index.js`. Once you are done, you can bring down the dependencies (postgres volumes included!) with `npm run tearDown`.
4. See the failing operation by running `npm start`. This will automatically create a table if it does not exist.
5. Switch to the query format that succeeds by swapping the commented out methods on lines 56 and 57 in `index.js`.
