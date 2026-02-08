import { useRef } from 'react';
import { domToPng } from 'modern-screenshot';
import StudioControlsPanel from './StudioControlsPanel';
import StudioPreviewPanel from './StudioPreviewPanel';
import { useStudioState } from '../hooks/useStudioState';
import {
  BRANDING_CONTENT,
  FORMAT_CONFIG,
  QUALITY_CONFIG,
} from '../config/studio';
import type {
  BrandIdentity,
  NameVariant,
} from '../types/studio';

type StudioShellProps = {
  brandIdentity: BrandIdentity;
  onBrandIdentityChange: (updates: Partial<BrandIdentity>) => void;
};

export default function StudioShell({ brandIdentity, onBrandIdentityChange }: StudioShellProps) {
  const state = useStudioState();
  const {
    postType,
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
    activeSlot,
    setActiveSlot,
    mediaItems,
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
  } = state;

  const postRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const brandContent = {
    slogan: brandIdentity.slogan || BRANDING_CONTENT.slogan,
    nameVariants: {
      karn: brandIdentity.shortName || BRANDING_CONTENT.nameVariants.karn,
      'karn.': brandIdentity.shortNameWithDot || BRANDING_CONTENT.nameVariants['karn.'],
      'instituto karn': brandIdentity.fullName || BRANDING_CONTENT.nameVariants['instituto karn'],
    } as Record<NameVariant, string>,
  };

  const { width: postWidth, height: postHeight, ratio: postRatio } = FORMAT_CONFIG[format];
  
  // Legacy class definitions removed in favor of inline styles
  const ctaPaddingClass = 'px-6 py-2'; // Default padding



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
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 flex flex-col md:flex-row">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Lora', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      <StudioControlsPanel
        brandIdentity={brandIdentity}
        postRatio={postRatio}
        assetCategory={assetCategory}
        setAssetCategory={setAssetCategory}
        setFormat={setFormat}
        imageOverlayOpacity={imageOverlayOpacity}
        setImageOverlayOpacity={setImageOverlayOpacity}
        contentOffsetY={contentOffsetY}
        setContentOffsetY={setContentOffsetY}
        contentOffsetX={contentOffsetX}
        setContentOffsetX={setContentOffsetX}
        showGradientOverlay={showGradientOverlay}
        setShowGradientOverlay={setShowGradientOverlay}
        showMedia={showMedia}
        setShowMedia={setShowMedia}
        titleFontSize={titleFontSize}
        setTitleFontSize={setTitleFontSize}
        bodyFontSize={bodyFontSize}
        setBodyFontSize={setBodyFontSize}
        layout={layout}
        updateLayout={updateLayout}
        activeSlot={activeSlot}
        setActiveSlot={setActiveSlot}
        mediaItems={mediaItems}
        activeMedia={activeMedia}
        handleFileUpload={handleFileUpload}
        removeMedia={removeMedia}
        updateActiveMedia={updateActiveMedia}
        postType={postType}
        loadPreset={loadPreset}
        format={format}
        profileShape={profileShape}
        setProfileShape={setProfileShape}
        theme={theme}
        setTheme={setTheme}
        overlayStyle={overlayStyle}
        setOverlayStyle={setOverlayStyle}
        onBrandIdentityChange={onBrandIdentityChange}
        showLogo={showLogo}
        setShowLogo={setShowLogo}
        logoSize={logoSize}
        setLogoSize={setLogoSize}
        showName={showName}
        setShowName={setShowName}
        nameVariant={nameVariant}
        setNameVariant={setNameVariant}
        brandContent={brandContent}
        brandingNameSize={brandingNameSize}
        setBrandingNameSize={setBrandingNameSize}
        showSlogan={showSlogan}
        setShowSlogan={setShowSlogan}
        brandingSloganSize={brandingSloganSize}
        setBrandingSloganSize={setBrandingSloganSize}
        sloganStyle={sloganStyle}
        setSloganStyle={setSloganStyle}
        sloganColor={sloganColor}
        setSloganColor={setSloganColor}
        sloganLineBreak={sloganLineBreak}
        setSloganLineBreak={setSloganLineBreak}
        bannerLayout={bannerLayout}
        setBannerLayout={setBannerLayout}
        logoSide={logoSide}
        setLogoSide={setLogoSide}
        verticalAlign={verticalAlign}
        setVerticalAlign={setVerticalAlign}
        content={content}
        setContent={setContent}
        showCTA={showCTA}
        setShowCTA={setShowCTA}
      />

      <StudioPreviewPanel
        postRatio={postRatio}
        format={format}
        profileShape={profileShape}
        postRef={postRef}
        overlayRef={overlayRef}
        assetCategory={assetCategory}
        postWidth={postWidth}
        postHeight={postHeight}
        theme={theme}
        showMedia={showMedia}
        layout={layout}
        mediaItems={mediaItems}
        activeSlot={activeSlot}
        setActiveSlot={setActiveSlot}
        imageOverlayOpacity={imageOverlayOpacity}
        showGradientOverlay={showGradientOverlay}
        overlayStyle={overlayStyle}
        content={content}
        brandIdentity={brandIdentity}
        contentOffsetX={contentOffsetX}
        contentOffsetY={contentOffsetY}
        postType={postType}
        titleFontSize={titleFontSize}
        gradientClass={gradientClass}
        bodyFontSize={bodyFontSize}
        showCTA={showCTA}
        ctaPaddingClass={ctaPaddingClass}
        showLogo={showLogo}
        logoSize={logoSize}
        showName={showName}
        brandingNameSize={brandingNameSize}
        nameVariant={nameVariant}
        brandContent={brandContent}
        showSlogan={showSlogan}
        brandingSloganSize={brandingSloganSize}
        sloganColor={sloganColor}
        sloganStyle={sloganStyle}
        sloganLineBreak={sloganLineBreak}
        verticalAlign={verticalAlign}
        bannerLayout={bannerLayout}
        logoSide={logoSide}
        exportQuality={exportQuality}
        setExportQuality={setExportQuality}
        isGenerating={isGenerating}
        isRecording={isRecording}
        handleDownload={handleDownload}
        handleVideoDownload={handleVideoDownload}
      />
    </div>
  );
}
