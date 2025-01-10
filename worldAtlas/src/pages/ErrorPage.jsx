import React from "react";
import { NavLink, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error-container">
      <h1>Oops! Something went wrong.</h1>
      <p>{error?.message || "An unexpected error occurred."}</p>
      <NavLink href="/">
        <button>Go back to Home</button>
      </NavLink>
    </div>
  );
}

export default ErrorPage;
