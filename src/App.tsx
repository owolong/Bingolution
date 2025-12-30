import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { ArrowLeft, Image as ImageIcon, Shuffle } from 'lucide-react';
import InputSection from './components/InputSection';
import BingoCard from './components/BingoCard';
import { DEFAULT_RESOLUTIONS, ResolutionModeKey } from './constants';
import { Theme, KittyVariant } from './themes';

function App() {
  const [resolutions, setResolutions] = useState<string[]>(() => {
    return [...DEFAULT_RESOLUTIONS].sort(() => Math.random() - 0.5).slice(0, 25);
  });
  const [view, setView] = useState<'input' | 'preview'>('input');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.5);
  const [enableFreeSpace, setEnableFreeSpace] = useState(true);
  const [freeSpaceText, setFreeSpaceText] = useState("FREE SPACE");
  const [theme, setTheme] = useState<Theme>('classic');
  const [kittyVariant, setKittyVariant] = useState<KittyVariant>('orange');
  const [resolutionMode, setResolutionMode] = useState<ResolutionModeKey>('random_uwu');
  const [userName, setUserName] = useState("");
  const previewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (previewContainerRef.current) {
        // We subtract a bit of padding/border to ensure it fits comfortably
        const containerWidth = previewContainerRef.current.offsetWidth;
        const scale = (containerWidth) / 800;
        setPreviewScale(Math.min(scale, 1));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [view]);

  const handleShuffle = () => {
    const shuffled = [...resolutions].sort(() => Math.random() - 0.5);
    setResolutions(shuffled);
  };

  const handleDownload = async () => {
    if (!cardRef.current) {
      console.error("Card ref is missing");
      return;
    }
    setIsExporting(true);
    try {
      console.log("Starting export...");
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 1. Capture the bingo card at high resolution
      const cardCanvas = await html2canvas(cardRef.current, {
        scale: 2, // High quality capture
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: true, // Enable logging to see html2canvas output
        onclone: (clonedDoc) => {
            // Ensure the cloned element is visible
            const clonedCard = clonedDoc.querySelector('[data-bingo-card]');
            if (clonedCard instanceof HTMLElement) {
                clonedCard.style.display = 'block';
            }
        }
      });

      console.log("Canvas captured:", cardCanvas.width, "x", cardCanvas.height);

      if (cardCanvas.width === 0 || cardCanvas.height === 0) {
        alert("Error: Captured image is empty. Please try again.");
        setIsExporting(false);
        return;
      }

      // 2. Create a new canvas representing an A4 sheet
      // A4 is 210mm x 297mm (Ratio: 1.414)
      const cardWidth = cardCanvas.width;
      const cardHeight = cardCanvas.height;
      
      // Set margin to 0 to maximize size on A4 paper.
      // Note: There will still be some vertical whitespace because the card (1.25 ratio) is wider than A4 (1.414 ratio).
      const margin = 0; 
      const a4Width = cardWidth + (margin * 2);
      const a4Height = Math.floor(a4Width * 1.4142); // A4 Aspect Ratio

      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = a4Width;
      finalCanvas.height = a4Height;
      const ctx = finalCanvas.getContext('2d');

      if (ctx) {
        // Fill with white background (paper)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, a4Width, a4Height);

        // Draw the card centered
        const x = (a4Width - cardWidth) / 2;
        const y = (a4Height - cardHeight) / 2;
        
        ctx.drawImage(cardCanvas, x, y);

        const dataUrl = finalCanvas.toDataURL('image/jpeg', 0.9);
        
        // Direct download
        const link = document.createElement('a');
        link.download = 'Bingolution.jpg';
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Export failed", err);
      alert("Export failed. See console for details.");
    }
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-gray-800 font-sans selection:bg-cyan-200 overflow-x-hidden">
      {/* Cute Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(#2dd4bf 2px, transparent 2px), radial-gradient(#e879f9 2px, transparent 2px)',
             backgroundSize: '40px 40px',
             backgroundPosition: '0 0, 20px 20px'
           }}>
      </div>
      
      <header className="py-8 text-center px-4 relative z-10">
        <motion.h1 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="text-6xl md:text-8xl font-black text-fuchsia-600 mb-2 drop-shadow-sm"
          style={{ 
            fontFamily: '"Fredoka", sans-serif', 
            textShadow: '4px 4px 0px #ffffff, 6px 6px 0px rgba(0,0,0,0.1)',
            WebkitTextStroke: '3px #ffffff',
            paintOrder: 'stroke fill'
          }}
        >
          Bingolution
        </motion.h1>
        <p className="text-cyan-700 font-bold text-xl tracking-wide bg-white/50 inline-block px-6 py-2 rounded-full backdrop-blur-sm shadow-sm border border-white/50">
          ✨ 2025 New Year's Resolution Generator ✨
        </p>
      </header>

      <main className="container mx-auto px-4 pb-20 relative z-10">
        {/* Hidden container for high-res export - Always rendered to ensure ref is available */}
        <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
           <div className="bg-white p-0 inline-block"> 
              <BingoCard 
                ref={cardRef} 
                resolutions={resolutions} 
                enableFreeSpace={enableFreeSpace}
                freeSpaceText={freeSpaceText}
                theme={theme}
                kittyVariant={kittyVariant}
                userName={userName}
              />
           </div>
         </div>

        <AnimatePresence mode="wait">
          {view === 'input' ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <InputSection 
                resolutions={resolutions} 
                setResolutions={setResolutions} 
                onGenerate={() => {
                  // Generate (switch view)
                  setView('preview');
                }}
                enableFreeSpace={enableFreeSpace}
                setEnableFreeSpace={setEnableFreeSpace}
                freeSpaceText={freeSpaceText}
                setFreeSpaceText={setFreeSpaceText}
                theme={theme}
                setTheme={setTheme}
                kittyVariant={kittyVariant}
                setKittyVariant={setKittyVariant}
                resolutionMode={resolutionMode}
                setResolutionMode={setResolutionMode}
                isExporting={isExporting}
                userName={userName}
                setUserName={setUserName}
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center gap-4 mb-8 sticky top-4 z-50 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-4 border-cyan-100 max-w-full">
                <button
                  onClick={() => setView('input')}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 font-bold transition-all transform hover:scale-105 active:scale-95 border-b-4 border-gray-300 hover:border-gray-400"
                >
                  <ArrowLeft size={20} strokeWidth={3} />
                  Edit
                </button>
                <button
                  onClick={handleShuffle}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-600 rounded-2xl hover:bg-yellow-200 font-bold transition-all transform hover:scale-105 active:scale-95 border-b-4 border-yellow-300 hover:border-yellow-400"
                >
                  <Shuffle size={20} strokeWidth={3} />
                  Shuffle
                </button>
                <div className="w-px h-10 bg-cyan-200 mx-2 hidden sm:block"></div>
                <button
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white rounded-2xl hover:from-fuchsia-600 hover:to-purple-600 font-black shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 border-b-4 border-fuchsia-700 disabled:opacity-50 disabled:scale-100 disabled:border-none"
                >
                  {isExporting ? 'Generating...' : <><ImageIcon size={20} strokeWidth={3} /> Download Resolutions</>}
                </button>
              </div>

               {/* Visible Preview */}
               <div className="flex flex-col items-center gap-4 w-full max-w-[500px]">
                 <div className="bg-white px-6 py-2 rounded-full shadow-sm border-2 border-cyan-200 text-cyan-500 font-bold uppercase tracking-widest text-sm">
                   Preview
                 </div>
                 
                 <div 
                   ref={previewContainerRef}
                   className="relative w-full aspect-[5/7] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden border-8 border-white ring-4 ring-cyan-100"
                 >
                    {/* 
                      We use the calculated scale to fit the 800px card into the container.
                      The container's width is dynamic.
                    */}
                    <div 
                      className="absolute top-0 left-0 origin-top-left"
                      style={{ transform: `scale(${previewScale})` }}
                    >
                       <BingoCard 
                         resolutions={resolutions} 
                         enableFreeSpace={enableFreeSpace}
                         freeSpaceText={freeSpaceText}
                         theme={theme}
                         kittyVariant={kittyVariant}
                         userName={userName}
                       />
                    </div>
                 </div>
               </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
