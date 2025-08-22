"use client";
import L from "leaflet";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useEffect, useRef } from "react";

export default function MapProvider() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  useEffect(() => {
    if (mapRef.current !== null) {
      (mapRef.current as L.Map).remove();
    }
    // Bounds
    const tileLayer = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    const southWest = L.latLng(-7.899, 105.958);
    const northEast = L.latLng(-6.3631, 111.757);
    const bounds = L.latLngBounds(southWest, northEast);
    const map = L.map(mapContainerRef.current || "", {
      // maxBounds: bounds,
      center: [-7.319, 109.572],
      zoom: 10,
      minZoom: 8,
    });
    L.tileLayer(tileLayer, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;
  }, []);
  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full  h-screen z-1 " />

      <div className="absolute top-3 left-20 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-medium border z-10">
        <h4 className="text-sm font-semibold mb-2">Status Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-2 h-2 bg-blue-500"></div>
            <span>Open</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full w-2 h-2 bg-orange-500"></div>
            <span>On Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full w-2 h-2 bg-green-500"></div>
            <span>Closed</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-medium border z-10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-lg font-bold text-green-500">10</div>
            <div className="text-xs text-muted-foreground">Closed</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-lg font-bold text-orange-500">10</div>
            <div className="text-xs text-muted-foreground">On Progress</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-lg font-bold text-red-500">20</div>
            <div className="text-xs text-muted-foreground">Open</div>
          </div>
        </div>
      </div>
    </div>
  );
}
