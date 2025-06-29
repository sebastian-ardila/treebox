import { useState, useMemo, useCallback } from 'react';
import { 
  ALL_CSS_PROPERTIES,
  getCSSCategories,
  type CSSProperty 
} from '../data/cssData';

type PropertyCategory = string;

export const useCSSProperties = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory | null>(null);
  const [selectedProperties, setSelectedProperties] = useState<Map<string, string>>(new Map());

  const filteredProperties = useMemo(() => {
    let properties = ALL_CSS_PROPERTIES;

    if (searchQuery) {
      properties = properties.filter(prop => 
        prop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      properties = properties.filter(prop => prop.category === selectedCategory);
    }

    return properties;
  }, [searchQuery, selectedCategory]);

  const propertiesByCategory = useMemo(() => {
    const categories: Record<string, CSSProperty[]> = {};
    ALL_CSS_PROPERTIES.forEach(prop => {
      if (!categories[prop.category]) {
        categories[prop.category] = [];
      }
      categories[prop.category].push(prop);
    });
    return categories;
  }, []);

  const categories = useMemo(() => {
    return getCSSCategories();
  }, []);

  const addProperty = useCallback((property: string, value: string) => {
    setSelectedProperties(prev => {
      const newMap = new Map(prev);
      newMap.set(property, value);
      return newMap;
    });
  }, []);

  const removeProperty = useCallback((property: string) => {
    setSelectedProperties(prev => {
      const newMap = new Map(prev);
      newMap.delete(property);
      return newMap;
    });
  }, []);

  const updateProperty = useCallback((property: string, value: string) => {
    setSelectedProperties(prev => {
      const newMap = new Map(prev);
      newMap.set(property, value);
      return newMap;
    });
  }, []);

  const clearAllProperties = useCallback(() => {
    setSelectedProperties(new Map());
  }, []);

  const generateCSS = useCallback(() => {
    const cssRules: string[] = [];
    selectedProperties.forEach((value, property) => {
      cssRules.push(`${property}: ${value};`);
    });
    return cssRules.join('\n');
  }, [selectedProperties]);

  const getPropertyInfo = useCallback((propertyName: string): CSSProperty | undefined => {
    return ALL_CSS_PROPERTIES.find(prop => prop.name === propertyName);
  }, []);

  return {
    properties: filteredProperties,
    propertiesByCategory,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedProperties: Array.from(selectedProperties.entries()).map(([property, value]) => ({
      property,
      value,
    })),
    addProperty,
    removeProperty,
    updateProperty,
    clearAllProperties,
    generateCSS,
    getPropertyInfo,
    categories,
    totalProperties: ALL_CSS_PROPERTIES.length,
    filteredCount: filteredProperties.length,
  };
};