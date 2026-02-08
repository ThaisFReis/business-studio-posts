import { useState } from 'react';
import { LAYOUT_CONFIG } from '../config/studio';
import type {
  AssetCategory,
  ContentState,
  ExportQuality,
  FontSize,
  ImageFormat,
  LayoutType,
  MediaWrapper,
  NameVariant,
  OverlayStyle,
  PostType,
  Theme,
} from '../types/studio';

export function useStudioState() {
  const [postType, setPostType] = useState<PostType>('quote');
  const [theme, setTheme] = useState<Theme>('purple');
  const [format, setFormat] = useState<ImageFormat>('post');
  const [showMedia, setShowMedia] = useState(true);
  const [showCTA, setShowCTA] = useState(true);
  const [titleFontSize, setTitleFontSize] = useState(40);
  const [bodyFontSize, setBodyFontSize] = useState(14);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [assetCategory, setAssetCategory] = useState<AssetCategory>('content');
  const [nameVariant, setNameVariant] = useState<NameVariant>('instituto karn');
  const [exportQuality, setExportQuality] = useState<ExportQuality>('high');
  const [imageOverlayOpacity, setImageOverlayOpacity] = useState(0);
  const [showGradientOverlay, setShowGradientOverlay] = useState(false);
  const [contentOffsetY, setContentOffsetY] = useState(0);
  const [contentOffsetX, setContentOffsetX] = useState(0);
  const [showSlogan, setShowSlogan] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [showName, setShowName] = useState(true);
  const [logoSize, setLogoSize] = useState<FontSize>('md');
  const [brandingNameSize, setBrandingNameSize] = useState<FontSize>('md');
  const [brandingSloganSize, setBrandingSloganSize] = useState<FontSize>('md');
  const [sloganStyle, setSloganStyle] = useState<'normal' | 'italic'>('italic');
  const [sloganColor, setSloganColor] = useState<'soft' | 'strong'>('soft');
  const [sloganLineBreak, setSloganLineBreak] = useState(true);
  const [bannerLayout, setBannerLayout] = useState<'side' | 'center'>('side');
  const [logoSide, setLogoSide] = useState<'left' | 'right'>('left');
  const [verticalAlign, setVerticalAlign] = useState<'top' | 'center' | 'bottom'>('center');
  const [profileShape, setProfileShape] = useState<'circle' | 'square'>('circle');
  const [layout, setLayout] = useState<LayoutType>('single');
  const [activeSlot, setActiveSlot] = useState(0);
  const [mediaItems, setMediaItems] = useState<MediaWrapper[]>([
    { id: '0', url: null, type: null, scale: 1, position: { x: 0, y: 0 }, opacity: 50 },
  ]);
  const [overlayStyle, setOverlayStyle] = useState<OverlayStyle>('none');

  const [content, setContent] = useState<ContentState>({
    eyebrow: 'O MÉTODO KARN',
    title: 'A educação é poder.',
    body: 'Não somos apenas um curso. Somos um ecossistema de fomento apoiado por tecnologia blockchain onde você tem voz ativa.',
    listItems: [
      'Trilha Gênese: Fundamentos Web3',
      'Pods de Estudo: Segurança Psicológica',
      'Karn Works: Renda e Projetos Reais',
      'Valocracia: Poder por Mérito',
    ],
    cta: 'Saiba mais no link da bio.',
    date: 'JAN 2026',
  });

  const updateLayout = (newLayout: LayoutType) => {
    setLayout(newLayout);
    const slots = LAYOUT_CONFIG[newLayout].slots;
    setMediaItems((prev) => {
      const newItems = [...prev];
      if (newItems.length < slots) {
        for (let i = newItems.length; i < slots; i++) {
          newItems.push({ id: i.toString(), url: null, type: null, scale: 1, position: { x: 0, y: 0 }, opacity: 50 });
        }
      }
      if (newItems.length > slots) {
        return newItems.slice(0, slots);
      }
      return newItems;
    });
    setActiveSlot(0);
  };

  const activeMedia = mediaItems[activeSlot];

  const updateActiveMedia = (updates: Partial<MediaWrapper>) => {
    setMediaItems((prev) => prev.map((item, index) => (index === activeSlot ? { ...item, ...updates } : item)));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith('video/') ? 'video' : 'image';
    setMediaItems((prev) =>
      prev.map((item, index) =>
        index === activeSlot
          ? { ...item, url, type, scale: 1, position: { x: 0, y: 0 }, opacity: 50 }
          : item,
      ),
    );
  };

  const removeMedia = () => {
    if (activeMedia.url) URL.revokeObjectURL(activeMedia.url);
    updateActiveMedia({ url: null, type: null, scale: 1, position: { x: 0, y: 0 }, opacity: 50 });
  };

  const loadPreset = (type: PostType) => {
    setPostType(type);
    if (type === 'quote') {
      setContent({
        ...content,
        eyebrow: 'MANIFESTO',
        title: 'Quebrando o Portal de Vidro.',
        body: '"Uma mulher levantada puxa a próxima. Não somos origem nem destino, somos o ponto de escolha."',
      });
    } else if (type === 'list') {
      setContent({
        ...content,
        eyebrow: 'ECOSSISTEMA',
        title: 'Como funciona?',
        body: 'Uma jornada completa de autonomia.',
        listItems: [
          'Aprenda em Pods colaborativos',
          'Ganhe experiência no Karn Works',
          'Construa reputação On-Chain',
          'Vote no futuro via Valocracia',
        ],
      });
    } else if (type === 'announcement') {
      setContent({
        ...content,
        eyebrow: 'NOVA TURMA',
        title: 'Inscrições Abertas',
        body: 'Transforme sua carreira com a Web3. Bolsas disponíveis para mulheres de toda a América Latina.',
      });
    }
  };

  const gradientClass =
    theme === 'orange' ? 'from-orange-400 to-red-500' : theme === 'mixed' ? 'from-purple-400 to-orange-400' : 'from-purple-400 to-blue-500';

  return {
    postType,
    setPostType,
    theme,
    setTheme,
    format,
    setFormat,
    showMedia,
    setShowMedia,
    showCTA,
    setShowCTA,
    titleFontSize,
    setTitleFontSize,
    bodyFontSize,
    setBodyFontSize,
    isGenerating,
    setIsGenerating,
    isRecording,
    setIsRecording,
    assetCategory,
    setAssetCategory,
    nameVariant,
    setNameVariant,
    exportQuality,
    setExportQuality,
    imageOverlayOpacity,
    setImageOverlayOpacity,
    showGradientOverlay,
    setShowGradientOverlay,
    contentOffsetY,
    setContentOffsetY,
    contentOffsetX,
    setContentOffsetX,
    showSlogan,
    setShowSlogan,
    showLogo,
    setShowLogo,
    showName,
    setShowName,
    logoSize,
    setLogoSize,
    brandingNameSize,
    setBrandingNameSize,
    brandingSloganSize,
    setBrandingSloganSize,
    sloganStyle,
    setSloganStyle,
    sloganColor,
    setSloganColor,
    sloganLineBreak,
    setSloganLineBreak,
    bannerLayout,
    setBannerLayout,
    logoSide,
    setLogoSide,
    verticalAlign,
    setVerticalAlign,
    profileShape,
    setProfileShape,
    layout,
    setLayout,
    activeSlot,
    setActiveSlot,
    mediaItems,
    setMediaItems,
    overlayStyle,
    setOverlayStyle,
    content,
    setContent,
    updateLayout,
    activeMedia,
    updateActiveMedia,
    handleFileUpload,
    removeMedia,
    loadPreset,
    gradientClass,
  };
}
