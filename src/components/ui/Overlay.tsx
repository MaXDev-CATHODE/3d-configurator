import { motion } from 'framer-motion';
import { ShoppingCart, Check, Upload } from 'lucide-react';
import { useRef } from 'react';
import { useConfiguratorStore, OPTIONS, type ModelType } from '../../store/useConfiguratorStore';

export const Overlay = () => {
  const { activeModel, setModel, config, setOption, totalPrice, setUploadedModelUrl } = useConfiguratorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modelOptions = [
    { id: 'custom', label: 'Twój Model 3D' },
    { id: 'watch', label: 'Zegarek Luksusowy' },
    { id: 'car', label: 'Auto Sportowe' },
    { id: 'bike', label: 'Rower Miejski' },
    { id: 'upload', label: 'Wgraj Własny' },
  ] as const;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedModelUrl(url);
      setModel('upload' as ModelType);
    }
  };

  const currentOptions = OPTIONS[activeModel as keyof typeof OPTIONS] || {};
  const currentConfig = config[activeModel as keyof typeof config] || {};

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
      
      {/* Header - Top Left */}
      <header className="p-8 pointer-events-auto">
        <h1 className="text-3xl font-light text-white tracking-widest uppercase mb-6">
          Premium<span className="font-bold">Builder</span>
        </h1>
        <div className="flex gap-4">
          {modelOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                if (opt.id === 'upload') {
                  fileInputRef.current?.click();
                } else {
                  setModel(opt.id as ModelType);
                }
              }}
              className={`px-4 py-2 rounded-full border text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeModel === opt.id 
                  ? 'border-white text-white bg-white/10' 
                  : 'border-white/20 text-white/50 hover:text-white/80'
              }`}
            >
              {opt.id === 'upload' && <Upload size={14} />}
              {opt.label}
            </button>
          ))}
          <input 
            type="file" 
            ref={fileInputRef} 
            hidden 
            accept=".glb" 
            onChange={handleFileUpload} 
          />
        </div>
      </header>

      {/* Right Sidebar - Configurator */}
      <div className="absolute right-0 top-0 bottom-0 w-96 p-8 flex flex-col justify-center pointer-events-auto">
        <motion.div 
          key={activeModel}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
        >
          <h2 className="text-xl font-medium text-white mb-8 capitalize">Konfiguracja</h2>
          
          <div className="space-y-8">
            {Object.entries(currentOptions).map(([partKey, optionsArray]) => (
              <div key={partKey}>
                <h3 className="text-sm text-white/50 uppercase tracking-widest mb-4">
                  {partKey}
                </h3>
                <div className="flex gap-4">
                  {(optionsArray as any[]).map((opt, idx) => {
                    // @ts-ignore - dynamic keying
                    const isSelected = currentConfig[partKey] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setOption(activeModel, partKey, idx)}
                        className={`group relative w-12 h-12 rounded-full border-2 transition-all ${
                          isSelected ? 'border-white scale-110' : 'border-transparent hover:border-white/30'
                        }`}
                        style={{ backgroundColor: opt.hex }}
                        title={`${opt.name} (+${opt.price} PLN)`}
                      >
                        {isSelected && (
                          <Check className="absolute inset-0 m-auto w-5 h-5 text-white/80 mix-blend-difference" />
                        )}
                        
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white text-xs py-1 px-2 rounded pointer-events-none">
                          {opt.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-white/50 uppercase tracking-widest mb-2">Cena Totalna</p>
            <div className="text-4xl font-light text-white mb-8">
              {totalPrice.toLocaleString('pl-PL')} <span className="text-xl text-white/50">PLN</span>
            </div>
            
            <button className="w-full bg-white text-black py-4 rounded-xl uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Dodaj do koszyka
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Footer text */}
      <div className="absolute bottom-8 left-8 text-white/30 text-xs tracking-widest">
        Obracaj model używając myszy. Przybliżaj rolką.
      </div>

    </div>
  );
};
