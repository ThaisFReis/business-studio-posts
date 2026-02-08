import {
  Circle,
  Eye,
  EyeOff,
  Image,
  Layers,
  Layout,
  LayoutTemplate,
  List,
  Maximize,
  Move,
  Palette,
  PanelTop,
  Quote,
  RectangleVertical,
  Smartphone,
  Sparkles,
  Square,
  Type,
  Upload,
  Video,
  Wand2,
  X,
} from 'lucide-react';
import type { FontSize, LayoutType, NameVariant } from '../types/studio';

type StudioControlsPanelProps = any;

export default function StudioControlsPanel(props: StudioControlsPanelProps) {
  const {
    brandIdentity,
    postRatio,
    assetCategory,
    setAssetCategory,
    setFormat,
    imageOverlayOpacity,
    setImageOverlayOpacity,
    contentOffsetY,
    setContentOffsetY,
    contentOffsetX,
    setContentOffsetX,
    showGradientOverlay,
    setShowGradientOverlay,
    showMedia,
    setShowMedia,
    titleFontSize,
    setTitleFontSize,
    bodyFontSize,
    setBodyFontSize,
    layout,
    updateLayout,
    activeSlot,
    setActiveSlot,
    mediaItems,
    activeMedia,
    handleFileUpload,
    removeMedia,
    updateActiveMedia,
    postType,
    loadPreset,
    format,
    profileShape,
    setProfileShape,
    theme,
    setTheme,
    overlayStyle,
    setOverlayStyle,
    onBrandIdentityChange,
    showLogo,
    setShowLogo,
    logoSize,
    setLogoSize,
    showName,
    setShowName,
    nameVariant,
    setNameVariant,
    brandContent,
    brandingNameSize,
    setBrandingNameSize,
    showSlogan,
    setShowSlogan,
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
    content,
    setContent,
    showCTA,
    setShowCTA,
  } = props;

  return (
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
  );
}
