import { Header } from "../components/header";
import './NotFoundPage.css';

export function NotFoundPage(){
  return (
    <div>
      <title>404 Page Not Found</title>
      <link rel="icon" href="home-favicon.png" />

      <Header />
      <p className="not-found-message">Page Not Found</p>
    </div>
  );
}