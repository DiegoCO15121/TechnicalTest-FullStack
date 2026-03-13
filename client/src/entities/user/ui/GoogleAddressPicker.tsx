import {
  GoogleMap,
  Marker,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCurrentLocation } from "../model/hooks/useCurrentLocation";

const libraries: "places"[] = ["places"];

type Props = {
  street?: string;
  number?: string;
  city?: string;
  postalCode?: string;
};

export default function GoogleAddressPicker({
  street,
  number,
  city,
  postalCode,
}: Props) {
  const { setValue } = useFormContext();

  const { location } = useCurrentLocation();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const autocompleteRef = useRef<any>(null);

  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place.geometry) return;

    const location = place.geometry.location;

    const lat = location.lat();
    const lng = location.lng();

    const position = { lat, lng };

    setMarker(position);
    map?.panTo(position);

    const components = place.address_components;

    let street = "";
    let number = "";
    let city = "";
    let postalCode = "";

    components.forEach((c: any) => {
      if (c.types.includes("route")) street = c.long_name;
      if (c.types.includes("street_number")) number = c.long_name;
      if (c.types.includes("locality")) city = c.long_name;
      if (c.types.includes("postal_code")) postalCode = c.long_name;
    });

    setValue("street", street);
    setValue("number", number);
    setValue("city", city);
    setValue("postalCode", postalCode);
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const position = { lat, lng };

    setMarker(position);

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: position }, (results, status) => {
      if (status !== "OK" || !results?.length) return;

      const components = results[0].address_components;

      let street = "";
      let number = "";
      let city = "";
      let postalCode = "";

      console.log(components);

      components.forEach((c) => {
        if (c.types.includes("route")) street = c.long_name;
        if (c.types.includes("street_number")) number = c.long_name;
        if (c.types.includes("locality")) city = c.long_name;
        if (c.types.includes("postal_code")) postalCode = c.long_name;
      });

      setValue("street", street);
      setValue("number", number);
      setValue("city", city);
      setValue("postalCode", postalCode);
    });
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!street || !city) return;

    const address = `${street} ${number}, ${city}, ${postalCode}`;

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status !== "OK" || !results?.length) return;

      const location = results[0].geometry.location;

      const lat = location.lat();
      const lng = location.lng();

      const position = { lat, lng };

      setMarker(position);
      map?.panTo(position);
    });
  }, [isLoaded, street, number, city, postalCode]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="space-y-3">
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Buscar dirección..."
          className="w-full border p-2 rounded"
        />
      </Autocomplete>

      <GoogleMap
        zoom={15}
        center={marker || location || { lat: 19.4326, lng: -99.1332 }}
        mapContainerStyle={{ width: "100%", height: "300px" }}
        onLoad={(mapInstance) => setMap(mapInstance)}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker || location} />}
      </GoogleMap>
    </div>
  );
}
