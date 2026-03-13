import { useEffect, useState } from "react";

type Location = {
  lat: number;
  lng: number;
};

type UseCurrentLocationReturn = {
  location: Location | null;
  error: string | null;
};

export function useCurrentLocation(): UseCurrentLocationReturn {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation no soportada");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err: GeolocationPositionError) => {
        setError(err.message);
      }
    );
  }, []);

  return { location, error };
}