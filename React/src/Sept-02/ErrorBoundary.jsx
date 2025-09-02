import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught by ErrorBoundary:", error);
    console.log("Error info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2 style={{ color: "red" }}>
          Something went wrong! Please try again later.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
