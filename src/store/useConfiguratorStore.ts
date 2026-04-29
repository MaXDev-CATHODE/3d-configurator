import { create } from 'zustand';

export type ModelType = 'custom' | 'watch' | 'car' | 'bike' | 'upload';

export const OPTIONS = {
  custom: {
    body: [
      { name: 'Srebro', hex: '#e0e0e0', price: 0 },
      { name: 'Złoto', hex: '#d4af37', price: 500 },
      { name: 'Czerwień', hex: '#aa0000', price: 100 },
    ],
    material: [
      { name: 'Błyszczący Plastik', hex: '#ffffff', price: 0 },
      { name: 'Metal', hex: '#aaaaaa', price: 200 },
      { name: 'Matowy', hex: '#333333', price: 50 },
    ]
  },
  upload: {
    body: [
      { name: 'Szary', hex: '#888888', price: 0 },
      { name: 'Czerń', hex: '#111111', price: 100 },
      { name: 'Biel', hex: '#ffffff', price: 50 },
    ],
    material: [
      { name: 'Błyszczący Plastik', hex: '#ffffff', price: 0 },
      { name: 'Metal', hex: '#aaaaaa', price: 0 },
      { name: 'Matowy', hex: '#333333', price: 0 },
    ]
  },
  watch: {
    case: [
      { name: 'Srebro', hex: '#e0e0e0', price: 0 },
      { name: 'Złoto', hex: '#d4af37', price: 500 },
      { name: 'Obsydian', hex: '#1a1a1a', price: 200 },
    ],
    strap: [
      { name: 'Skóra', hex: '#8b4513', price: 150 },
      { name: 'Guma', hex: '#111111', price: 0 },
      { name: 'Stal', hex: '#b0b0b0', price: 300 },
    ]
  },
  car: {
    body: [
      { name: 'Krwista Czerwień', hex: '#aa0000', price: 0 },
      { name: 'Głęboka Czerń', hex: '#050505', price: 2000 },
      { name: 'Śnieżna Biel', hex: '#f0f0f0', price: 1000 },
    ],
    wheels: [
      { name: 'Srebrne', hex: '#cccccc', price: 0 },
      { name: 'Matowa Czerń', hex: '#1a1a1a', price: 800 },
    ]
  },
  bike: {
    frame: [
      { name: 'Matowa Czerń', hex: '#222222', price: 0 },
      { name: 'Neonowa Zieleń', hex: '#39ff14', price: 150 },
      { name: 'Czerwień Wyścigowa', hex: '#cc0000', price: 100 },
    ],
    saddle: [
      { name: 'Czarna', hex: '#111111', price: 0 },
      { name: 'Brązowa Skóra', hex: '#654321', price: 80 },
    ]
  }
};

const BASE_PRICES: Record<ModelType, number> = {
  custom: 5000,
  upload: 0,
  watch: 1200,
  car: 150000,
  bike: 3500,
};

interface ConfiguratorState {
  activeModel: ModelType;
  uploadedModelUrl: string | null;
  config: {
    custom: { body: number; material: number };
    upload: { body: number; material: number };
    watch: { case: number; strap: number };
    car: { body: number; wheels: number };
    bike: { frame: number; saddle: number };
  };
  totalPrice: number;
  setModel: (model: ModelType) => void;
  setUploadedModelUrl: (url: string) => void;
  setOption: (model: ModelType, part: string, optionIndex: number) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  activeModel: 'custom',
  uploadedModelUrl: null,
  config: {
    custom: { body: 0, material: 0 },
    upload: { body: 0, material: 0 },
    watch: { case: 0, strap: 0 },
    car: { body: 0, wheels: 0 },
    bike: { frame: 0, saddle: 0 },
  },
  totalPrice: BASE_PRICES.custom,

  setUploadedModelUrl: (url) => set({ uploadedModelUrl: url }),

  setModel: (model) => {
    set({ activeModel: model });
    // Recalculate price
    const state = get();
    const base = BASE_PRICES[model];
    let extra = 0;
    if (model === 'custom') {
      extra += OPTIONS.custom.body[state.config.custom.body].price;
      extra += OPTIONS.custom.material[state.config.custom.material].price;
    } else if (model === 'upload') {
      extra += OPTIONS.upload.body[state.config.upload.body].price;
      extra += OPTIONS.upload.material[state.config.upload.material].price;
    } else if (model === 'watch') {
      extra += OPTIONS.watch.case[state.config.watch.case].price;
      extra += OPTIONS.watch.strap[state.config.watch.strap].price;
    } else if (model === 'car') {
      extra += OPTIONS.car.body[state.config.car.body].price;
      extra += OPTIONS.car.wheels[state.config.car.wheels].price;
    } else if (model === 'bike') {
      extra += OPTIONS.bike.frame[state.config.bike.frame].price;
      extra += OPTIONS.bike.saddle[state.config.bike.saddle].price;
    }
    set({ totalPrice: base + extra });
  },

  setOption: (model, part, optionIndex) => {
    set((state) => {
      const newConfig = {
        ...state.config,
        [model]: {
          ...state.config[model],
          [part]: optionIndex,
        }
      };

      // Recalculate price
      const base = BASE_PRICES[model];
      let extra = 0;
      if (model === 'custom') {
        extra += OPTIONS.custom.body[newConfig.custom.body].price;
        extra += OPTIONS.custom.material[newConfig.custom.material].price;
      } else if (model === 'upload') {
        extra += OPTIONS.upload.body[newConfig.upload.body].price;
        extra += OPTIONS.upload.material[newConfig.upload.material].price;
      } else if (model === 'watch') {
        extra += OPTIONS.watch.case[newConfig.watch.case].price;
        extra += OPTIONS.watch.strap[newConfig.watch.strap].price;
      } else if (model === 'car') {
        extra += OPTIONS.car.body[newConfig.car.body].price;
        extra += OPTIONS.car.wheels[newConfig.car.wheels].price;
      } else if (model === 'bike') {
        extra += OPTIONS.bike.frame[newConfig.bike.frame].price;
        extra += OPTIONS.bike.saddle[newConfig.bike.saddle].price;
      }

      return {
        config: newConfig,
        totalPrice: base + extra,
      };
    });
  }
}));
