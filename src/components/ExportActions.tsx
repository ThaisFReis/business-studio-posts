import { Copy, Download, Loader2, Video } from 'lucide-react';
import { QUALITY_CONFIG } from '../config/studio';
import type { ExportQuality } from '../types/studio';

type ExportActionsProps = {
  exportQuality: ExportQuality;
  setExportQuality: React.Dispatch<React.SetStateAction<ExportQuality>>;
  isGenerating: boolean;
  isRecording: boolean;
  hasVideo: boolean;
  onDownloadImage: () => void;
  onDownloadVideo: () => void;
  onCopyCaption: () => void;
};

export default function ExportActions({
  exportQuality,
  setExportQuality,
  isGenerating,
  isRecording,
  hasVideo,
  onDownloadImage,
  onDownloadVideo,
  onCopyCaption,
}: ExportActionsProps) {
  return (
    <div className="mt-8 flex gap-4 items-center">
      <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/10 mr-4">
        {(Object.entries(QUALITY_CONFIG) as [ExportQuality, (typeof QUALITY_CONFIG)[ExportQuality]][]).map(
          ([key, config]) => (
            <button
              key={key}
              onClick={() => setExportQuality(key)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                exportQuality === key
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {config.label}
            </button>
          ),
        )}
      </div>

      <button
        onClick={onDownloadImage}
        disabled={isGenerating || isRecording}
        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
        {isGenerating ? 'Gerando Imagem...' : 'Salvar Imagem (HD)'}
      </button>

      {hasVideo && (
        <button
          onClick={onDownloadVideo}
          disabled={isRecording || isGenerating}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-bold text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRecording ? <Loader2 size={18} className="animate-spin" /> : <Video size={18} />}
          {isRecording ? 'Gravando...' : 'Gravar Vídeo'}
        </button>
      )}

      <button
        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-medium text-sm hover:bg-white/10 transition-colors"
        onClick={onCopyCaption}
      >
        <Copy size={18} /> Copiar Legenda
      </button>
    </div>
  );
}
