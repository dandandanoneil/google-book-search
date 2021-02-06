import React from "react";
import { useLocation } from "react-router-dom";

// IMPORT COMPONENTS
import Header from "../../components/Header";

function NoMatch() {
  const location = useLocation();

  return (
      <Header><code>{location.pathname}</code> not found</Header>
  );
}

export default NoMatch;
