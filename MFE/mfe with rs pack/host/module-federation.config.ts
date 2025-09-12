export const mfConfig = {
  name: "host",
  exposes: {},
  remotes:{
    "remote1":"remote1@http://localhost:3001/remoteEntry.js",
    "remote2":"remote2@http://localhost:3002/remoteEntry.js",
  },
  shared: ["react", "react-dom"],
};
