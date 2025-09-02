export const mfConfig = {
  name: "remote2",
  filename:"remoteEntry.js",
  exposes: {
    "./Footer":"./src/Footer.tsx"
  },
  shared: ["react", "react-dom"],
};
