import React from "react";
import { AuthProvider } from "./AuthProvider";
import { LocationProvider } from "./LocationProvider";
import { MapProvider } from "./MapProvider";
import Routes from "./Routes";

export default function Providers() {
  return (
    <MapProvider>
      <LocationProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </LocationProvider>
    </MapProvider>
  );
}