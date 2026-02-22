import { ImageResponse } from 'next/og'
import { BRAND } from '@/config/site'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

const ICON_STYLE = {
  width: '100%',
  height: '100%',
  display: 'flex' as const,
  alignItems: 'center',
  justifyContent: 'center',
  background: BRAND.bg,
  borderRadius: 6,
  fontSize: 20,
  fontWeight: 700,
  color: BRAND.accent,
}

export default function Icon() {
  return new ImageResponse(
    <div style={ICON_STYLE}>A</div>,
    size
  )
}
