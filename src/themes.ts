export type Theme = 'classic' | 'kitty' | 'puppy' | 'pokemon' | 'sushi';
export type KittyVariant = 'orange' | 'calico' | 'tortie' | 'grey';

export const KITTY_VARIANTS: Record<KittyVariant, {
  label: string;
  colors: {
    header: string;
    headerText: string;
    headerBorder?: string;
    background: string;
    grid: string;
    cell: string;
    cellText: string;
    freeSpace: string;
    freeSpaceText: string;
    border: string;
    outerBorder: string;
  };
  iconColors: string[];
}> = {
  orange: {
    label: 'Orange',
    colors: {
      header: '#fb923c', // orange-400
      headerText: '#ffffff',
      background: '#fff7ed', // orange-50
      grid: '#fed7aa', // orange-200
      cell: '#ffffff',
      cellText: '#7c2d12', // orange-900
      freeSpace: '#f97316', // orange-500
      freeSpaceText: '#ffffff',
      border: '#fed7aa', // orange-200
      outerBorder: '#fb923c', // orange-400
    },
    iconColors: ['#fdba74', '#fbbf24', '#eab308', '#f97316'] // orange-300, amber-400, yellow-500, orange-500
  },
  calico: {
    label: 'Calico',
    colors: {
      header: '#f59e0b', // amber-500
      headerText: '#ffffff',
      background: '#fafaf9', // stone-50
      grid: '#292524', // stone-800
      cell: '#ffffff',
      cellText: '#1c1917', // stone-900
      freeSpace: '#292524', // stone-800
      freeSpaceText: '#ffffff',
      border: '#fde68a', // amber-200
      outerBorder: '#f59e0b', // amber-500
    },
    iconColors: ['#fb923c', '#44403c', '#fcd34d', '#78716c'] // orange-400, stone-700, amber-300, stone-500
  },
  tortie: {
    label: 'Tortie',
    colors: {
      header: '#292524', // stone-800
      headerText: '#fff7ed', // orange-50
      background: '#f5f5f4', // stone-100
      grid: '#c2410c', // orange-700
      cell: '#ffffff',
      cellText: '#1c1917', // stone-900
      freeSpace: '#292524', // stone-800
      freeSpaceText: '#fff7ed', // orange-50
      border: '#fed7aa', // orange-200
      outerBorder: '#292524', // stone-800
    },
    iconColors: ['#44403c', '#c2410c', '#57534e', '#b45309'] // stone-700, orange-700, stone-600, amber-700
  },
  grey: {
    label: 'Grey',
    colors: {
      header: '#64748b', // slate-500
      headerText: '#ffffff',
      background: '#f8fafc', // slate-50
      grid: '#cbd5e1', // slate-300
      cell: '#ffffff',
      cellText: '#0f172a', // slate-900
      freeSpace: '#475569', // slate-600
      freeSpaceText: '#ffffff',
      border: '#e2e8f0', // slate-200
      outerBorder: '#64748b', // slate-500
    },
    iconColors: ['#cbd5e1', '#9ca3af', '#94a3b8', '#6b7280'] // slate-300, gray-400, slate-400, gray-500
  }
};

export const THEMES: Record<Theme, {
  id: Theme;
  label: string;
  colors: {
    header: string;
    headerText: string;
    headerBorder?: string;
    background: string;
    grid: string;
    cell: string;
    cellText: string;
    freeSpace: string;
    freeSpaceText: string;
    border: string;
    outerBorder: string;
  };
  iconColors?: string[];
}> = {
  classic: {
    id: 'classic',
    label: 'Classic Bingo',
    colors: {
      header: '#4f46e5', // indigo-600
      headerText: '#ffffff',
      background: '#ffffff',
      grid: '#1f2937', // gray-800
      cell: '#ffffff',
      cellText: '#111827', // gray-900
      freeSpace: '#facc15', // yellow-400
      freeSpaceText: '#713f12', // yellow-900
      border: '#e5e7eb', // gray-200
      outerBorder: '#1f2937', // gray-800
    }
  },
  kitty: {
    id: 'kitty',
    label: 'Kitty Bingo',
    colors: {
      header: '#fb923c', // orange-400
      headerText: '#ffffff',
      background: '#fff7ed', // orange-50
      grid: '#fed7aa', // orange-200
      cell: '#ffffff',
      cellText: '#7c2d12', // orange-900
      freeSpace: '#f97316', // orange-500
      freeSpaceText: '#ffffff',
      border: '#fed7aa', // orange-200
      outerBorder: '#fb923c', // orange-400
    },
    iconColors: ['#fdba74', '#fbbf24', '#eab308', '#f97316']
  },
  puppy: {
    id: 'puppy',
    label: 'Puppy Bingo',
    colors: {
      header: '#fb923c', // orange-400
      headerText: '#ffffff',
      background: '#fff7ed', // orange-50
      grid: '#fed7aa', // orange-200
      cell: '#ffffff',
      cellText: '#7c2d12', // orange-900
      freeSpace: '#f97316', // orange-500
      freeSpaceText: '#ffffff',
      border: '#fed7aa', // orange-200
      outerBorder: '#fb923c', // orange-400
    },
    iconColors: ['#fdba74', '#fbbf24', '#f97316', '#eab308'] // orange-300, amber-400, orange-500, yellow-500
  },
  pokemon: {
    id: 'pokemon',
    label: 'Pokémon Bingo',
    colors: {
      header: 'linear-gradient(to bottom, #dc2626 50%, #ffffff 50%)',
      headerText: '#facc15', // yellow-400
      headerBorder: '#000000',
      background: '#f3f4f6', // gray-100
      grid: '#1f2937', // gray-800
      cell: '#ffffff',
      cellText: '#111827', // gray-900
      freeSpace: '#dc2626', // red-600
      freeSpaceText: '#ffffff',
      border: '#d1d5db', // gray-300
      outerBorder: '#000000',
    },
    iconColors: ['#facc15', '#ef4444', '#60a5fa', '#22c55e', '#a855f7', '#84cc16', '#67e8f9', '#dc2626'] // yellow-400, red-500, blue-400, green-500, purple-500, lime-500, cyan-300, red-600
  },
  sushi: {
    id: 'sushi',
    label: 'Sushi Bingo',
    colors: {
      header: '#ef4444', // red-500
      headerText: '#ffffff',
      background: '#f5f5f4', // stone-100
      grid: '#292524', // stone-800
      cell: '#fafaf9', // stone-50
      cellText: '#1c1917', // stone-900
      freeSpace: '#22c55e', // green-500
      freeSpaceText: '#ffffff',
      border: '#d6d3d1', // stone-300
      outerBorder: '#1c1917', // stone-900
    },
    iconColors: ['#f87171', '#fb923c', '#22c55e', '#57534e'] // red-400, orange-400, green-500, stone-600
  }
};
