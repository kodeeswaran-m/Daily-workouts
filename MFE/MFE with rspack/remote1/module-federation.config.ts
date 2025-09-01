export const mfConfig = {
  name: "remote1",
  filename:"remoteEntry.js",
  exposes: {
    "./Header":"./src/Header.tsx"
  },
  shared: ["react", "react-dom"],
};
