import React from "react";
import { AuthProvider } from "./AuthProvider";
import { LocationProvider } from "./LocationProvider";
import { DogProvider } from "./DogProvider";
import Routes from "./Routes";

export default function Providers() {
  return (
    <DogProvider>
      <LocationProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </LocationProvider>
    </DogProvider>
  );
}