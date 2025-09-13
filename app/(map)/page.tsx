"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { get } from "../api/infrastructure/infrastructure-api";
import icon from "leaflet/dist/images/marker-icon.png";
import { InfrastructureDetail } from "@/types/infrastructure";

interface MapProviderProps {
  selectedInfrastructure?: (infrastructure: InfrastructureDetail) => void;
}

interface ApiResponse {
  data: {
    infrastructure: InfrastructureDetail[];
  };
}
export default function MapProvider({
  selectedInfrastructure,
}: MapProviderProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ApiResponse | null>([]);
  let DefaultIcon = L.icon({
    iconUrl: icon,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    iconSize: [25, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    const fetchData = async () => {
      const response = await get();
      setData(response);
      console.log("infrastructure data", response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (mapRef.current !== null) {
      (mapRef.current as L.Map).remove();
    }
    // Bounds
    const tileLayer = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    const map = L.map(mapContainerRef.current || "", {
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

  useEffect(() => {
    if (!data?.data?.infrastructure) return;

    data.data.infrastructure.forEach((item: InfrastructureDetail) => {
      L.marker([item.latitude, item.longitude])
        .addTo(mapRef.current as L.Map)
        .on("click", () => {
          selectedInfrastructure?.(item);
        });
    });
  }, [data, selectedInfrastructure]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full z-1 " />

      {/* Status Legend */}
      <div className="absolute top-3 left-20 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-medium border z-10">
        <h4 className="text-sm font-semibold mb-2">Status Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-2 h-2 bg-red-500"></div>
            <span>Open</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full w-2 h-2 bg-yellow-500"></div>
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
