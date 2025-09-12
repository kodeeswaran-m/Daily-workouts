export const mfConfig = {
  name: "remote2",
  filename:"remoteEntry.js",
  exposes: {
    "./Dashboard":"./src/Dashboard.tsx"
  },
  shared: ["react", "react-dom"],
};
