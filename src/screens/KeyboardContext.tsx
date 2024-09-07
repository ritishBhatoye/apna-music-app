import React, { createContext, useState, useContext, ReactNode } from 'react';

type KeyboardContextType = {
  keyboard: string;
  setKeyboard: (keyboard: string) => void;
};

const KeyboardContext = createContext<KeyboardContextType | undefined>(undefined);

interface KeyboardProviderProps {
  children: ReactNode;
}

export const KeyboardProvider: React.FC<KeyboardProviderProps> = ({ children }) => {
  const [keyboard, setKeyboard] = useState('QWERTY');

  return (
    <KeyboardContext.Provider value={{ keyboard, setKeyboard }}>
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyboard = () => {
  const context = useContext(KeyboardContext);
  if (context === undefined) {
    throw new Error('useKeyboard must be used within a KeyboardProvider');
  }
  return context;
};