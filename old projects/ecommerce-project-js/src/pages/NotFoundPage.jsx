import { Header } from "../components/header";
import './NotFoundPage.css';

export function NotFoundPage({ cart }){
  return (
    <div>
      <title>404 Page Not Found</title>
      <link rel="icon" href="home-favicon.png" />

      <Header cart={cart} />
      <p className="not-found-message">404 Page Not Found</p>
    </div>
  );
}