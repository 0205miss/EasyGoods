"use client";

import { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import Link from 'next/link'

export default function GetUserPage({ params }) {
  const [location,setlocation] = useState(null)
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setlocation({
          latitude,longitude
        })
      });
    }
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {location==null && <Spinner color="warning" size="lg" />}
      {location!=null && <Link href={`pi://testnet.easygoods.app/map/${location.latitude}/${location.longitude}`}>
        <Button color="secondary">Go Back Pi Browser</Button>
        </Link>}
    </div>
  );
}
