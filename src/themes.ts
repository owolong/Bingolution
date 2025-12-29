export type Theme = 'classic' | 'kitty' | 'puppy' | 'pokemon' | 'sushi';
export type KittyVariant = 'orange' | 'calico' | 'tortie' | 'grey';

export const KITTY_VARIANTS: Record<KittyVariant, {
  label: string;
  colors: {
    header: string;
    headerText: string;
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
      header: 'bg-orange-400',
      headerText: 'text-white',
      background: 'bg-orange-50',
      grid: 'bg-orange-200',
      cell: 'bg-white',
      cellText: 'text-orange-900',
      freeSpace: 'bg-orange-500',
      freeSpaceText: 'text-white',
      border: 'border-orange-200',
      outerBorder: 'border-orange-400',
    },
    iconColors: ['text-orange-300', 'text-amber-400', 'text-yellow-500', 'text-orange-500']
  },
  calico: {
    label: 'Calico',
    colors: {
      header: 'bg-amber-500',
      headerText: 'text-white',
      background: 'bg-stone-50',
      grid: 'bg-stone-800',
      cell: 'bg-white',
      cellText: 'text-stone-900',
      freeSpace: 'bg-stone-800',
      freeSpaceText: 'text-white',
      border: 'border-amber-200',
      outerBorder: 'border-amber-500',
    },
    iconColors: ['text-orange-400', 'text-stone-700', 'text-amber-300', 'text-stone-500']
  },
  tortie: {
    label: 'Tortie',
    colors: {
      header: 'bg-stone-800',
      headerText: 'text-orange-50',
      background: 'bg-stone-100',
      grid: 'bg-orange-700',
      cell: 'bg-white',
      cellText: 'text-stone-900',
      freeSpace: 'bg-stone-800',
      freeSpaceText: 'text-orange-50',
      border: 'border-orange-200',
      outerBorder: 'border-stone-800',
    },
    iconColors: ['text-stone-700', 'text-orange-700', 'text-stone-600', 'text-amber-700']
  },
  grey: {
    label: 'Grey',
    colors: {
      header: 'bg-slate-500',
      headerText: 'text-white',
      background: 'bg-slate-50',
      grid: 'bg-slate-300',
      cell: 'bg-white',
      cellText: 'text-slate-900',
      freeSpace: 'bg-slate-600',
      freeSpaceText: 'text-white',
      border: 'border-slate-200',
      outerBorder: 'border-slate-500',
    },
    iconColors: ['text-slate-300', 'text-gray-400', 'text-slate-400', 'text-gray-500']
  }
};

export const THEMES: Record<Theme, {
  id: Theme;
  label: string;
  colors: {
    header: string;
    headerText: string;
    background: string;
    grid: string;
    cell: string;
    cellText: string;
    freeSpace: string;
    freeSpaceText: string;
    border: string;
    outerBorder: string;
  };
}> = {
  classic: {
    id: 'classic',
    label: 'Classic',
    colors: {
      header: 'bg-indigo-600',
      headerText: 'text-white',
      background: 'bg-white',
      grid: 'bg-gray-800',
      cell: 'bg-white',
      cellText: 'text-gray-900',
      freeSpace: 'bg-yellow-400',
      freeSpaceText: 'text-yellow-900',
      border: 'border-gray-200',
      outerBorder: 'border-gray-800',
    }
  },
  kitty: {
    id: 'kitty',
    label: 'Kitty Mode',
    colors: {
      header: 'bg-orange-400',
      headerText: 'text-white',
      background: 'bg-orange-50',
      grid: 'bg-orange-200',
      cell: 'bg-white',
      cellText: 'text-orange-900',
      freeSpace: 'bg-orange-500',
      freeSpaceText: 'text-white',
      border: 'border-orange-200',
      outerBorder: 'border-orange-400',
    }
  },
  puppy: {
    id: 'puppy',
    label: 'Puppy Mode',
    colors: {
      header: 'bg-orange-400',
      headerText: 'text-white',
      background: 'bg-orange-50',
      grid: 'bg-orange-200',
      cell: 'bg-white',
      cellText: 'text-orange-900',
      freeSpace: 'bg-orange-500',
      freeSpaceText: 'text-white',
      border: 'border-orange-200',
      outerBorder: 'border-orange-400',
    }
  },
  pokemon: {
    id: 'pokemon',
    label: 'Pokémon Mode',
    colors: {
      header: 'bg-white border-4 border-black',
      headerText: 'text-yellow-400', // We will override this with specific styles for the outline
      background: 'bg-gray-100',
      grid: 'bg-gray-800',
      cell: 'bg-white',
      cellText: 'text-gray-900',
      freeSpace: 'bg-red-600',
      freeSpaceText: 'text-white',
      border: 'border-gray-300',
      outerBorder: 'border-black',
    }
  },
  sushi: {
    id: 'sushi',
    label: 'Sushi Mode',
    colors: {
      header: 'bg-red-500', // Salmon
      headerText: 'text-white',
      background: 'bg-stone-100', // Rice color ish
      grid: 'bg-stone-800', // Nori
      cell: 'bg-stone-50',
      cellText: 'text-stone-900',
      freeSpace: 'bg-green-500', // Wasabi
      freeSpaceText: 'text-white',
      border: 'border-stone-300',
      outerBorder: 'border-stone-900',
    }
  }
};
