export const mfConfig = {
  name: "host",
  remotes:{
    remote1:"remote1@http://localhost:3001/remoteEntry.js",
    remote2:"remote2@http://localhost:3002/remoteEntry.js"
  },
  exposes: {},
  shared: ["react", "react-dom"],
};
