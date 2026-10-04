import { Component } from "react";

// Si un componente hijo lanza un error al renderizar, muestra `fallback` en su lugar
// en vez de desmontar toda la página. Para efectos decorativos el fallback suele ser
// su versión estática (o nada).
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.warn(`[${this.props.nombre || "ErrorBoundary"}]`, error, info?.componentStack);
  }

  render() {
    if (this.state.error) {
      const { fallback = null } = this.props;
      return typeof fallback === "function" ? fallback(this.state.error) : fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
