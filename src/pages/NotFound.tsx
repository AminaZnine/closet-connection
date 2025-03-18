
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          We couldn't find the page you're looking for.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-foreground text-background rounded-md inline-block btn-hover"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
