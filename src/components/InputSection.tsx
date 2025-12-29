import React from 'react';
import { Shuffle, Trash2, Wand2, Star, RefreshCw, Palette, Cat } from 'lucide-react';
import { DEFAULT_RESOLUTIONS } from '../constants';
import { Theme, THEMES, KittyVariant, KITTY_VARIANTS } from '../themes';

interface InputSectionProps {
  resolutions: string[];
  setResolutions: (res: string[]) => void;
  onGenerate: () => void;
  enableFreeSpace: boolean;
  setEnableFreeSpace: (enable: boolean) => void;
  freeSpaceText: string;
  setFreeSpaceText: (text: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  kittyVariant: KittyVariant;
  setKittyVariant: (variant: KittyVariant) => void;
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
  setKittyVariant
}) => {
  
  const handleChange = (index: number, value: string) => {
    const newRes = [...resolutions];
    newRes[index] = value;
    setResolutions(newRes);
  };

  const handleShuffle = () => {
    const shuffled = [...resolutions].sort(() => Math.random() - 0.5);
    setResolutions(shuffled);
  };

  const handleClear = () => {
    setResolutions(Array(25).fill(""));
  };

  const handleFillDefaults = () => {
    const shuffledDefaults = [...DEFAULT_RESOLUTIONS].sort(() => Math.random() - 0.5);
    // Fill up to 25
    setResolutions(shuffledDefaults.slice(0, 25));
  };

  const handleRefreshOne = (index: number) => {
    // Find resolutions that are NOT currently in the list
    const available = DEFAULT_RESOLUTIONS.filter(r => !resolutions.includes(r));
    
    if (available.length === 0) return; // Should not happen with 200 items
    
    const random = available[Math.floor(Math.random() * available.length)];
    const newRes = [...resolutions];
    newRes[index] = random;
    setResolutions(newRes);
  };

  // We always maintain 25 items in state.
  // If Free Space is ON, we visually hide the 13th item (index 12) or show a placeholder.
  // Actually, to make it intuitive, let's render the grid exactly as it will appear.
  
  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < 25; i++) {
      const isCenter = i === 12;
      
      if (enableFreeSpace && isCenter) {
        inputs.push(
          <div key="free-space" className="relative group flex items-center justify-center bg-yellow-100 border-2 border-yellow-300 rounded-xl h-24 overflow-hidden">
            <div className="text-center text-yellow-700 font-bold flex flex-col items-center w-full h-full p-2">
              <div className="flex items-center gap-1 mb-1 text-xs uppercase tracking-wider opacity-70">
                <Star size={12} fill="currentColor" />
                <span>Center</span>
              </div>
              <input 
                type="text"
                value={freeSpaceText}
                onChange={(e) => setFreeSpaceText(e.target.value)}
                className="bg-transparent text-center w-full font-black text-lg focus:outline-none focus:border-b-2 border-yellow-500/50 placeholder-yellow-700/30"
                placeholder="FREE SPACE"
              />
            </div>
          </div>
        );
      } else {
        inputs.push(
          <div key={i} className="relative group">
            <span className="absolute -top-2 -left-2 w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold shadow-sm z-10">
              {i + 1}
            </span>
            <button 
              onClick={() => handleRefreshOne(i)}
              className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors opacity-0 group-hover:opacity-100 z-20"
              title="Get new random resolution"
            >
              <RefreshCw size={14} />
            </button>
            <textarea
              value={resolutions[i] || ""}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder={`Goal #${i + 1}`}
              className="w-full h-24 p-3 pt-4 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none bg-gray-50 focus:bg-white pr-8"
            />
          </div>
        );
      }
    }
    return inputs;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Customize Your Resolutions</h2>
          <p className="text-gray-500">
            {enableFreeSpace ? "Enter 24 goals for the new year." : "Enter 25 goals for the new year."}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          <button 
            onClick={() => setEnableFreeSpace(!enableFreeSpace)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium border ${
              enableFreeSpace 
                ? 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200' 
                : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <Star size={18} fill={enableFreeSpace ? "currentColor" : "none"} />
            {enableFreeSpace ? "Free Space: ON" : "Free Space: OFF"}
          </button>

          <button 
            onClick={handleFillDefaults}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium"
          >
            <Wand2 size={18} />
            Auto-Fill
          </button>
          <button 
            onClick={handleShuffle}
            className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors font-medium"
          >
            <Shuffle size={18} />
            Shuffle
          </button>
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
          >
            <Trash2 size={18} />
            Clear
          </button>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-3 text-gray-700 font-bold">
          <Palette size={20} />
          <span>Choose Theme</span>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          {Object.values(THEMES).map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
                theme === t.id 
                  ? 'ring-2 ring-offset-2 ring-indigo-500 shadow-md scale-105' 
                  : 'hover:bg-gray-200'
              } ${t.colors.header} ${t.colors.headerText}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {theme === 'kitty' && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3 text-gray-700 font-bold text-sm">
              <Cat size={16} />
              <span>Kitty Color</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(KITTY_VARIANTS).map(([key, variant]) => (
                <button
                  key={key}
                  onClick={() => setKittyVariant(key as KittyVariant)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    kittyVariant === key 
                      ? 'ring-2 ring-offset-1 ring-pink-400 shadow-sm' 
                      : 'hover:bg-gray-200 bg-white border border-gray-200'
                  }`}
                >
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${variant.colors.header}`}></span>
                  {variant.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
        {renderInputs()}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onGenerate}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all transform active:scale-95"
        >
          Generate Bingo Card
        </button>
      </div>
    </div>
  );
};

export default InputSection;
