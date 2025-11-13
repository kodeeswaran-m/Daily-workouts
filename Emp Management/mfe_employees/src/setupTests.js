
import "@testing-library/jest-dom"; // extends Jest matchers (toBeInTheDocument, etc.)
import { TextEncoder, TextDecoder } from "util";

// Polyfill for React Router / whatwg streams
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}
