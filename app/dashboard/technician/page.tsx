"use client";

import dynamic from "next/dynamic";

import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import InfrastructureDetailPanel from "@/components/InfrastructureDetailPanel";
import { InfrastructureDetail } from "@/types/infrastructure";
const Map = dynamic(() => import("../../(map)/page"), { ssr: false });

export default function Technician() {
  const [selectedInfrastructure, setSelectedInfrastructure] = useState(null);
  const isMobile = useIsMobile();
  const handleCloseDetail = () => {
    setSelectedInfrastructure(null);
  };

  function handleInfrastructureSelect(infrastructure: InfrastructureDetail) {
    setSelectedInfrastructure(infrastructure);
  }
  return (
    <div className="flex w-full  h-full">
      <Map selectedInfrastructure={handleInfrastructureSelect} />
      {!isMobile && selectedInfrastructure && (
        <div className="border-l bg-card/50 backdrop-blur-sm ">
          <InfrastructureDetailPanel
            // mengambil infromasi infrastruktur
            infrastructureDetail={selectedInfrastructure}
            onClose={handleCloseDetail}
            isOpen={true}
            // onStatusUpdate={handleStatusUpdate}
          />
        </div>
      )}

      {isMobile && selectedInfrastructure && (
        <InfrastructureDetailPanel
          infrastructureDetail={selectedInfrastructure}
          onClose={handleCloseDetail}
          isOpen={true}
        />
      )}
    </div>
  );
}
