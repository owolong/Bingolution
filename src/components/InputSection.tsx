import React, { useRef, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { Shuffle, Trash2, Wand2, Star, Palette, Cat, List } from 'lucide-react';
import { RESOLUTION_MODES, ResolutionModeKey } from '../constants';
import { Theme, THEMES, KittyVariant, KITTY_VARIANTS } from '../themes';
import ResolutionItem from './ResolutionItem';

interface InputSectionProps {
  resolutions: string[];
  setResolutions: Dispatch<SetStateAction<string[]>>;
  onGenerate: () => void;
  enableFreeSpace: boolean;
  setEnableFreeSpace: (enable: boolean) => void;
  freeSpaceText: string;
  setFreeSpaceText: (text: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  kittyVariant: KittyVariant;
  setKittyVariant: (variant: KittyVariant) => void;
  resolutionMode: ResolutionModeKey;
  setResolutionMode: (mode: ResolutionModeKey) => void;
  isExporting?: boolean;
  userName: string;
  setUserName: (name: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ 
  resolutions, 
  setResolutions, 
  onGenerate,
  enableFreeSpace,
  setEnableFreeSpace,
  freeSpaceText,
  setFreeSpaceText,
  theme,
  setTheme,
  kittyVariant,
  setKittyVariant,
  resolutionMode,
  setResolutionMode,
  isExporting = false,
  userName,
  setUserName
}) => {
  
  // Ref to hold the latest resolutions to avoid re-creating callbacks
  const resolutionsRef = useRef(resolutions);
  useEffect(() => {
    resolutionsRef.current = resolutions;
  }, [resolutions]);

  const handleChange = useCallback((index: number, value: string) => {
    setResolutions((prev) => {
      const newRes = [...prev];
      newRes[index] = value;
      return newRes;
    });
  }, [setResolutions]);

  const handleShuffle = () => {
    setResolutions((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleClear = () => {
    setResolutions(Array(25).fill(""));
  };

  const handleFillDefaults = () => {
    const sourceResolutions = RESOLUTION_MODES[resolutionMode].resolutions;
    const shuffledDefaults = [...sourceResolutions].sort(() => Math.random() - 0.5);
    // Fill up to 25
    setResolutions(shuffledDefaults.slice(0, 25));
  };

  const handleRefreshOne = useCallback((index: number) => {
    const currentResolutions = resolutionsRef.current;
    const sourceResolutions = RESOLUTION_MODES[resolutionMode].resolutions;
    // Find resolutions that are NOT currently in the list
    const available = sourceResolutions.filter(r => !currentResolutions.includes(r));
    
    if (available.length === 0) return; 
    
    const random = available[Math.floor(Math.random() * available.length)];
    
    setResolutions((prev) => {
      const newRes = [...prev];
      newRes[index] = random;
      return newRes;
    });
  }, [resolutionMode, setResolutions]);

  // We always maintain 25 items in state.
  // If Free Space is ON, we visually hide the 13th item (index 12) or show a placeholder.
  // Actually, to make it intuitive, let's render the grid exactly as it will appear.
  
  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 25; i++) {
      const isCenter = i === 12;
      
      if (enableFreeSpace && isCenter) {
        inputs.push(
          <div key="free-space" className="relative group flex items-center justify-center bg-yellow-50 border-4 border-yellow-200 rounded-3xl h-28 overflow-hidden shadow-sm transition-transform duration-300 hover:scale-[1.02]">
            <div className="text-center text-yellow-600 font-bold flex flex-col items-center w-full h-full p-2 justify-center">
              <div className="flex items-center gap-1 mb-1 text-xs uppercase tracking-wider opacity-70">
                <Star size={14} fill="currentColor" />
                <span>Center</span>
              </div>
              <input 
                type="text"
                value={freeSpaceText}
                onChange={(e) => setFreeSpaceText(e.target.value)}
                className="bg-transparent text-center w-full font-black text-sm sm:text-xl focus:outline-none focus:border-b-2 border-yellow-400/50 placeholder-yellow-700/30 min-w-0"
                placeholder="FREE SPACE"
              />
            </div>
          </div>
        );
      } else {
        inputs.push(
          <ResolutionItem
            key={i}
            index={i}
            value={resolutions[i]}
            onChange={handleChange}
            onRefresh={handleRefreshOne}
          />
        );
      }
    }
    return inputs;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white/95 backdrop-blur-sm rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-4 border-white ring-4 ring-cyan-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black text-gray-800 mb-2" style={{ fontFamily: '"Fredoka", sans-serif' }}>
            <span className="text-fuchsia-500">Customize</span> Your Goals!
          </h2>
          <p className="text-gray-500 font-medium bg-cyan-50 inline-block px-4 py-2 rounded-xl text-sm max-w-lg leading-relaxed">
            1. Choose a <strong>Resolution Mode</strong> to get ideas.<br/>
            2. Pick a <strong>Bingo Style</strong>.<br/>
            3. Edit the boxes below with your own custom goals!
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center md:justify-end">
          <div className="flex items-center gap-2 mr-2 bg-white p-1 rounded-2xl border-2 border-gray-100 shadow-sm">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name (Optional)"
              className="px-4 py-2 rounded-xl focus:outline-none text-gray-600 font-bold placeholder-gray-300 w-48 text-center"
            />
          </div>
          <button 
            onClick={() => setEnableFreeSpace(!enableFreeSpace)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all font-bold border-b-4 transform active:scale-95 hover:scale-105 ${
              enableFreeSpace 
                ? 'bg-yellow-100 text-yellow-600 border-yellow-300 hover:bg-yellow-200' 
                : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <Star size={20} fill={enableFreeSpace ? "currentColor" : "none"} strokeWidth={3} />
            {enableFreeSpace ? "Free Space: ON" : "Free Space: OFF"}
          </button>

          <button 
            onClick={handleFillDefaults}
            className="flex items-center gap-2 px-5 py-3 bg-cyan-100 text-cyan-600 rounded-2xl hover:bg-cyan-200 transition-all font-bold border-b-4 border-cyan-200 active:scale-95 hover:scale-105"
          >
            <Wand2 size={20} strokeWidth={3} />
            Auto-Fill
          </button>
          <button 
            onClick={handleShuffle}
            className="flex items-center gap-2 px-5 py-3 bg-lime-100 text-lime-600 rounded-2xl hover:bg-lime-200 transition-all font-bold border-b-4 border-lime-200 active:scale-95 hover:scale-105"
          >
            <Shuffle size={20} strokeWidth={3} />
            Shuffle
          </button>
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-5 py-3 bg-red-100 text-red-500 rounded-2xl hover:bg-red-200 transition-all font-bold border-b-4 border-red-200 active:scale-95 hover:scale-105"
          >
            <Trash2 size={20} strokeWidth={3} />
            Clear
          </button>
        </div>
      </div>

      {/* Resolution Mode Selector */}
      <div className="mb-8 p-6 bg-fuchsia-50 rounded-3xl border-4 border-fuchsia-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-3 text-fuchsia-600 font-black text-lg">
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <List size={24} strokeWidth={3} />
            </div>
            <span>Choose your Resolution Mode</span>
          </div>
          <button 
            onClick={handleFillDefaults}
            className="flex items-center gap-2 px-4 py-2 bg-white text-fuchsia-500 rounded-xl hover:bg-fuchsia-100 transition-colors text-sm font-bold shadow-sm border-2 border-fuchsia-100"
            title="Shuffle and fill with current theme"
          >
            <Shuffle size={16} strokeWidth={3} />
            Shuffle & Fill
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.entries(RESOLUTION_MODES).map(([key, mode]) => (
            <button
              key={key}
              onClick={() => {
                setResolutionMode(key as ResolutionModeKey);
              }}
              className={`px-5 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 border-b-4 ${
                resolutionMode === key 
                  ? 'bg-fuchsia-500 text-white shadow-lg border-fuchsia-700 scale-105' 
                  : 'bg-white text-fuchsia-500 hover:bg-fuchsia-50 border-fuchsia-200'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-fuchsia-400 font-medium ml-1">
          Select a theme and click "Shuffle & Fill" to populate with new goals!
        </p>
      </div>

      {/* Theme Selector */}
      <div className="mb-8 p-6 bg-lime-50 rounded-3xl border-4 border-lime-100">
        <div className="flex items-center gap-3 mb-4 text-lime-600 font-black text-lg">
          <div className="bg-white p-2 rounded-xl shadow-sm">
            <Palette size={24} strokeWidth={3} />
          </div>
          <span>Bingo Style</span>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          {Object.values(THEMES).map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-sm ${
                theme === t.id 
                  ? 'ring-4 ring-offset-2 ring-lime-300 scale-105' 
                  : 'hover:opacity-90'
              }`}
              style={{ 
                background: t.colors.header, 
                color: t.colors.headerText,
                border: t.colors.headerBorder ? `3px solid ${t.colors.headerBorder}` : 'none'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {theme === 'kitty' && (
          <div className="mt-6 pt-6 border-t-2 border-lime-200 border-dashed">
            <div className="flex items-center gap-2 mb-3 text-lime-600 font-bold text-sm uppercase tracking-wide">
              <Cat size={18} strokeWidth={2.5} />
              <span>Kitty Color</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(KITTY_VARIANTS).map(([key, variant]) => (
                <button
                  key={key}
                  onClick={() => setKittyVariant(key as KittyVariant)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center border-2 ${
                    kittyVariant === key 
                      ? 'bg-lime-50 border-lime-300 text-lime-600 shadow-sm' 
                      : 'bg-white border-gray-200 text-gray-500 hover:border-lime-200'
                  }`}
                >
                  <span 
                    className="inline-block w-4 h-4 rounded-full mr-2 border border-black/10"
                    style={{ background: variant.colors.header }}
                  ></span>
                  {variant.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
        {renderInputs()}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onGenerate}
          disabled={isExporting}
          className="px-10 py-5 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white text-2xl font-black rounded-3xl shadow-[0_10px_40px_-10px_rgba(217,70,239,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(217,70,239,0.5)] hover:scale-105 transition-all transform active:scale-95 disabled:opacity-70 disabled:scale-100 border-b-8 border-fuchsia-700 active:border-b-0 active:translate-y-2"
        >
          {isExporting ? 'Generating...' : 'Preview Bingo Card! 🎨'}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
