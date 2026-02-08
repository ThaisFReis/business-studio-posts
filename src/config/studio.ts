import {
  Grid2x2,
  SplitSquareHorizontal,
  SplitSquareVertical,
  Square,
} from 'lucide-react';
import type { ExportQuality, FontSize, LayoutType, NameVariant } from '../types/studio';

export const FORMAT_CONFIG = {
  post: { width: 400, height: 500, label: 'Post', ratio: '1080 x 1350' },
  story: { width: 360, height: 640, label: 'Story', ratio: '1080 x 1920' },
  square: { width: 400, height: 400, label: 'Quadrado', ratio: '1080 x 1080' },
  profile: { width: 400, height: 400, label: 'Perfil', ratio: '400 x 400' },
  banner: { width: 500, height: 166, label: 'Banner', ratio: '1500 x 500' },
} as const;

export const BRANDING_CONTENT = {
  slogan:
    'Nem origem, nem destino: somos o Ponto de Escolha. Uma nova era de governança e impacto para mulheres na LatAm.',
  nameVariants: {
    karn: 'karn',
    'karn.': 'karn.',
    'instituto karn': 'Instituto Karn',
  } as Record<NameVariant, string>,
};

export const BRANDING_TYPOGRAPHY = {
  name: {
    profile: { sm: 'text-xl', md: 'text-3xl', lg: 'text-4xl' },
    banner: { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' },
  },
  slogan: {
    profile: { sm: 'text-[8px]', md: 'text-[10px]', lg: 'text-xs' },
    banner: { sm: 'text-[7px]', md: 'text-[9px]', lg: 'text-[11px]' },
  },
} as const;

export const LOGO_SIZE_CONFIG = {
  profile: { sm: 'w-16 h-16', md: 'w-28 h-28', lg: 'w-40 h-40' },
  banner: { sm: 'w-12 h-12', md: 'w-20 h-20', lg: 'w-28 h-28' },
} as const satisfies Record<'profile' | 'banner', Record<FontSize, string>>;

export const SLOGAN_COLOR_CONFIG = {
  soft: 'text-neutral-400',
  strong: 'text-white/90',
} as const;

export const VERTICAL_ALIGN_CONFIG = {
  top: 'items-start pt-4',
  center: 'items-center',
  bottom: 'items-end pb-4',
} as const;

export const LAYOUT_CONFIG = {
  single: { label: 'Único', icon: Square, slots: 1, class: 'grid-cols-1 grid-rows-1' },
  'split-h': {
    label: 'Divisão H',
    icon: SplitSquareHorizontal,
    slots: 2,
    class: 'grid-cols-1 grid-rows-2',
  },
  'split-v': {
    label: 'Divisão V',
    icon: SplitSquareVertical,
    slots: 2,
    class: 'grid-cols-2 grid-rows-1',
  },
  'grid-2x2': { label: 'Grid 2x2', icon: Grid2x2, slots: 4, class: 'grid-cols-2 grid-rows-2' },
} as const satisfies Record<LayoutType, { label: string; icon: typeof Square; slots: number; class: string }>;

export const QUALITY_CONFIG = {
  medium: { label: 'Média', scale: 2, bitrate: 4000000, fps: 30 },
  high: { label: 'Alta', scale: 3, bitrate: 8000000, fps: 30 },
  'super-high': { label: 'Super Alta', scale: 5, bitrate: 15000000, fps: 60 },
} as const satisfies Record<ExportQuality, { label: string; scale: number; bitrate: number; fps: number }>;
