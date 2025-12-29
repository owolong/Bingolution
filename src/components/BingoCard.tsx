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
}

const BingoCard = forwardRef<HTMLDivElement, BingoCardProps>(({ 
  resolutions, 
  title = "BINGOLUTION", 
  theme = 'classic',
  enableFreeSpace = true,
  freeSpaceText = "FREE SPACE",
  kittyVariant = 'orange'
}, ref) => {
  
  // Determine colors based on theme and potential variant
  let currentTheme = THEMES[theme];
  let colors = currentTheme.colors;
  
  if (theme === 'kitty') {
    const variant = KITTY_VARIANTS[kittyVariant];
    colors = variant.colors;
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
    const height = 1000;
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
          className={`absolute ${colorClass} opacity-60`}
          style={{ 
            left: pos.x, 
            top: pos.y, 
            ...getStyle(i) 
          }}
        >
          <IconComponent size={32} />
        </div>
      );
    });
  };

  const renderHeaderDecoration = () => {
    switch (theme) {
      case 'kitty':
        // Use the first icon color from the variant for the main header icon
        const headerIconColor = KITTY_VARIANTS[kittyVariant].iconColors[3]; // Usually the darkest/strongest color
        // Need to extract the color class name part to construct the border color if needed, 
        // but for now let's just use the text color class directly on the icon.
        // The border of the circle is hardcoded to pink-400 in the original, we should probably match the theme.
        // Let's try to map the border color from the theme colors.
        
        // We can use the outerBorder color from the theme for the circle border
        const borderColorClass = colors.outerBorder;

        return (
          <div className={`absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full border-4 ${borderColorClass} z-10`}>
            <Cat size={48} className={headerIconColor} />
          </div>
        );
      case 'puppy':
        return (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full border-4 border-orange-400 z-10">
            <Dog size={48} className="text-orange-500" />
          </div>
        );
      case 'pokemon':
        return null; // Header text is the decoration
      case 'sushi':
        return (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full border-4 border-red-500 z-10">
            <Fish size={48} className="text-red-500" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={ref} 
      className={`w-[800px] h-[1000px] ${colors.background} p-12 flex flex-col items-center shadow-2xl mx-auto text-gray-900 relative overflow-hidden`}
      style={{ minWidth: '800px', minHeight: '1000px' }}
    >
      {/* Border Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {renderBorderIcons()}
      </div>

      {renderHeaderDecoration()}

      <div className={`w-full ${colors.header} ${colors.headerText} py-8 rounded-t-xl mb-6 relative z-0 shadow-md mt-4`}>
        <h1 
          className="text-6xl font-black text-center tracking-widest uppercase drop-shadow-md"
          style={theme === 'pokemon' ? {
            color: '#FFCB05', // Pokemon Yellow
            WebkitTextStroke: '3px #3C5AA6', // Pokemon Blue
            textShadow: '4px 4px 0 #3C5AA6',
            fontFamily: '"Sigmar", sans-serif', // Closest free alternative to ITC Kabel Ultra
            letterSpacing: '0.1em'
          } : {}}
        >
          {title}
        </h1>
      </div>

      <div className={`grid grid-cols-5 grid-rows-5 gap-4 w-full h-full flex-grow border-4 ${colors.outerBorder} ${colors.grid} p-4 rounded-b-xl relative z-0`}>
        {gridItems.map((item, index) => {
          const isFreeSpace = enableFreeSpace && index === 12;
          return (
            <div 
              key={index}
              className={`
                relative flex items-center justify-center p-2 text-center select-none
                ${isFreeSpace 
                  ? `${colors.freeSpace} ${colors.freeSpaceText} font-black text-2xl rotate-0` 
                  : `${colors.cell} ${colors.cellText} font-bold text-lg`
                }
                rounded-lg shadow-sm border-2 ${colors.border}
              `}
            >
              {isFreeSpace && (
                <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                  {theme === 'kitty' ? <Cat size={64} /> :
                   theme === 'corgi' ? <Dog size={64} /> :
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

      <div className="mt-6 text-center text-gray-400 text-sm font-medium relative z-10">
        Generated with Bingolution
      </div>
    </div>
  );
});

BingoCard.displayName = "BingoCard";

export default BingoCard;
