"use client";
import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
export default function MapClientPage({ transcript, params }) {
  const MapMenu = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner color="warning" size="lg" />
          </div>
        ),
        ssr: false,
      }),
    []
  );
  return (
    <div className="w-full h-full">
      <MapMenu
        transcript={transcript}
        lang={params.lang}
        lat={params.coordinate == undefined ? null : params.coordinate[0]}
        long={params.coordinate == undefined ? null : params.coordinate[1]}
      />
    </div>
  );
}
