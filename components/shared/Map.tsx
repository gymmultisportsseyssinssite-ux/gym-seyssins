'use client'

import { useEffect, useRef } from 'react'
import maplibregl, { type Map as MaplibreMap } from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'

type MapProps = {
  center: [number, number]
  zoom?: number
  markerLabel?: string
  className?: string
}

export function Map({ center, zoom = 14, markerLabel = 'Salle des sports', className }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MaplibreMap | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
      },
      center,
      zoom,
      attributionControl: { compact: true },
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

    const el = document.createElement('div')
    el.setAttribute('aria-label', markerLabel)
    el.style.cssText = `
      width: 28px; height: 28px; border-radius: 9999px;
      background: var(--color-primary, #C66B4F);
      border: 3px solid #FFFFFF;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    `

    new maplibregl.Marker({ element: el }).setLngLat(center).addTo(map)

    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [center, zoom, markerLabel])

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Carte interactive de localisation"
      className={className}
    />
  )
}
