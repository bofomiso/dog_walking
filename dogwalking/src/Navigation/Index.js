import React from "react";
import { AuthProvider } from "./AuthProvider";
import { LocationProvider } from "./LocationProvider"
import Routes from "./Routes";

export default function Providers() {
  return (
    <LocationProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </LocationProvider>
  );
}