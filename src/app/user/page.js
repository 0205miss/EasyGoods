'use client'
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";

export default function UserPage(){
    const MapMenu = useMemo(()=>dynamic(
        () => import('@/components/map'),{
            loading:()=><p>A Map is loading</p>,
            ssr:false
        }
    ),[])
    return <div className="w-screen h-screen">
        <MapMenu/>
    </div>
}