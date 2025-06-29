import { useState, useMemo, useCallback } from 'react';
import { 
  HTML_ELEMENTS_BY_CATEGORY,
  getElementById,
  type HTMLElement 
} from '../data/cssData';

type ElementCategory = keyof typeof HTML_ELEMENTS_BY_CATEGORY;

export const useHTMLElements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  const allElements = useMemo(() => {
    return Object.values(HTML_ELEMENTS_BY_CATEGORY).flat();
  }, []);

  const filteredElements = useMemo(() => {
    let elements = allElements;

    if (searchQuery) {
      elements = elements.filter(el => 
        el.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      elements = HTML_ELEMENTS_BY_CATEGORY[selectedCategory] || [];
      if (searchQuery) {
        elements = elements.filter(el => 
          el.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }

    return elements;
  }, [searchQuery, selectedCategory, allElements]);

  const categories = useMemo(() => {
    return Object.keys(HTML_ELEMENTS_BY_CATEGORY) as ElementCategory[];
  }, []);

  const selectElement = useCallback((tag: string) => {
    const element = getElementById(tag);
    setSelectedElement(element || null);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedElement(null);
  }, []);

  const getCategoryCount = useCallback((category: ElementCategory) => {
    return HTML_ELEMENTS_BY_CATEGORY[category]?.length || 0;
  }, []);

  return {
    elements: filteredElements,
    elementsByCategory: HTML_ELEMENTS_BY_CATEGORY,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedElement,
    selectElement,
    clearSelection,
    categories,
    getCategoryCount,
    totalElements: allElements.length,
    filteredCount: filteredElements.length,
  };
};