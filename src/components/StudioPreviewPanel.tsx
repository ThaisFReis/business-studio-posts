// @ts-nocheck
import { Sparkles } from 'lucide-react';
import logoKarn from '../assets/logo_karn.svg';
import ExportActions from './ExportActions';
import {
  BRANDING_TYPOGRAPHY,
  LAYOUT_CONFIG,
  LOGO_SIZE_CONFIG,
  SLOGAN_COLOR_CONFIG,
  VERTICAL_ALIGN_CONFIG,
} from '../config/studio';

type StudioPreviewPanelProps = any;

export default function StudioPreviewPanel(props: StudioPreviewPanelProps) {
  const {
    postRatio,
    format,
    profileShape,
    postRef,
    overlayRef,
    assetCategory,
    postWidth,
    postHeight,
    theme,
    showMedia,
    layout,
    mediaItems,
    activeSlot,
    setActiveSlot,
    imageOverlayOpacity,
    showGradientOverlay,
    overlayStyle,
    content,
    brandIdentity,
    contentOffsetX,
    contentOffsetY,
    postType,
    titleFontSize,
    gradientClass,
    bodyFontSize,
    showCTA,
    ctaPaddingClass,
    showLogo,
    logoSize,
    showName,
    brandingNameSize,
    nameVariant,
    brandContent,
    showSlogan,
    brandingSloganSize,
    sloganColor,
    sloganStyle,
    sloganLineBreak,
    verticalAlign,
    bannerLayout,
    logoSide,
    exportQuality,
    setExportQuality,
    isGenerating,
    isRecording,
    handleDownload,
    handleVideoDownload,
  } = props;

  const logoSrc = brandIdentity.logoUrl || logoKarn;
  const accentColor = brandIdentity.useBrandColors
    ? brandIdentity.primaryColor
    : theme === 'orange'
      ? '#f97316'
      : '#a855f7';
  const secondaryColor = brandIdentity.useBrandColors ? brandIdentity.secondaryColor : '#60a5fa';
  const patternBackground =
    brandIdentity.pattern === 'dots'
      ? 'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)'
      : brandIdentity.pattern === 'diagonal'
        ? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.22) 0, rgba(255,255,255,0.22) 1px, transparent 1px, transparent 10px)'
        : brandIdentity.pattern === 'grid'
          ? 'linear-gradient(rgba(255,255,255,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.20) 1px, transparent 1px)'
          : 'none';

  return (
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
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-40 mix-blend-screen"
              style={{ transform: 'translate(30%, -30%)', backgroundColor: accentColor }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[90px] opacity-30 mix-blend-screen"
              style={{ transform: 'translate(-30%, 30%)', backgroundColor: secondaryColor }}
            ></div>
            {brandIdentity.pattern !== 'none' && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: patternBackground,
                  backgroundSize: brandIdentity.pattern === 'dots' ? '14px 14px' : brandIdentity.pattern === 'grid' ? '40px 40px' : 'auto',
                  opacity: brandIdentity.patternOpacity / 100,
                }}
              />
            )}
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
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
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
                       <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
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
                 <div className="p-6 text-white" style={{ backgroundColor: accentColor }}>
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
                        <div className="w-2 h-8" style={{ backgroundColor: accentColor }}></div>
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
                          <span
                            key={i}
                            className={i % 3 === 1 ? `text-transparent bg-clip-text ${brandIdentity.useBrandColors ? '' : `bg-gradient-to-r ${gradientClass}`}` : ''}
                            style={i % 3 === 1 && brandIdentity.useBrandColors ? { backgroundImage: `linear-gradient(to right, ${accentColor}, ${secondaryColor})` } : undefined}
                          >
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
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
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
                        <Sparkles size={24} style={{ color: accentColor }} />
                      </div>
                      <h1 className={`font-serif leading-none tracking-tight`} style={{ fontSize: `${titleFontSize}px` }}>
                        {content.title}
                      </h1>
                      <p className={`font-sans font-light text-neutral-400 max-w-[80%] mx-auto`} style={{ fontSize: `${bodyFontSize}px` }}>
                        {content.body}
                      </p>
                      {showCTA && (
                        <div
                          className={`inline-block mt-4 ${ctaPaddingClass} rounded-full border text-xs tracking-widest uppercase font-sans whitespace-nowrap`}
                          style={{ borderColor: `${accentColor}55`, backgroundColor: `${accentColor}22`, color: accentColor }}
                        >
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
                        <div className="w-1 h-4" style={{ backgroundColor: accentColor }}></div>
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
                    <div className="w-6 h-0.5" style={{ backgroundColor: accentColor }}></div>
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
                    <div className="w-10 h-0.5" style={{ backgroundColor: accentColor }}></div>
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
  );
}
