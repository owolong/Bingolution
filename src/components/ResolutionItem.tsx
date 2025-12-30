import React, { memo } from 'react';
import { RefreshCw } from 'lucide-react';

interface ResolutionItemProps {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  onRefresh: (index: number) => void;
}

const ResolutionItem: React.FC<ResolutionItemProps> = memo(({ index, value, onChange, onRefresh }) => {
  return (
    <div className="relative group transition-transform duration-300 hover:scale-[1.02]">
      <span className="absolute -top-3 -left-3 w-8 h-8 bg-white text-gray-400 border-2 border-gray-100 rounded-full flex items-center justify-center text-xs font-black shadow-sm z-10">
        {index + 1}
      </span>
      <button 
        onClick={() => onRefresh(index)}
        className="absolute top-2 right-2 p-2 text-gray-300 hover:text-cyan-500 hover:bg-cyan-50 rounded-full transition-all z-20 active:scale-90 active:bg-cyan-100 active:text-cyan-600"
        title="Get new random resolution"
      >
        <RefreshCw size={16} strokeWidth={3} />
      </button>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(index, e.target.value)}
        maxLength={80}
        placeholder={`Goal #${index + 1}`}
        className="w-full h-28 p-4 pt-5 text-sm font-medium border-2 border-gray-100 rounded-3xl focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100 transition-all resize-none bg-gray-50 focus:bg-white pr-8 shadow-sm hover:border-gray-200"
      />
      <div className={`absolute bottom-2 right-3 text-[10px] font-bold pointer-events-none transition-colors ${
        (value || "").length > 70 ? 'text-red-400' : 'text-gray-300'
      }`}>
        {(value || "").length}/80
      </div>
    </div>
  );
});

ResolutionItem.displayName = 'ResolutionItem';

export default ResolutionItem;
