import React, { forwardRef } from 'react';
import { 
  Cat, Dog, Fish, Zap, CircleDot, Star, Heart, PawPrint, 
  Bone, Flame, Droplets, Leaf, Ghost, Bug, Snowflake, 
  UtensilsCrossed, Soup 
} from 'lucide-react';
import { Theme, THEMES, KittyVariant, KITTY_VARIANTS } from '../themes';

interface BingoCardProps {
  resolutions: string[];
  title?: string;
  theme?: Theme;
  enableFreeSpace?: boolean;
  freeSpaceText?: string;
  kittyVariant?: KittyVariant;
  userName?: string;
}

const BingoCard = forwardRef<HTMLDivElement, BingoCardProps>(({ 
  resolutions, 
  title = "BINGOLUTION", 
  theme = 'classic',
  enableFreeSpace = true,
  freeSpaceText = "FREE SPACE",
  kittyVariant = 'orange',
  userName = ""
}, ref) => {
  
  // Determine colors based on theme and potential variant
  let currentTheme = THEMES[theme];
  let colors = currentTheme.colors;
  
  if (theme === 'kitty') {
    const variant = KITTY_VARIANTS[kittyVariant];
    colors = variant.colors;
  }

  // Determine header text and font size
  const headerText = userName ? `${userName}'s Bingolution` : title;
  
  // Simple font scaling logic
  let headerFontSize = "text-6xl";
  if (headerText.length > 20) {
    headerFontSize = "text-4xl";
  } else if (headerText.length > 15) {
    headerFontSize = "text-5xl";
  }

  let gridItems: string[] = [];

  if (enableFreeSpace) {
    let sourceResolutions = [...resolutions];
    if (sourceResolutions.length === 25) {
      sourceResolutions.splice(12, 1);
    }
    while (sourceResolutions.length < 24) {
      sourceResolutions.push("");
    }
    sourceResolutions = sourceResolutions.slice(0, 24);
    gridItems = [
      ...sourceResolutions.slice(0, 12),
      freeSpaceText,
      ...sourceResolutions.slice(12, 24)
    ];
  } else {
    let sourceResolutions = [...resolutions];
    while (sourceResolutions.length < 25) {
      sourceResolutions.push("");
    }
    gridItems = sourceResolutions.slice(0, 25);
  }

  const renderBorderIcons = () => {
    const icons = [];
    const width = 800;
    const height = 1120; // Increased height for A4 ratio
    const padding = 20; // Space from edge
    const spacing = 90; // Space between icons

    // Helper to generate randomish but deterministic rotation/scale based on index
    const getStyle = (i: number) => ({
      transform: `rotate(${Math.sin(i) * 30}deg) scale(${0.8 + (Math.cos(i * 2) + 1) * 0.2})`,
    });

    // Generate positions along the perimeter
    // Top
    for (let x = padding; x < width - padding; x += spacing) {
      icons.push({ x, y: padding, side: 'top' });
    }
    // Right
    for (let y = padding; y < height - padding; y += spacing) {
      icons.push({ x: width - padding - 10, y, side: 'right' });
    }
    // Bottom
    for (let x = width - padding; x > padding; x -= spacing) {
      icons.push({ x, y: height - padding - 10, side: 'bottom' });
    }
    // Left
    for (let y = height - padding; y > padding; y -= spacing) {
      icons.push({ x: padding, y, side: 'left' });
    }

    return icons.map((pos, i) => {
      let IconComponent = Star;
      let colorClass = 'text-gray-300';
      
      if (theme === 'kitty') {
        const kittyIcons = [Cat, PawPrint, Cat, Heart];
        const variantColors = KITTY_VARIANTS[kittyVariant].iconColors;
        IconComponent = kittyIcons[i % kittyIcons.length];
        colorClass = variantColors[i % variantColors.length];
      } else if (theme === 'puppy') {
        const puppyIcons = [Dog, Bone, PawPrint, Dog];
        const puppyColors = ['text-orange-300', 'text-amber-400', 'text-orange-500', 'text-yellow-500'];
        IconComponent = puppyIcons[i % puppyIcons.length];
        colorClass = puppyColors[i % puppyColors.length];
      } else if (theme === 'pokemon') {
        const pokeIcons = [Zap, Flame, Droplets, Leaf, Ghost, Bug, Snowflake, CircleDot];
        const pokeColors = ['text-yellow-400', 'text-red-500', 'text-blue-400', 'text-green-500', 'text-purple-500', 'text-lime-500', 'text-cyan-300', 'text-red-600'];
        IconComponent = pokeIcons[i % pokeIcons.length];
        colorClass = pokeColors[i % pokeColors.length];
      } else if (theme === 'sushi') {
        const sushiIcons = [Fish, Soup, UtensilsCrossed, Fish];
        const sushiColors = ['text-red-400', 'text-orange-400', 'text-green-500', 'text-stone-600'];
        IconComponent = sushiIcons[i % sushiIcons.length];
        colorClass = sushiColors[i % sushiColors.length];
      } else {
        return null; // Classic mode has no border icons
      }

      return (
        <div 
          key={i}
          className="absolute transform transition-all duration-500"
          style={{ 
            left: pos.x, 
            top: pos.y, 
            ...getStyle(i),
            color: colorClass
          }}
        >
          <IconComponent size={32} fill="currentColor" className="opacity-80" />
        </div>
      );
    });
  };

  const renderHeaderDecoration = () => {
    switch (theme) {
      case 'kitty':
        const headerIconColor = KITTY_VARIANTS[kittyVariant].iconColors[3]; 
        const borderColor = colors.outerBorder;

        return (
          <div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 p-2 rounded-full border-4 z-10"
            style={{ borderColor: borderColor, color: headerIconColor, backgroundColor: '#ffffff' }}
          >
            <Cat size={48} />
          </div>
        );
      case 'puppy':
        return (
          <div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 p-2 rounded-full border-4 z-10"
            style={{ borderColor: '#fb923c', color: '#f97316', backgroundColor: '#ffffff' }}
          >
            <Dog size={48} />
          </div>
        );
      case 'pokemon':
        return null; // Header text is the decoration
      case 'sushi':
        return (
          <div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 p-2 rounded-full border-4 z-10"
            style={{ borderColor: '#ef4444', color: '#ef4444', backgroundColor: '#ffffff' }}
          >
            <Fish size={48} />
          </div>
        );
      default:
        return null;
    }
  };

  const getFontSize = (text: string) => {
    if (text.length < 15) return 'text-2xl';
    if (text.length < 30) return 'text-xl';
    if (text.length < 50) return 'text-lg';
    if (text.length < 70) return 'text-base';
    if (text.length < 80) return 'text-sm';
    return 'text-xs';
  };

  return (
    <div 
      ref={ref} 
      className={`w-[800px] h-[1120px] p-8 flex flex-col items-center mx-auto relative overflow-hidden`}
      style={{ 
        minWidth: '800px', 
        minHeight: '1120px',
        backgroundColor: colors.background,
        color: '#111827', // text-gray-900
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' // shadow-2xl
      }}
    >
      {/* Border Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {renderBorderIcons()}
      </div>

      {renderHeaderDecoration()}

      <div 
        className={`w-full py-6 rounded-t-xl mb-4 relative z-0 mt-2`}
        style={{ 
          background: colors.header, 
          color: colors.headerText,
          border: colors.headerBorder ? `4px solid ${colors.headerBorder}` : 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' // shadow-md
        }}
      >
        <h1 
          className={`${headerFontSize} font-black text-center tracking-widest uppercase`}
          style={{
            textShadow: '0 4px 6px rgba(0,0,0,0.1)', // drop-shadow-md
            ...(theme === 'pokemon' ? {
              color: '#FFCB05', // Pokemon Yellow
              WebkitTextStroke: '3px #3C5AA6', // Pokemon Blue
              textShadow: '4px 4px 0 #3C5AA6',
              fontFamily: '"Sigmar", sans-serif',
              letterSpacing: '0.1em'
            } : {})
          }}
        >
          {headerText}
        </h1>
      </div>

      <div 
        className={`grid grid-cols-5 grid-rows-5 gap-4 w-full h-full flex-grow border-4 p-4 rounded-b-xl relative z-0`}
        style={{ 
          backgroundColor: colors.grid,
          borderColor: colors.outerBorder
        }}
      >
        {gridItems.map((item, index) => {
          const isFreeSpace = enableFreeSpace && index === 12;
          const fontSizeClass = isFreeSpace ? 'text-2xl' : getFontSize(item);
          
          return (
            <div 
              key={index}
              className={`
                relative flex items-center justify-center p-2 text-center select-none overflow-hidden
                ${isFreeSpace 
                  ? `font-black rotate-0` 
                  : `font-bold ${fontSizeClass}`
                }
                rounded-lg border-2
              `}
              style={{
                backgroundColor: isFreeSpace ? colors.freeSpace : colors.cell,
                color: isFreeSpace ? colors.freeSpaceText : colors.cellText,
                borderColor: colors.border,
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' // shadow-sm
              }}
            >
              {isFreeSpace && (
                <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                  {theme === 'kitty' ? <Cat size={64} /> :
                   theme === 'puppy' ? <Dog size={64} /> :
                   theme === 'pokemon' ? <CircleDot size={64} /> :
                   theme === 'sushi' ? <Fish size={64} /> :
                   <Star className="text-6xl" />
                  }
                </div>
              )}
              <span className="break-words w-full leading-tight z-10">
                {item}
              </span>
            </div>
          );
        })}
      </div>

      <div 
        className="mt-6 text-center text-sm font-medium relative z-10"
        style={{ color: '#9ca3af' }} // text-gray-400
      >
        Generated with Bingolution
      </div>
    </div>
  );
});

BingoCard.displayName = "BingoCard";

export default BingoCard;
