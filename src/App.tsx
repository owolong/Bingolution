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
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 1. Capture the bingo card at high resolution
      const cardCanvas = await html2canvas(cardRef.current, {
        scale: 2, // High quality capture
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      // 2. Create a new canvas representing an A4 sheet
      // A4 is 210mm x 297mm (Ratio: 1.414)
      // We'll base the dimensions on the card width to ensure good resolution.
      // Let's say we want the card to take up about 80% of the A4 width.
      
      const cardWidth = cardCanvas.width;
      const cardHeight = cardCanvas.height;
      
      // Target A4 Width = Card Width / 0.8 (so card has 10% margin on each side)
      // Actually, let's just make it fit nicely.
      // Card is 800px (scaled by 2 = 1600px).
      // Let's set A4 width to be slightly larger than card width.
      // Let's use a fixed margin approach.
      const margin = 100; // pixels
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

        // Download the final A4 image
        const link = document.createElement('a');
        link.download = 'bingolution-card.jpg';
        link.href = finalCanvas.toDataURL('image/jpeg', 0.9);
        link.click();
      }
    } catch (err) {
      console.error("Export failed", err);
    }
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 font-sans selection:bg-indigo-200">
      
      <header className="py-8 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
          Bingolution
        </h1>
      </header>

      <main className="container mx-auto px-4 pb-20">
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
                onGenerate={() => setView('preview')}
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
              <div className="flex flex-wrap justify-center gap-3 mb-8 sticky top-4 z-50 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/20 max-w-full">
                <button
                  onClick={() => setView('input')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-bold transition-all text-sm md:text-base"
                >
                  <ArrowLeft size={18} />
                  Edit
                </button>
                <button
                  onClick={handleShuffle}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 font-bold transition-all text-sm md:text-base"
                >
                  <Shuffle size={18} />
                  Shuffle
                </button>
                <div className="w-px h-8 bg-gray-300 mx-1 hidden sm:block"></div>
                <button
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 text-sm md:text-base"
                >
                  {isExporting ? 'Generating...' : <><ImageIcon size={18} /> Download</>}
                </button>
              </div>

              {/* Hidden container for high-res export */}
              <div className="fixed top-0 left-[10000px]">
                 <div className="bg-white p-0"> 
                    <BingoCard 
                      ref={cardRef} 
                      resolutions={resolutions} 
                      enableFreeSpace={enableFreeSpace}
                      freeSpaceText={freeSpaceText}
                      theme={theme}
                      kittyVariant={kittyVariant}
                    />
                 </div>
               </div>

               {/* Visible Preview */}
               <div className="flex flex-col items-center gap-2 w-full max-w-[500px]">
                 <div className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                   Preview
                 </div>
                 
                 <div 
                   ref={previewContainerRef}
                   className="relative w-full aspect-[4/5] bg-gray-100 shadow-2xl rounded-xl overflow-hidden"
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
