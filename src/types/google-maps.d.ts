/* Minimal types for Google Maps JavaScript API (loaded via script) */
declare global {
  const google: {
    maps: {
      Map: new (el: HTMLElement, opts?: Record<string, unknown>) => object
      Marker: new (opts?: Record<string, unknown>) => void
      Circle: new (opts: Record<string, unknown>) => void
    }
  }
}

export {}
