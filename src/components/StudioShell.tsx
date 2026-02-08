import { useRef, useState } from 'react';
import { domToPng } from 'modern-screenshot';
import {
  Type,
  Layout,
  Palette,
  Sparkles,
  Quote,
  List,
  RectangleVertical,
  Smartphone,
  Square,
  Layers,
  Image,
  Circle,
  PanelTop,
  Eye,
  EyeOff,
  Upload,
  X,
  Maximize,
  Move,
  Video,
  LayoutTemplate,
  Wand2,
} from 'lucide-react';
import logoKarn from '../assets/logo_karn.svg';
import ExportActions from './ExportActions';
import {
  BRANDING_CONTENT,
  BRANDING_TYPOGRAPHY,
  FORMAT_CONFIG,
  LAYOUT_CONFIG,
  LOGO_SIZE_CONFIG,
  QUALITY_CONFIG,
  SLOGAN_COLOR_CONFIG,
  VERTICAL_ALIGN_CONFIG,
} from '../config/studio';
import type {
  AssetCategory,
  BrandIdentity,
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

type StudioShellProps = {
  brandIdentity: BrandIdentity;
  onBrandIdentityChange: (updates: Partial<BrandIdentity>) => void;
};

export default function StudioShell({ brandIdentity, onBrandIdentityChange }: StudioShellProps) {
  const [postType, setPostType] = useState<PostType>('quote');
  const [theme, setTheme] = useState<Theme>('purple');
  const [format, setFormat] = useState<ImageFormat>('post');

  // Content Visibility
  const [showMedia, setShowMedia] = useState(true);
  const [showCTA, setShowCTA] = useState(true);

  // Numeric Font Sizes
  const [titleFontSize, setTitleFontSize] = useState(40);
  const [bodyFontSize, setBodyFontSize] = useState(14);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const postRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);


  // Branding states
  const [assetCategory, setAssetCategory] = useState<AssetCategory>('content');
  const [nameVariant, setNameVariant] = useState<NameVariant>('instituto karn');
  
  const [exportQuality, setExportQuality] = useState<ExportQuality>('high');
  const [imageOverlayOpacity, setImageOverlayOpacity] = useState(0); // 0-100
  const [showGradientOverlay, setShowGradientOverlay] = useState(false);
  const [contentOffsetY, setContentOffsetY] = useState(0); // +/- pixels
  const [contentOffsetX, setContentOffsetX] = useState(0); // +/- pixels

  // ... (existing code) ...

  const [showSlogan, setShowSlogan] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [showName, setShowName] = useState(true);


  const [logoSize, setLogoSize] = useState<FontSize>('md');
  const [brandingNameSize, setBrandingNameSize] = useState<FontSize>('md');
  const [brandingSloganSize, setBrandingSloganSize] = useState<FontSize>('md');

  // Slogan styling states
  const [sloganStyle, setSloganStyle] = useState<'normal' | 'italic'>('italic');
  const [sloganColor, setSloganColor] = useState<'soft' | 'strong'>('soft');
  const [sloganLineBreak, setSloganLineBreak] = useState(true);

  // Banner layout states
  const [bannerLayout, setBannerLayout] = useState<'side' | 'center'>('side');
  const [logoSide, setLogoSide] = useState<'left' | 'right'>('left');
  const [verticalAlign, setVerticalAlign] = useState<'top' | 'center' | 'bottom'>('center');

  // Profile shape state
  const [profileShape, setProfileShape] = useState<'circle' | 'square'>('circle');

  // Media state
  // Media & Layout state
  const [layout, setLayout] = useState<LayoutType>('single');
  const [activeSlot, setActiveSlot] = useState(0);
  const [mediaItems, setMediaItems] = useState<MediaWrapper[]>([
    { id: '0', url: null, type: null, scale: 1, position: { x: 0, y: 0 }, opacity: 50 }
  ]);
  
  // Helper to ensure mediaItems matches layout slots
  const updateLayout = (newLayout: LayoutType) => {
    setLayout(newLayout);
    const slots = LAYOUT_CONFIG[newLayout].slots;
    setMediaItems(prev => {
      const newItems = [...prev];
      // If we have fewer items than slots, add empty ones
      if (newItems.length < slots) {
        for (let i = newItems.length; i < slots; i++) {
          newItems.push({ id: i.toString(), url: null, type: null, scale: 1, position: { x: 0, y: 0 }, opacity: 50 });
        }
      } 
      // If we have more items, we can either keep them or trim. 
      // Let's keep them but only render the first N.
      // Or trim to keep state clean.
      if (newItems.length > slots) {
        return newItems.slice(0, slots);
      }
      return newItems;
    });
    setActiveSlot(0); // Reset selection
  };
  
  // Helper to get active media
  const activeMedia = mediaItems[activeSlot];

  // Helper to update active media
  const updateActiveMedia = (updates: Partial<MediaWrapper>) => {
    setMediaItems(prev => prev.map((item, index) => 
      index === activeSlot ? { ...item, ...updates } : item
    ));
  };

  // Overlay state
  const [overlayStyle, setOverlayStyle] = useState<OverlayStyle>('none');

  const brandContent = {
    slogan: brandIdentity.slogan || BRANDING_CONTENT.slogan,
    nameVariants: {
      karn: brandIdentity.shortName || BRANDING_CONTENT.nameVariants.karn,
      'karn.': brandIdentity.shortNameWithDot || BRANDING_CONTENT.nameVariants['karn.'],
      'instituto karn': brandIdentity.fullName || BRANDING_CONTENT.nameVariants['instituto karn'],
    } as Record<NameVariant, string>,
  };
  const logoSrc = brandIdentity.logoUrl || logoKarn;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const type = file.type.startsWith('video/') ? 'video' : 'image';

    setMediaItems(prev => prev.map((item, index) => {
        if (index === activeSlot) {
            return {
                ...item,
                url,
                type,
                scale: 1,
                position: { x: 0, y: 0 },
                opacity: 50,
            };
        }
        return item;
    }));
  };

  const removeMedia = () => {
    if (activeMedia.url) URL.revokeObjectURL(activeMedia.url);
    updateActiveMedia({
      url: null,
      type: null,
      scale: 1,
      position: { x: 0, y: 0 },
      opacity: 50,
    });
  };

  const { width: postWidth, height: postHeight, ratio: postRatio } = FORMAT_CONFIG[format];
  
  // Legacy class definitions removed in favor of inline styles
  const ctaPaddingClass = 'px-6 py-2'; // Default padding

  const [content, setContent] = useState<ContentState>({
    eyebrow: 'O MÉTODO KARN',
    title: 'A educação é poder.',
    body: 'Não somos apenas um curso. Somos um ecossistema de fomento apoiado por tecnologia blockchain onde você tem voz ativa.',
    listItems: [
      'Trilha Gênese: Fundamentos Web3',
      'Pods de Estudo: Segurança Psicológica',
      'Karn Works: Renda e Projetos Reais',
      'Valocracia: Poder por Mérito'
    ],
    cta: 'Saiba mais no link da bio.',
    date: 'JAN 2026'
  });



  const handleDownload = async () => {
    const element = postRef.current;
    if (!element) return;

    setIsGenerating(true);

    try {
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 500));

      const isCircular = format === 'profile' && profileShape === 'circle';
      const prefix = assetCategory === 'branding' ? 'karn-brand' : 'karn';
      const qualityConfig = QUALITY_CONFIG[exportQuality];

      const dataUrl = await domToPng(element, {
        scale: qualityConfig.scale,
        backgroundColor: '#0e100f',
        style: {
          transform: 'scale(1)',
          borderRadius: isCircular ? '50%' : '0',
        },
      });

      const link = document.createElement('a');
      link.download = `${prefix}-${format}-${theme}-${exportQuality}-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Erro ao gerar imagem:', err);
      alert('Não foi possível gerar a imagem automaticamente. Por favor, tire um print da tela.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVideoDownload = async () => {
    // Check if we have any video
    const hasVideo = mediaItems.some(m => m.type === 'video' && m.url);
    if (!hasVideo || !postRef.current || !overlayRef.current) return;
    
    setIsRecording(true);
    
    try {
      // 1. Capture Overlay
      const overlayDataUrl = await domToPng(overlayRef.current, {
        scale: 2,
        backgroundColor: 'transparent',
        style: { transform: 'scale(1)' }
      });
      const overlayImg = new window.Image();
      overlayImg.src = overlayDataUrl;
      await new Promise((resolve) => { overlayImg.onload = resolve; });

      // 2. Setup Canvas
      const canvas = document.createElement('canvas');
      const [wStr, hStr] = postRatio.replace(' px', '').split(' x ');
      const canvasWidth = parseInt(wStr);
      const canvasHeight = parseInt(hStr);
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No canvas context');

      const qualityConfig = QUALITY_CONFIG[exportQuality];

      // 3. Setup Recorder
      const stream = canvas.captureStream(qualityConfig.fps);
      const chunks: Blob[] = [];

      // Helper to find supported mime type
      const getSupportedMimeType = () => {
        const types = [
          'video/webm;codecs=vp9',
          'video/webm;codecs=vp8',
          'video/webm',
          'video/mp4'
        ];
        return types.find(t => MediaRecorder.isTypeSupported(t)) || '';
      };

      const mimeType = getSupportedMimeType();
      if (!mimeType) {
        alert('Seu navegador não suporta gravação de vídeo.');
        setIsRecording(false);
        return;
      }

      const recorder = new MediaRecorder(stream, { 
        mimeType,
        videoBitsPerSecond: qualityConfig.bitrate 
      });
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType }); // use determined mime type
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // extension based on mime
        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
        a.download = `karn-collage-${format}-${exportQuality}-${Date.now()}.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
      };

      // 4. Play and Record
      const videoElements = document.querySelectorAll('video[data-collage-video]');
      videoElements.forEach((v: any) => { v.currentTime = 0; v.play(); });
      
      recorder.start();
      const duration = 15000;
      const startTime = Date.now();

      // Helper to get slot rect relative to post container
      const getSlotRect = (index: number) => {
        const postRect = postRef.current!.getBoundingClientRect();
        const slotEl = postRef.current!.querySelector(`div[data-slot-index="${index}"]`);
        if (!slotEl) return null;
        const slotRect = slotEl.getBoundingClientRect();
        
        // Calculate relative position and scale to canvas size
        const scaleX = canvasWidth / postRect.width;
        const scaleY = canvasHeight / postRect.height;
        
        return {
          x: (slotRect.left - postRect.left) * scaleX,
          y: (slotRect.top - postRect.top) * scaleY,
          w: slotRect.width * scaleX,
          h: slotRect.height * scaleY
        };
      };

      const drawFrame = () => {
        if (Date.now() - startTime > duration) {
            recorder.stop();
            return;
        }

        // Draw Background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Draw Grid Items
        mediaItems.forEach((item, index) => {
          if (!item.url) return;
          
          const rect = getSlotRect(index);
          if (!rect) return;

          ctx.save();
          // Clip to slot area
          ctx.beginPath();
          ctx.rect(rect.x, rect.y, rect.w, rect.h);
          ctx.clip();

          // Determine source element and dimensions
          let sourceEl: HTMLVideoElement | HTMLImageElement | null = null;
          let sourceW = 0;
          let sourceH = 0;

          const slotEl = postRef.current!.querySelector(`div[data-slot-index="${index}"]`);
          
          if (item.type === 'video') {
             const vEl = slotEl?.querySelector('video');
             if (vEl && vEl.readyState >= 2) { // HAVE_CURRENT_DATA
               sourceEl = vEl;
               sourceW = vEl.videoWidth;
               sourceH = vEl.videoHeight;
             }
          } else if (item.type === 'image') {
             const imgEl = slotEl?.querySelector('img');
             if (imgEl && imgEl.complete) {
               sourceEl = imgEl;
               sourceW = imgEl.naturalWidth;
               sourceH = imgEl.naturalHeight;
             }
          }

          if (sourceEl && sourceW && sourceH) {
             // Calculate "object-cover" scale
             const scaleW = rect.w / sourceW;
             const scaleH = rect.h / sourceH;
             const coverScale = Math.max(scaleW, scaleH);
             
             // Final scale with user adjustment
             const finalScale = coverScale * item.scale;

             // Calculate translation
             // We translate to the center of the slot
             // Then apply user position. User position is in CSS pixels (e.g. from UI slider).
             // We need to scale user position pixels to Canvas pixels.
             const uiScaleFactor = canvasWidth / FORMAT_CONFIG[format].width;

             ctx.translate(rect.x + rect.w / 2, rect.y + rect.h / 2);
             ctx.translate(item.position.x * uiScaleFactor, item.position.y * uiScaleFactor);
             ctx.scale(finalScale, finalScale);

             // Draw centered relative to the new origin
             // Draw full resolution source
             try {
                ctx.drawImage(sourceEl, -sourceW / 2, -sourceH / 2, sourceW, sourceH);
             } catch(e) {
                // ignore
             }
          }

          ctx.restore();
        });

        // Draw Overlay
        ctx.drawImage(overlayImg, 0, 0, canvasWidth, canvasHeight);
        requestAnimationFrame(drawFrame);
      };
      
      requestAnimationFrame(drawFrame);

    } catch (err) {
      console.error(err);
      setIsRecording(false);
    }
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
          'Vote no futuro via Valocracia'
        ]
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

  const gradientClass = theme === 'orange'
    ? 'from-orange-400 to-red-500'
    : theme === 'mixed'
      ? 'from-purple-400 to-orange-400'
      : 'from-purple-400 to-blue-500';

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 flex flex-col md:flex-row">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Lora', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* --- LEFT SIDE: CONTROLS --- */}
      <div className="w-full md:w-[450px] bg-[#0e100f] border-r border-white/5 p-6 overflow-y-auto h-screen sticky top-0">
        <div className="mb-8 flex items-center gap-2 text-2xl font-bold font-serif tracking-tighter">
          {brandIdentity.studioTitle}<span className="text-purple-500">.</span>
        </div>

        {/* Category Selector */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
            <Layers size={14} /> Categoria
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setAssetCategory('content'); setFormat('post'); }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${assetCategory === 'content' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}
            >
              <Layout size={20} /> <span className="text-xs font-medium">Conteúdo</span>
            </button>
            <button
              onClick={() => { setAssetCategory('branding'); setFormat('profile'); }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${assetCategory === 'branding' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}
            >
              <Image size={20} /> <span className="text-xs font-medium">Identidade</span>
            </button>
          </div>
        </div>

        {/* Visual Effects Control */}
        <div className="mb-8">
           <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
             <Wand2 size={14} /> Efeitos Visuais
           </h3>
           <div className="space-y-4 p-3 bg-white/5 rounded-lg border border-white/10">
              {/* Darken Image */}
              <div className="space-y-1">
                 <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>Escurecer Imagem</span>
                    <span>{imageOverlayOpacity}%</span>
                 </div>
                 <input 
                    type="range" 
                    min="0" 
                    max="90" 
                    step="5" 
                    value={imageOverlayOpacity} 
                    onChange={(e) => setImageOverlayOpacity(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                 />
              </div>

              {/* Content Position Y */}
              <div className="space-y-1">
                 <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>Posição do Texto (Vertical)</span>
                    <span>{contentOffsetY}px</span>
                 </div>
                 <input 
                    type="range" 
                    min="-300" 
                    max="300" 
                    step="10" 
                    value={contentOffsetY} 
                    onChange={(e) => setContentOffsetY(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                 />
              </div>

              {/* Content Position X */}
              <div className="space-y-1">
                 <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>Posição do Texto (Horizontal)</span>
                    <span>{contentOffsetX}px</span>
                 </div>
                 <input 
                    type="range" 
                    min="-300" 
                    max="300" 
                    step="10" 
                    value={contentOffsetX} 
                    onChange={(e) => setContentOffsetX(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                 />
              </div>

              {/* Gradient Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                 <span className="text-[10px] text-neutral-400">Gradiente Topo/Base</span>
                 <button
                    onClick={() => setShowGradientOverlay(!showGradientOverlay)}
                    className={`relative w-10 h-5 rounded-full transition-all ${showGradientOverlay ? 'bg-purple-500' : 'bg-white/10'}`}
                 >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${showGradientOverlay ? 'left-5' : 'left-0.5'}`}></div>
                 </button>
              </div>
           </div>
        </div>

        {/* Typography Controls */}
        <div className="mb-8">
           <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
             <Type size={14} /> Tipografia & Visibilidade
           </h3>
           <div className="space-y-4 p-3 bg-white/5 rounded-lg border border-white/10">
              
              {/* Toggles */}
              <div className="flex gap-4">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${showMedia ? 'bg-purple-500' : 'bg-white/10'}`}>
                       <div className={`w-3 h-3 rounded-full bg-white shadow transition-transform ${showMedia ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                    <input type="checkbox" checked={showMedia} onChange={(e) => setShowMedia(e.target.checked)} className="hidden" />
                    <span className="text-[10px] text-neutral-400">Fundo/Mídia</span>
                 </label>
              </div>

              {/* Font Size Sliders */}
              <div className="space-y-1">
                 <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>Tamanho do Título</span>
                    <span>{titleFontSize}px</span>
                 </div>
                 <input 
                    type="range" 
                    min="12" 
                    max="120" 
                    step="1" 
                    value={titleFontSize} 
                    onChange={(e) => setTitleFontSize(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                 />
              </div>

              <div className="space-y-1">
                 <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>Tamanho do Texto</span>
                    <span>{bodyFontSize}px</span>
                 </div>
                 <input 
                    type="range" 
                    min="10" 
                    max="60" 
                    step="1" 
                    value={bodyFontSize} 
                    onChange={(e) => setBodyFontSize(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                 />
              </div>

           </div>
        </div>

        {/* Layout Control */}
        <div className="mb-8">
           <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
             <Layout size={14} /> Layout (Collage)
           </h3>
           <div className="grid grid-cols-3 gap-2">
             {(Object.entries(LAYOUT_CONFIG) as [LayoutType, any][]).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => updateLayout(key)}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${layout === key ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}
                  >
                    <Icon size={18} />
                    <span className="text-[10px]">{config.label}</span>
                  </button>
                );
             })}
           </div>
        </div>

        {/* Media Control for Active Slot */}
        {showMedia && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xs uppercase tracking-widest text-neutral-500 flex items-center gap-2">
               <Video size={14} /> Mídia <span className="text-purple-400 text-[10px]">(Slot {activeSlot + 1})</span>
             </h3>
             {/* Slot Selector Mini */}
             <div className="flex gap-1">
               {mediaItems.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveSlot(i)}
                    className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold transition-all ${activeSlot === i ? 'bg-purple-500 text-white' : 'bg-white/10 text-neutral-400'}`}
                  >
                    {i + 1}
                  </button>
               ))}
             </div>
          </div>
          
          {!activeMedia?.url ? (
             <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-neutral-400 mb-3 group-hover:text-purple-400 transition-colors" />
                    <p className="mb-2 text-xs text-neutral-400"><span className="font-semibold text-white">Adicionar no Slot {activeSlot+1}</span></p>
                    <p className="text-[10px] text-neutral-500">Imagem ou Vídeo</p>
                </div>
                <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileUpload} />
             </label>
          ) : (
            <div className="space-y-4">
               {/* Media Preview & Actions */}
               <div className="relative w-full h-24 bg-black/40 rounded-lg overflow-hidden border border-white/10 group">
                  {activeMedia.type === 'video' ? (
                     <video src={activeMedia.url!} className="w-full h-full object-cover opacity-50" />
                  ) : (
                     <img src={activeMedia.url!} alt="Preview" className="w-full h-full object-cover opacity-50" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center gap-2">
                     <label className="p-2 bg-white/10 rounded-full hover:bg-white/20 cursor-pointer transition-all">
                        <Upload size={14} />
                        <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileUpload} />
                     </label>
                     <button onClick={removeMedia} className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all">
                        <X size={14} />
                     </button>
                  </div>
               </div>

               {/* Controls for Active Media */}
               <div className="space-y-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  {/* Scale */}
                  <div className="space-y-1">
                     <div className="flex justify-between text-[10px] text-neutral-400">
                        <span className="flex items-center gap-1"><Maximize size={10} /> Escala</span>
                        <span>{activeMedia.scale}x</span>
                     </div>
                     <input 
                        type="range" 
                        min="0.5" 
                        max="3" 
                        step="0.1" 
                        value={activeMedia.scale} 
                        onChange={(e) => updateActiveMedia({scale: parseFloat(e.target.value)})}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                     />
                  </div>
                  
                  {/* Opacity */}
                  <div className="space-y-1">
                     <div className="flex justify-between text-[10px] text-neutral-400">
                        <span className="flex items-center gap-1"><Eye size={10} /> Opacidade</span>
                        <span>{activeMedia.opacity}%</span>
                     </div>
                     <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="5" 
                        value={activeMedia.opacity} 
                        onChange={(e) => updateActiveMedia({opacity: parseInt(e.target.value)})}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                     />
                  </div>

                  {/* Position X */}
                   <div className="space-y-1">
                     <div className="flex justify-between text-[10px] text-neutral-400">
                        <span className="flex items-center gap-1"><Move size={10} /> Posição X</span>
                        <span>{activeMedia.position.x}px</span>
                     </div>
                     <input 
                        type="range" 
                        min="-200" 
                        max="200" 
                        step="10" 
                        value={activeMedia.position.x} 
                        onChange={(e) => updateActiveMedia({position: {...activeMedia.position, x: parseInt(e.target.value)}})}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                     />
                  </div>
                  
                   {/* Position Y */}
                   <div className="space-y-1">
                     <div className="flex justify-between text-[10px] text-neutral-400">
                        <span className="flex items-center gap-1"><Move size={10} className="rotate-90" /> Posição Y</span>
                        <span>{activeMedia.position.y}px</span>
                     </div>
                     <input 
                        type="range" 
                        min="-200" 
                        max="200" 
                        step="10" 
                        value={activeMedia.position.y} 
                        onChange={(e) => updateActiveMedia({position: {...activeMedia.position, y: parseInt(e.target.value)}})}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                     />
                  </div>
               </div>
            </div>
          )}
        </div>
        )}

        {/* Templates - Only for Content */}
        {assetCategory === 'content' && (
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
            <Layout size={14} /> Templates
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => loadPreset('quote')} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${postType === 'quote' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
              <Quote size={20} /> <span className="text-xs font-medium">Citação</span>
            </button>
            <button onClick={() => loadPreset('list')} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${postType === 'list' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
              <List size={20} /> <span className="text-xs font-medium">Lista</span>
            </button>
            <button onClick={() => loadPreset('announcement')} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${postType === 'announcement' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
              <Sparkles size={20} /> <span className="text-xs font-medium">Anúncio</span>
            </button>
          </div>
        </div>
        )}

        {/* Format */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
            <RectangleVertical size={14} /> Formato
          </h3>
          {assetCategory === 'content' ? (
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setFormat('post')} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${format === 'post' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
                <RectangleVertical size={20} /> <span className="text-xs font-medium">Post</span>
              </button>
              <button onClick={() => setFormat('story')} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${format === 'story' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
                <Smartphone size={20} /> <span className="text-xs font-medium">Story</span>
              </button>
              <button onClick={() => setFormat('square')} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${format === 'square' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
                <Square size={20} /> <span className="text-xs font-medium">Quadrado</span>
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setFormat('profile')} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${format === 'profile' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
                  <Circle size={20} /> <span className="text-xs font-medium">Perfil</span>
                </button>
                <button onClick={() => setFormat('banner')} className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${format === 'banner' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-transparent text-neutral-400 hover:bg-white/10'}`}>
                  <PanelTop size={20} /> <span className="text-xs font-medium">Banner</span>
                </button>
              </div>
              {format === 'profile' && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span className="text-[10px] text-neutral-500">Forma do Perfil</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setProfileShape('circle')}
                      className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${profileShape === 'circle' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                    >
                      Circular
                    </button>
                    <button
                      onClick={() => setProfileShape('square')}
                      className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${profileShape === 'square' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                    >
                      Quadrado
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Theme */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
            <Palette size={14} /> Cores & Vibe
          </h3>
          <div className="flex gap-3">
             <button onClick={() => setTheme('purple')} className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 text-xs font-medium transition-all ${theme === 'purple' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400'}`}>
               <div className="w-2 h-2 rounded-full bg-purple-500"></div> Karn Purple
             </button>
             <button onClick={() => setTheme('orange')} className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 text-xs font-medium transition-all ${theme === 'orange' ? 'border-orange-500 bg-orange-500/10 text-orange-300' : 'border-white/10 bg-white/5 text-neutral-400'}`}>
               <div className="w-2 h-2 rounded-full bg-orange-500"></div> Fire Orange
             </button>
             <button onClick={() => setTheme('mixed')} className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 text-xs font-medium transition-all ${theme === 'mixed' ? 'border-white bg-white/10 text-white' : 'border-white/10 bg-white/5 text-neutral-400'}`}>
               <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-orange-500"></div> Mix
             </button>
          </div>
        </div>

        {/* Slide Overlay - Header & Footer Options */}
        <div className="mb-8">
           <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
            <LayoutTemplate size={14} /> Cabeçalho & Rodapé
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
             <button onClick={() => setOverlayStyle('none')} className={`p-2 rounded-lg border text-xs font-medium transition-all ${overlayStyle === 'none' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-neutral-400'}`}>
                Nenhum
             </button>
             <button onClick={() => setOverlayStyle('classic')} className={`p-2 rounded-lg border text-xs font-medium transition-all ${overlayStyle === 'classic' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-neutral-400'}`}>
                Clássico
             </button>
             <button onClick={() => setOverlayStyle('modern')} className={`p-2 rounded-lg border text-xs font-medium transition-all ${overlayStyle === 'modern' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-neutral-400'}`}>
                Moderno
             </button>
             <button onClick={() => setOverlayStyle('bold')} className={`p-2 rounded-lg border text-xs font-medium transition-all ${overlayStyle === 'bold' ? 'bg-purple-900/20 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-neutral-400'}`}>
                Bold
             </button>
          </div>
          
          {overlayStyle !== 'none' && (
            <div className="space-y-3 p-3 bg-white/5 rounded-lg border border-white/10">
               <div className="space-y-1">
                 <label className="text-[10px] uppercase text-neutral-500 font-bold ml-1">Texto Rodapé Esquerda</label>
                 <input
                   type="text"
                   value={brandIdentity.footerText}
                   onChange={(e) => onBrandIdentityChange({ footerText: e.target.value })}
                   className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs focus:outline-none focus:border-purple-500 transition-colors"
                 />
               </div>
            </div>
          )}
        </div>

        {/* Branding Controls - Only for Branding Category */}
        {assetCategory === 'branding' && (
          <div className="mb-8 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
              <Sparkles size={14} /> Personalização
            </h3>

            {/* Logo Section */}
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={logoSrc} alt="Logo" className="w-6 h-6" />
                  <span className="text-sm text-neutral-300">Logo</span>
                </div>
                <button
                  onClick={() => setShowLogo(!showLogo)}
                  className={`p-2 rounded-lg transition-all ${showLogo ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-neutral-500'}`}
                >
                  {showLogo ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              {showLogo && (
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] text-neutral-500">Tamanho</span>
                  <div className="flex gap-1">
                    {(['sm', 'md', 'lg'] as FontSize[]).map((size) => (
                      <button
                        key={size}
                        onClick={() => setLogoSize(size)}
                        className={`w-7 h-7 rounded-lg border text-[10px] font-medium transition-all ${logoSize === size ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                      >
                        {size === 'sm' ? 'P' : size === 'md' ? 'M' : 'G'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Name Section */}
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Nome</span>
                <button
                  onClick={() => setShowName(!showName)}
                  className={`p-2 rounded-lg transition-all ${showName ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-neutral-500'}`}
                >
                  {showName ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              {showName && (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    {(['karn', 'karn.', 'instituto karn'] as NameVariant[]).map((variant) => (
                      <button
                        key={variant}
                        onClick={() => setNameVariant(variant)}
                        className={`p-2 rounded-lg border text-xs font-medium transition-all ${nameVariant === variant ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                      >
                        {brandContent.nameVariants[variant]}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[10px] text-neutral-500">Tamanho</span>
                    <div className="flex gap-1">
                      {(['sm', 'md', 'lg'] as FontSize[]).map((size) => (
                        <button
                          key={size}
                          onClick={() => setBrandingNameSize(size)}
                          className={`w-7 h-7 rounded-lg border text-[10px] font-medium transition-all ${brandingNameSize === size ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                        >
                          {size === 'sm' ? 'P' : size === 'md' ? 'M' : 'G'}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Slogan Section */}
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-300">Slogan</span>
                  <span className="text-[10px] text-neutral-500 mt-1 max-w-[200px] truncate">
                    "{brandContent.slogan.substring(0, 30)}..."
                  </span>
                </div>
                <button
                  onClick={() => setShowSlogan(!showSlogan)}
                  className={`p-2 rounded-lg transition-all ${showSlogan ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-neutral-500'}`}
                >
                  {showSlogan ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              {showSlogan && (
                <div className="space-y-3 pt-2 border-t border-white/5">
                  {/* Tamanho */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500">Tamanho</span>
                    <div className="flex gap-1">
                      {(['sm', 'md', 'lg'] as FontSize[]).map((size) => (
                        <button
                          key={size}
                          onClick={() => setBrandingSloganSize(size)}
                          className={`w-7 h-7 rounded-lg border text-[10px] font-medium transition-all ${brandingSloganSize === size ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                        >
                          {size === 'sm' ? 'P' : size === 'md' ? 'M' : 'G'}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Estilo */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500">Estilo</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setSloganStyle('normal')}
                        className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${sloganStyle === 'normal' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                      >
                        Normal
                      </button>
                      <button
                        onClick={() => setSloganStyle('italic')}
                        className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all italic ${sloganStyle === 'italic' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                      >
                        Itálico
                      </button>
                    </div>
                  </div>
                  {/* Cor */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500">Cor</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setSloganColor('soft')}
                        className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${sloganColor === 'soft' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                      >
                        Suave
                      </button>
                      <button
                        onClick={() => setSloganColor('strong')}
                        className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${sloganColor === 'strong' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                      >
                        Forte
                      </button>
                    </div>
                  </div>
                  {/* Quebra de Linha */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500">Quebra de linha</span>
                    <button
                      onClick={() => setSloganLineBreak(!sloganLineBreak)}
                      className={`relative w-10 h-5 rounded-full transition-all ${sloganLineBreak ? 'bg-purple-500' : 'bg-white/10'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${sloganLineBreak ? 'left-5' : 'left-0.5'}`}></div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Banner Layout - Only for Banner */}
            {format === 'banner' && (
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-3">
                <span className="text-sm text-neutral-300">Layout do Banner</span>

                {/* Layout Horizontal */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] text-neutral-500">Horizontal</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setBannerLayout('side')}
                      className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${bannerLayout === 'side' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                    >
                      Lado
                    </button>
                    <button
                      onClick={() => setBannerLayout('center')}
                      className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${bannerLayout === 'center' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                    >
                      Centro
                    </button>
                  </div>
                </div>

                {/* Lado da Logo - only when layout = side AND showLogo */}
                {bannerLayout === 'side' && showLogo && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500">Lado da Logo</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setLogoSide('left')}
                        className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${logoSide === 'left' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                      >
                        Esquerda
                      </button>
                      <button
                        onClick={() => setLogoSide('right')}
                        className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${logoSide === 'right' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                      >
                        Direita
                      </button>
                    </div>
                  </div>
                )}

                {/* Alinhamento Vertical */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500">Vertical</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setVerticalAlign('top')}
                      className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${verticalAlign === 'top' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                    >
                      Cima
                    </button>
                    <button
                      onClick={() => setVerticalAlign('center')}
                      className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${verticalAlign === 'center' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                    >
                      Centro
                    </button>
                    <button
                      onClick={() => setVerticalAlign('bottom')}
                      className={`px-3 h-7 rounded-lg border text-[10px] font-medium transition-all ${verticalAlign === 'bottom' ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                    >
                      Baixo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Inputs - Only for Content */}
        {assetCategory === 'content' && (
        <div className="mb-8 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-2">
            <Type size={14} /> Conteúdo
          </h3>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-neutral-500 font-bold ml-1">Eyebrow</label>
            <input type="text" value={content.eyebrow} onChange={(e) => setContent({...content, eyebrow: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500 transition-colors font-sans tracking-wide" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-neutral-500 font-bold ml-1">Título</label>
            <textarea rows={2} value={content.title} onChange={(e) => setContent({...content, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-lg font-serif focus:outline-none focus:border-purple-500 transition-colors resize-none" />
          </div>
          {postType === 'list' ? (
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-neutral-500 font-bold ml-1">Itens da Lista</label>
              {content.listItems.map((item, idx) => (
                <input key={idx} type="text" value={item} onChange={(e) => {
                    const newItems = [...content.listItems];
                    newItems[idx] = e.target.value;
                    setContent({...content, listItems: newItems});
                  }} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-neutral-500 font-bold ml-1">Corpo</label>
              <textarea rows={4} value={content.body} onChange={(e) => setContent({...content, body: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm font-sans focus:outline-none focus:border-purple-500 transition-colors resize-none leading-relaxed" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 pt-2">
             <div className="space-y-1">
              <label className="text-[10px] uppercase text-neutral-500 font-bold ml-1 flex justify-between items-center">
                 <span>{postType === 'announcement' ? 'Botão' : 'CTA'}</span>
                 {postType === 'announcement' && (
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input type="checkbox" checked={showCTA} onChange={(e) => setShowCTA(e.target.checked)} className="hidden" />
                       <div className={`w-6 h-3 rounded-full p-0.5 transition-colors ${showCTA ? 'bg-purple-500' : 'bg-white/10'}`}>
                          <div className={`w-2 h-2 rounded-full bg-white shadow transition-transform ${showCTA ? 'translate-x-3' : 'translate-x-0'}`}></div>
                       </div>
                    </label>
                 )}
              </label>
              <input type="text" value={content.cta} onChange={(e) => setContent({...content, cta: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-neutral-500 font-bold ml-1">Data</label>
              <input type="text" value={content.date} onChange={(e) => setContent({...content, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs font-mono focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
          </div>
        </div>
        )}

        <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg text-xs text-purple-200 leading-relaxed">
          <strong>Pronto:</strong> Clique em salvar imagem para baixar um PNG em alta qualidade ({postRatio}px).
        </div>
      </div>

      {/* --- RIGHT SIDE: PREVIEW --- */}
      <div className="flex-1 bg-black/50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/30 via-black to-black -z-10"></div>
        <div className="flex items-center gap-4 mb-6">
           <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest">Studio Mode</span>
           <div className="h-px w-20 bg-neutral-800"></div>
           <span className="text-neutral-300 text-xs font-mono">{postRatio} px</span>
        </div>

        {/* The Post Render */}
        <div className={`scale-[0.8] md:scale-100 transition-transform duration-500 ring-1 ring-white/10 shadow-[0_0_100px_rgba(168,85,247,0.1)] ${format === 'profile' && profileShape === 'circle' ? 'rounded-full' : ''}`}>
          <div
            ref={postRef}
            className={`relative bg-[#0e100f] overflow-hidden shadow-2xl flex flex-col justify-between text-white select-none transition-all duration-300 ${format === 'profile' && profileShape === 'circle' ? 'rounded-full' : ''} ${assetCategory === 'branding' ? 'p-0' : 'p-8'}`}
            style={{ width: `${postWidth}px`, height: `${postHeight}px`, boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}
          >
            {/* Effects */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-40 mix-blend-screen ${theme === 'orange' ? 'bg-orange-600' : 'bg-purple-600'}`} style={{ transform: 'translate(30%, -30%)' }}></div>
            <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[90px] opacity-30 mix-blend-screen ${theme === 'orange' ? 'bg-purple-900' : 'bg-orange-900'}`} style={{ transform: 'translate(-30%, 30%)' }}></div>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                        {/* User Media Layer - GRID */}
            {/* User Media Layer - GRID */}
            {showMedia && (
            <div className={`absolute inset-0 z-0 grid ${LAYOUT_CONFIG[layout].class} w-full h-full`}>
               {mediaItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    data-slot-index={index}
                    className={`relative overflow-hidden w-full h-full group ${activeSlot === index ? 'ring-2 ring-purple-500 z-10' : 'border border-white/5'}`}
                    onClick={() => setActiveSlot(index)}
                  >
                     {/* Empty Slot Placeholder if no URL */}
                     {!item.url && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-white/20 hover:bg-white/10 transition-colors cursor-pointer">
                           <span className="text-xs font-mono">{index + 1}</span>
                        </div>
                     )}

                     {item.url && (
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                           {item.type === 'video' ? (
                                <video 
                                  key={item.url} // force re-render on url change
                                  src={item.url} 
                                  autoPlay 
                                  loop 
                                  muted 
                                  playsInline
                                  data-collage-video="true"
                                  className="max-w-none min-w-full min-h-full object-cover"
                                  style={{ 
                                     transform: `scale(${item.scale}) translate(${item.position.x}px, ${item.position.y}px)`,
                                     opacity: item.opacity / 100
                                  }}
                                />
                           ) : (
                                <img 
                                  src={item.url} 
                                  alt={`Media ${index}`}
                                  className="max-w-none min-w-full min-h-full object-cover"
                                  style={{ 
                                     transform: `scale(${item.scale}) translate(${item.position.x}px, ${item.position.y}px)`,
                                     opacity: item.opacity / 100
                                  }}
                                />
                           )}
                        </div>
                     )}
                  </div>
               ))}
            </div>
            )}

            {/* GLOBAL DARK OVERLAY */}
            <div 
               className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
               style={{ backgroundColor: '#000', opacity: imageOverlayOpacity / 100 }}
            ></div>

            {/* GRADIENT OVERLAYS */}
            {showGradientOverlay && (
               <>
                  <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-0 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent z-0 pointer-events-none"></div>
               </>
            )}

            {/* FOREGROUND WRAPPER for Video Export */}
            <div ref={overlayRef} className="absolute inset-0 z-10 w-full h-full flex flex-col">
            {/* SLIDE OVERLAY LAYERS */}
            {overlayStyle === 'classic' && (
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 pointer-events-none">
                {/* Header Classic */}
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${theme === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}></span>
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase opacity-90 text-white shadow-black drop-shadow-md">{content.eyebrow || 'INSTITUTO KARN'}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <img src={logoSrc} alt="Logo" className="w-4 h-4 opacity-80" />
                      <span className="font-serif italic text-xs opacity-80 text-white shadow-black drop-shadow-md">{brandIdentity.shortNameWithDot || 'brand.'}</span>
                   </div>
                </div>
                {/* Footer Classic */}
                <div className="flex justify-between items-end border-t border-white/20 pt-4">
                    <span className="font-sans text-[10px] uppercase tracking-wider opacity-80 text-white">{brandIdentity.footerText}</span>
                    <span className="font-mono text-[10px] opacity-80 text-white">{content.date}</span>
                </div>
              </div>
            )}

            {overlayStyle === 'modern' && (
              <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none">
                 {/* Header Modern (Floating Pill) */}
                 <div className="p-6 flex justify-end">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                       <span className={`w-1.5 h-1.5 rounded-full ${theme === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}></span>
                       <span className="font-sans text-[9px] tracking-widest uppercase text-white">{content.eyebrow || 'KARN'}</span>
                    </div>
                 </div>
                 {/* Footer Modern (Gradient Bar) */}
                 <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <img src={logoSrc} alt="Logo" className="w-5 h-5" />
                           <div className="h-3 w-px bg-white/20"></div>
                           <span className="font-serif italic text-xs text-white/90">{brandIdentity.footerText}</span>
                        </div>
                        <span className="font-mono text-[10px] text-white/60">{content.date}</span>
                     </div>
                 </div>
              </div>
            )}

            {overlayStyle === 'footer-modern' && (
              <div className="absolute inset-0 z-20 flex flex-col justify-end pointer-events-none">
                 {/* Footer Modern (Gradient Bar) - Only Footer */}
                 <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <img src={logoSrc} alt="Logo" className="w-5 h-5" />
                           <div className="h-3 w-px bg-white/20"></div>
                           <span className="font-serif italic text-xs text-white/90">{brandIdentity.footerText}</span>
                        </div>
                        <span className="font-mono text-[10px] text-white/60">{content.date}</span>
                     </div>
                 </div>
              </div>
            )}

            {overlayStyle === 'bold' && (
              <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none">
                 {/* Header Bold */}
                 <div className={`p-6 ${theme === 'orange' ? 'bg-orange-600' : 'bg-purple-900'} text-white`}>
                    <div className="flex justify-between items-center">
                       <span className="font-sans text-xs font-bold tracking-widest uppercase">{content.eyebrow || 'INSTITUTO KARN'}</span>
                       <img src={logoSrc} alt="Logo" className="w-5 h-5 brightness-200" />
                    </div>
                 </div>
                 {/* Spacer to push content */}
                 <div className="flex-1"></div>
                 {/* Footer Bold */}
                 <div className="p-4 bg-black text-white flex justify-between items-center border-t border-white/10">
                     <div className="flex items-center gap-2">
                        <div className={`w-2 h-8 ${theme === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}></div>
                        <span className="font-sans text-[10px] uppercase tracking-wider">{brandIdentity.footerText}</span>
                     </div>
                     <span className="font-mono text-xs">{content.date}</span>
                 </div>
              </div>
            )}

            {/* Content Posts */}
            {assetCategory === 'content' && (
              <>
                {/* Header - Only show if no overlay is selected */}
                {overlayStyle === 'none' && (
                  <div className="relative z-10 flex flex-col items-center w-full pt-8 px-8 text-center gap-2">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase opacity-70">{content.eyebrow}</span>
                    <span className="font-serif italic text-xs opacity-50">{brandIdentity.shortNameWithDot || 'brand.'}</span>
                  </div>
                )}

                {/* Content Container - Apply OffsetY and OffsetX */}
                <div 
                   className={`relative z-10 flex-grow flex flex-col ${overlayStyle === 'none' ? 'justify-start pt-10' : 'justify-center'} my-6 px-8`}
                   style={{ transform: `translate(${contentOffsetX}px, ${contentOffsetY}px)` }}
                >
                  {postType === 'quote' && (
                    <div className="space-y-6">
                       <h1 className={`font-serif leading-[1.1]`} style={{ fontSize: `${titleFontSize}px` }}>
                        {content.title.split(' ').map((word, i) => (
                          <span key={i} className={i % 3 === 1 ? `text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}` : ''}>
                            {word}{' '}
                          </span>
                        ))}
                      </h1>
                      <div className="relative pl-4 border-l border-white/20">
                      <p className={`font-sans font-light leading-relaxed text-neutral-300`} style={{ fontSize: `${bodyFontSize}px` }}>
                          {content.body}
                        </p>
                      </div>
                    </div>
                  )}

                  {postType === 'list' && (
                    <div className="space-y-6">
                      <h1 className={`font-serif leading-tight`} style={{ fontSize: `${titleFontSize}px` }}>
                        {content.title}
                      </h1>
                      <div className="space-y-3">
                        {content.listItems.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 group">
                            <div className="mt-1 w-4 h-4 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                              <div className={`w-1.5 h-1.5 rounded-full ${theme === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}></div>
                            </div>
                            <p className={`font-sans text-neutral-300 flex-1 border-b border-white/5 pb-2`} style={{ fontSize: `${bodyFontSize}px` }}>{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {postType === 'announcement' && (
                    <div className="text-center space-y-6">
                      <div className="inline-block p-3 rounded-full bg-white/5 border border-white/10 mb-2">
                        <Sparkles size={24} className={theme === 'orange' ? 'text-orange-400' : 'text-purple-400'} />
                      </div>
                      <h1 className={`font-serif leading-none tracking-tight`} style={{ fontSize: `${titleFontSize}px` }}>
                        {content.title}
                      </h1>
                      <p className={`font-sans font-light text-neutral-400 max-w-[80%] mx-auto`} style={{ fontSize: `${bodyFontSize}px` }}>
                        {content.body}
                      </p>
                      {showCTA && (
                        <div className={`inline-block mt-4 ${ctaPaddingClass} rounded-full border ${theme === 'orange' ? 'border-orange-500/30 bg-orange-500/10 text-orange-300' : 'border-purple-500/30 bg-purple-500/10 text-purple-300'} text-xs tracking-widest uppercase font-sans whitespace-nowrap`}>
                          {content.cta}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer - Only show if no overlay is selected */}
                {overlayStyle === 'none' && (
                  <div className="relative z-10 flex justify-between items-end px-8 pb-8 mt-auto">
                    <div className="flex flex-col">
                      <span className="font-sans text-[9px] uppercase tracking-wider opacity-50 mb-1">Data</span>
                      <span className="font-mono text-xs">{content.date}</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="font-sans text-[9px] uppercase tracking-wider opacity-50 mb-1">Web3 Education</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-white/20"></div>
                        <div className={`w-1 h-4 ${theme === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}></div>
                        <div className="w-1 h-4 bg-white/20"></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Profile Photo */}
            {assetCategory === 'branding' && format === 'profile' && (
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8">
                {showLogo && (
                  <img
                    src={logoSrc}
                    alt="Karn Logo"
                    className={`${LOGO_SIZE_CONFIG.profile[logoSize]} ${(showName || showSlogan) ? 'mb-4' : ''}`}
                  />
                )}
                {showName && (
                  <h1 className={`font-serif ${BRANDING_TYPOGRAPHY.name.profile[brandingNameSize]} tracking-tight ${theme === 'mixed' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400' : 'text-white'}`}>
                    {brandContent.nameVariants[nameVariant]}
                  </h1>
                )}
                {showSlogan && (
                  <p className={`${sloganStyle === 'italic' ? 'font-serif italic' : 'font-sans'} ${BRANDING_TYPOGRAPHY.slogan.profile[brandingSloganSize]} ${SLOGAN_COLOR_CONFIG[sloganColor]} ${showName ? 'mt-3' : ''} leading-relaxed max-w-[85%]`}>
                    {sloganLineBreak
                      ? brandContent.slogan.split('. ').map((part, i, arr) => (
                          <span key={i}>{part}{i < arr.length - 1 ? '.' : ''}{i < arr.length - 1 && <br />}</span>
                        ))
                      : brandContent.slogan
                    }
                  </p>
                )}
                {/* Decorative accent - only show if there's any content */}
                {(showLogo || showName || showSlogan) && (
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-1">
                    <div className="w-6 h-0.5 bg-white/20"></div>
                    <div className={`w-6 h-0.5 ${theme === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}></div>
                    <div className="w-6 h-0.5 bg-white/20"></div>
                  </div>
                )}
              </div>
            )}

            {/* Banner */}
            {assetCategory === 'branding' && format === 'banner' && (
              <div className={`relative z-10 w-full h-full flex px-10
                ${VERTICAL_ALIGN_CONFIG[verticalAlign]}
                ${bannerLayout === 'center' ? 'justify-center' :
                  (logoSide === 'right' ? 'flex-row-reverse justify-between' : 'justify-between')
                }`}>

                {/* Logo - aparece no lado escolhido quando layout = side */}
                {bannerLayout === 'side' && showLogo && (
                  <img
                    src={logoSrc}
                    alt="Karn Logo"
                    className={LOGO_SIZE_CONFIG.banner[logoSize]}
                  />
                )}

                {/* Container de texto */}
                <div className={`flex flex-col ${
                  bannerLayout === 'center'
                    ? 'items-center text-center'
                    : (showLogo
                        ? (logoSide === 'right' ? 'items-start text-left' : 'items-end text-right')
                        : 'items-center text-center')
                }`}>
                  {/* Logo no centro se layout center */}
                  {bannerLayout === 'center' && showLogo && (
                    <img
                      src={logoSrc}
                      alt="Karn Logo"
                      className={`${LOGO_SIZE_CONFIG.banner[logoSize]} ${(showName || showSlogan) ? 'mb-2' : ''}`}
                    />
                  )}
                  {showName && (
                    <h1 className={`font-serif ${BRANDING_TYPOGRAPHY.name.banner[brandingNameSize]} tracking-tight ${theme === 'mixed' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400' : 'text-white'}`}>
                      {brandContent.nameVariants[nameVariant]}
                    </h1>
                  )}
                  {showSlogan && (
                    <p className={`${sloganStyle === 'italic' ? 'font-serif italic' : 'font-sans'} ${BRANDING_TYPOGRAPHY.slogan.banner[brandingSloganSize]} ${SLOGAN_COLOR_CONFIG[sloganColor]} ${showName ? 'mt-1' : ''} leading-relaxed max-w-[220px]`}>
                      {sloganLineBreak
                        ? brandContent.slogan.split('. ').map((part, i, arr) => (
                            <span key={i}>{part}{i < arr.length - 1 ? '.' : ''}{i < arr.length - 1 && <br />}</span>
                          ))
                        : brandContent.slogan
                      }
                    </p>
                  )}
                </div>

                {/* Decorative bar */}
                {(showLogo || showName || showSlogan) && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                    <div className="w-10 h-0.5 bg-white/10"></div>
                    <div className={`w-10 h-0.5 ${theme === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}></div>
                    <div className="w-10 h-0.5 bg-white/10"></div>
                  </div>
                )}
              </div>
            )}
            </div>
          </div>
        </div>

        <ExportActions
          exportQuality={exportQuality}
          setExportQuality={setExportQuality}
          isGenerating={isGenerating}
          isRecording={isRecording}
          hasVideo={mediaItems.some((m) => m.type === 'video')}
          onDownloadImage={handleDownload}
          onDownloadVideo={handleVideoDownload}
          onCopyCaption={() => {
            const text = `${content.eyebrow}\n\n${content.title}\n\n${content.body}\n\n#KarnInstitute #Web3 #Education #WomenInTech`;
            navigator.clipboard.writeText(text);
            alert('Legenda copiada!');
          }}
        />
      </div>
    </div>
  );
}
