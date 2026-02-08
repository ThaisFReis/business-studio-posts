import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Type, 
  Layout, 
  Palette, 
  Sparkles, 
  Quote, 
  List, 
  Copy,
  Loader2
} from 'lucide-react';

export default function KarnPostCreator() {
  // --- Estados do Conteúdo ---
  const [postType, setPostType] = useState('quote');
  const [theme, setTheme] = useState('purple');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [content, setContent] = useState({
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

  // --- Carregar html2canvas ---
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // --- Função de Download ---
  const handleDownload = async () => {
    const element = document.getElementById('instagram-post');
    if (!element) return;

    if (!window.html2canvas) {
      alert('A ferramenta de imagem ainda está carregando. Aguarde 2 segundos e tente novamente.');
      return;
    }

    setIsGenerating(true);

    try {
      // Pequeno delay para garantir que renderizações pendentes terminem
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await window.html2canvas(element, {
        scale: 3, // Alta resolução (aprox 1200x1500px)
        backgroundColor: '#0e100f',
        logging: false,
        useCORS: true
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `karn-post-${theme}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erro ao gerar imagem:', err);
      alert('Não foi possível gerar a imagem automaticamente. Por favor, tire um print da tela.');
    } finally {
      setIsGenerating(false);
    }
  };

  // --- Configurações de Design ---
  const colors = {
    bg: '#0e100f',
    purple: '#a855f7',
    purpleDark: '#9333ea',
    orange: '#ea580c',
    orangeLight: '#fb923c',
    white: '#ffffff',
  };

  // --- Função Auxiliar para Presets ---
  const loadPreset = (type) => {
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

  // --- Componente Interno do Post ---
  const PostPreview = () => {
    const gradientClass = theme === 'orange' 
      ? 'from-orange-400 to-red-500' 
      : theme === 'mixed' 
        ? 'from-purple-400 to-orange-400'
        : 'from-purple-400 to-blue-500';

    return (
      <div 
        id="instagram-post"
        className="relative w-[400px] h-[500px] bg-[#0e100f] overflow-hidden shadow-2xl flex flex-col justify-between p-8 text-white select-none"
        style={{ boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}
      >
        {/* Effects */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-40 mix-blend-screen ${theme === 'orange' ? 'bg-orange-600' : 'bg-purple-600'}`} style={{ transform: 'translate(30%, -30%)' }}></div>
        <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[90px] opacity-30 mix-blend-screen ${theme === 'orange' ? 'bg-purple-900' : 'bg-orange-900'}`} style={{ transform: 'translate(-30%, 30%)' }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${theme === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}></span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase opacity-70">{content.eyebrow}</span>
          </div>
          <span className="font-serif italic text-xs opacity-50">Instituto Karn.</span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow flex flex-col justify-center my-6">
          {postType === 'quote' && (
            <div className="space-y-6">
               <h1 className="font-serif text-4xl leading-[1.1]">
                {content.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 3 === 1 ? `text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}` : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <div className="relative pl-4 border-l border-white/20">
                <p className="font-sans font-light text-sm leading-relaxed text-neutral-300">
                  {content.body}
                </p>
              </div>
            </div>
          )}

          {postType === 'list' && (
            <div className="space-y-6">
              <h1 className="font-serif text-3xl leading-tight">
                {content.title}
              </h1>
              <div className="space-y-3">
                {content.listItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className={`mt-1 w-4 h-4 rounded-full border border-white/20 flex items-center justify-center bg-white/5`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${theme === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}></div>
                    </div>
                    <p className="font-sans text-sm text-neutral-300 flex-1 border-b border-white/5 pb-2">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

           {postType === 'announcement' && (
            <div className="text-center space-y-6">
              <div className={`inline-block p-3 rounded-full bg-white/5 border border-white/10 mb-2`}>
                <Sparkles size={24} className={theme === 'orange' ? 'text-orange-400' : 'text-purple-400'} />
              </div>
              <h1 className="font-serif text-5xl leading-none tracking-tight">
                {content.title}
              </h1>
              <p className="font-sans font-light text-sm text-neutral-400 max-w-[80%] mx-auto">
                {content.body}
              </p>
              <div className={`inline-block mt-4 px-6 py-2 rounded-full border ${theme === 'orange' ? 'border-orange-500/30 bg-orange-500/10 text-orange-300' : 'border-purple-500/30 bg-purple-500/10 text-purple-300'} text-xs tracking-widest uppercase font-sans`}>
                {content.cta}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-4">
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
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 flex flex-col md:flex-row">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Lora', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* --- LEFT SIDE: CONTROLS --- */}
      <div className="w-full md:w-[450px] bg-[#0e100f] border-r border-white/5 p-6 overflow-y-auto h-screen">
        <div className="mb-8 flex items-center gap-2 text-2xl font-bold font-serif tracking-tighter">
          KARN Studio<span className="text-purple-500">.</span>
        </div>

        {/* Templates */}
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

        {/* Content Inputs */}
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
              <label className="text-[10px] uppercase text-neutral-500 font-bold ml-1">{postType === 'announcement' ? 'Botão' : 'CTA'}</label>
              <input type="text" value={content.cta} onChange={(e) => setContent({...content, cta: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-neutral-500 font-bold ml-1">Data</label>
              <input type="text" value={content.date} onChange={(e) => setContent({...content, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs font-mono focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg text-xs text-purple-200 leading-relaxed">
          <strong>Pronto:</strong> Clique em salvar imagem para baixar um PNG em alta qualidade (aprox. 1200x1500px).
        </div>
      </div>

      {/* --- RIGHT SIDE: PREVIEW --- */}
      <div className="flex-1 bg-black/50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/30 via-black to-black -z-10"></div>
        <div className="flex items-center gap-4 mb-6">
           <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest">Studio Mode</span>
           <div className="h-px w-20 bg-neutral-800"></div>
           <span className="text-neutral-300 text-xs font-mono">1080 x 1350 px Ratio</span>
        </div>

        {/* The Post Render */}
        <div className="scale-[0.8] md:scale-100 transition-transform duration-500 ring-1 ring-white/10 shadow-[0_0_100px_rgba(168,85,247,0.1)]">
           <PostPreview />
        </div>

        <div className="mt-8 flex gap-4">
           <button 
             onClick={handleDownload}
             disabled={isGenerating}
             className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
           >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
              {isGenerating ? 'Gerando Imagem...' : 'Salvar Imagem (HD)'}
           </button>
           <button 
             className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-medium text-sm hover:bg-white/10 transition-colors"
             onClick={() => {
                const text = `${content.eyebrow}\n\n${content.title}\n\n${content.body}\n\n#KarnInstitute #Web3 #Education #WomenInTech`;
                navigator.clipboard.writeText(text);
                alert('Legenda copiada!');
             }}
           >
              <Copy size={18} /> Copiar Legenda
           </button>
        </div>
      </div>
    </div>
  );
}