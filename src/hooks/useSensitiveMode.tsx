import React from 'react';

interface ISensitiveModeContext {
  sensitiveModeEnabled: boolean;
  setSensitiveMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SensitiveModeContext = React.createContext({} as ISensitiveModeContext);

interface SensitiveModeProviderProps {
  children: React.ReactNode;
}

function SensitiveModeProvider({ children }: SensitiveModeProviderProps) {
  const [sensitiveModeEnabled, setSensitiveMode] = React.useState(false);

  return (
    <SensitiveModeContext.Provider
      value={{ sensitiveModeEnabled, setSensitiveMode }}
    >
      {children}
    </SensitiveModeContext.Provider>
  );
}

function useSensitiveMode() {
  const ctx = React.useContext(SensitiveModeContext);

  if (!ctx) {
    throw new Error('useSensitiveMode must be within SensitiveModeProvider');
  }

  return ctx;
}

export { SensitiveModeProvider, useSensitiveMode };
