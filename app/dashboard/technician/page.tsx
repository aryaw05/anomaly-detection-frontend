"use client";

import { get } from "@/app/api/infrastructure/infrastructure-api";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Map = dynamic(() => import("../../(map)/page"), { ssr: false });

export default function Technician() {
  useEffect(() => {
    const data = async () => {
      const response = await get();
      console.log(response);
    };
    data();
  }, []);
  return (
    <div>
      <Map />
    </div>
  );
}
