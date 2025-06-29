import { useState, useMemo, useCallback } from 'react';
import { 
  ELEMENT_CONFIGURATIONS,
  getConfigurationsByElement,
  type ElementConfiguration 
} from '../data/cssData';

export const useElementConfigurations = (elementTag?: string) => {
  const [selectedConfiguration, setSelectedConfiguration] = useState<ElementConfiguration | null>(null);
  const [customStyles, setCustomStyles] = useState<Record<string, string>>({});

  const availableConfigurations = useMemo(() => {
    if (!elementTag) {
      return ELEMENT_CONFIGURATIONS;
    }
    return getConfigurationsByElement(elementTag);
  }, [elementTag]);

  const applyConfiguration = useCallback((config: ElementConfiguration) => {
    setSelectedConfiguration(config);
    const styles: Record<string, string> = {};
    config.propertyValues.forEach(pv => {
      styles[pv.name] = pv.value + (pv.unit || '');
    });
    setCustomStyles(styles);
  }, []);

  const updateStyle = useCallback((property: string, value: string) => {
    setCustomStyles(prev => ({
      ...prev,
      [property]: value,
    }));
  }, []);

  const removeStyle = useCallback((property: string) => {
    setCustomStyles(prev => {
      const newStyles = { ...prev };
      delete newStyles[property];
      return newStyles;
    });
  }, []);

  const resetToConfiguration = useCallback(() => {
    if (selectedConfiguration) {
      const styles: Record<string, string> = {};
      selectedConfiguration.propertyValues.forEach(pv => {
        styles[pv.name] = pv.value + (pv.unit || '');
      });
      setCustomStyles(styles);
    }
  }, [selectedConfiguration]);

  const clearConfiguration = useCallback(() => {
    setSelectedConfiguration(null);
    setCustomStyles({});
  }, []);

  const generateCSS = useCallback((selector: string = '*') => {
    const cssRules = Object.entries(customStyles)
      .map(([property, value]) => `  ${property}: ${value};`)
      .join('\n');
    
    return `${selector} {\n${cssRules}\n}`;
  }, [customStyles]);

  const mergeWithConfiguration = useCallback((config: ElementConfiguration) => {
    const configStyles: Record<string, string> = {};
    config.propertyValues.forEach(pv => {
      configStyles[pv.name] = pv.value + (pv.unit || '');
    });
    setCustomStyles(prev => ({
      ...configStyles,
      ...prev,
    }));
  }, []);

  return {
    configurations: availableConfigurations,
    selectedConfiguration,
    customStyles,
    applyConfiguration,
    updateStyle,
    removeStyle,
    resetToConfiguration,
    clearConfiguration,
    generateCSS,
    mergeWithConfiguration,
    hasCustomStyles: Object.keys(customStyles).length > 0,
  };
};