import { ImageResponse } from 'next/og'
import { BRAND } from '@/config/site'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

const APPLE_ICON_STYLE = {
  width: '100%',
  height: '100%',
  display: 'flex' as const,
  alignItems: 'center',
  justifyContent: 'center',
  background: BRAND.bg,
  borderRadius: 24,
  fontSize: 88,
  fontWeight: 700,
  color: BRAND.accent,
}

export default function AppleIcon() {
  return new ImageResponse(<div style={APPLE_ICON_STYLE}>A</div>, size)
}
