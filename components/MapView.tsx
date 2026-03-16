"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface MapPin {
  id: string;
  label: string;
  score?: number;
  lat: number;
  lng: number;
}

interface MapViewProps {
  pins: MapPin[];
  center?: { lat: number; lng: number };
  highlightedId?: string | null;
  onPinClick?: (id: string) => void;
  onPinHover?: (id: string | null) => void;
  className?: string;
}

// San Diego default center
const DEFAULT_CENTER = { lat: 32.7157, lng: -117.1611 };

export function MapView({
  pins,
  center,
  highlightedId,
  onPinClick,
  onPinHover,
  className = "",
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map());
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  // Initialize map
  useEffect(() => {
    if (!apiKey || !mapRef.current) {
      if (!apiKey) setError(true);
      return;
    }

    let cancelled = false;

    async function initMap() {
      const { setOptions, importLibrary } = await import("@googlemaps/js-api-loader");
      setOptions({ key: apiKey!, v: "weekly" });

      try {
        await importLibrary("maps");
        await importLibrary("marker");
        if (cancelled || !mapRef.current) return;

        const map = new google.maps.Map(mapRef.current!, {
          center: center || DEFAULT_CENTER,
          zoom: 11,
          disableDefaultUI: true,
          zoomControl: true,
          scrollwheel: false,
          mapId: "homebirth-map",
        });

        mapInstanceRef.current = map;
        setLoaded(true);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    initMap();
    return () => { cancelled = true; };
  }, [apiKey, center]);

  // Create/update markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !loaded) return;

    // Clear old markers
    markersRef.current.forEach((m) => (m.map = null));
    markersRef.current.clear();

    // Fit bounds
    if (pins.length > 0) {
      const bounds = new google.maps.LatLngBounds();

      if (center) {
        bounds.extend(center);
      }

      pins.forEach((pin) => {
        bounds.extend({ lat: pin.lat, lng: pin.lng });

        // Create marker element
        const el = document.createElement("div");
        el.className = "hb-map-pin";
        el.innerHTML = `<span>${pin.label}</span>`;
        el.style.cssText = `
          display:flex;align-items:center;justify-content:center;
          width:36px;height:36px;border-radius:50%;
          background:#1a6b5a;color:#fff;font-size:11px;font-weight:600;
          cursor:pointer;transition:transform 0.15s;
          border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.2);
        `;

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: pin.lat, lng: pin.lng },
          content: el,
          title: pin.label,
        });

        marker.addListener("click", () => onPinClick?.(pin.id));
        el.addEventListener("mouseenter", () => onPinHover?.(pin.id));
        el.addEventListener("mouseleave", () => onPinHover?.(null));

        markersRef.current.set(pin.id, marker);
      });

      // Add "You" marker
      if (center) {
        const youEl = document.createElement("div");
        youEl.style.cssText = `
          display:flex;align-items:center;justify-content:center;
          width:32px;height:32px;border-radius:50%;
          background:#3b82f6;color:#fff;font-size:10px;font-weight:700;
          border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.2);
        `;
        youEl.textContent = "You";

        new google.maps.marker.AdvancedMarkerElement({
          map,
          position: center,
          content: youEl,
          title: "Your location",
        });
      }

      map.fitBounds(bounds, 40);
    }
  }, [pins, center, loaded, onPinClick, onPinHover]);

  // Highlight effect
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.content as HTMLElement;
      if (!el) return;
      if (id === highlightedId) {
        el.style.transform = "scale(1.3)";
        el.style.zIndex = "10";
      } else {
        el.style.transform = "scale(1)";
        el.style.zIndex = "1";
      }
    });
  }, [highlightedId]);

  if (error || !apiKey) {
    return (
      <div
        className={`flex items-center justify-center rounded-[12px] border border-card-border bg-gray-50 ${className}`}
      >
        <div className="text-center p-4">
          <svg
            className="mx-auto h-8 w-8 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <p className="mt-2 text-xs text-muted">Map unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`rounded-[12px] border border-card-border ${className}`}
    />
  );
}

// Helper: generate pins from provider data
export function providersToMapPins(
  providers: { id: string; name: string; matchScore?: number; lat?: number; lng?: number }[]
): MapPin[] {
  return providers
    .filter((p) => p.lat && p.lng)
    .map((p) => ({
      id: p.id,
      label: p.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      score: p.matchScore,
      lat: p.lat!,
      lng: p.lng!,
    }));
}
