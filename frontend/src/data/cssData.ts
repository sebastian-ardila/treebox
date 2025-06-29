import { 
  Box, 
  Type, 
  Layout, 
  FileText, 
  Link, 
  Square, 
  List, 
  Circle, 
  Grid3x3, 
  Image, 
  Play 
} from 'lucide-react';
import type { ElementType } from 'react';

// ========================================
// INTERFACES DE TIPOS DE DATOS
// ========================================

export interface HTMLElement {
  tag: string;
  label: string;
  icon: ElementType;
  description: string;
  documentationUrl: string;
}

export interface ElementConfiguration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isDefault: boolean;
  elementId: string;
  documentationUrl: string;
  propertyValues: PropertyValue[];
  preview: {
    code: string;
    description: string;
    useCase: string;
  };
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularity: number;
}

export interface PropertyValue {
  propertyId: string;
  name: string;
  value: string;
  unit?: string;
  important?: boolean;
  comment?: string;
  description?: string;
}

export interface CSSProperty {
  name: string;
  category: string;
  description: string;
  documentationUrl: string;
}

// ========================================
// ELEMENTOS HTML ORGANIZADOS POR CATEGORÍAS
// ========================================

export const HTML_ELEMENTS_BY_CATEGORY: Record<string, HTMLElement[]> = {
  'Container': [
    { 
      tag: 'div', 
      label: 'Div', 
      icon: Box, 
      description: 'Contenedor genérico de bloque para agrupar otros elementos',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div'
    },
    { 
      tag: 'span', 
      label: 'Span', 
      icon: Type, 
      description: 'Contenedor en línea para aplicar estilos a texto',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span'
    },
  ],
  'Structure': [
    { 
      tag: 'header', 
      label: 'Header', 
      icon: Layout, 
      description: 'Cabecera de página o sección con navegación y títulos',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header'
    },
    { 
      tag: 'nav', 
      label: 'Nav', 
      icon: Layout, 
      description: 'Navegación principal con enlaces y menús',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav'
    },
    { 
      tag: 'main', 
      label: 'Main', 
      icon: Layout, 
      description: 'Contenido principal único de la página',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main'
    },
    { 
      tag: 'section', 
      label: 'Section', 
      icon: Layout, 
      description: 'Sección temática de contenido relacionado',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section'
    },
    { 
      tag: 'article', 
      label: 'Article', 
      icon: FileText, 
      description: 'Contenido independiente como posts o noticias',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article'
    },
    { 
      tag: 'aside', 
      label: 'Aside', 
      icon: Layout, 
      description: 'Contenido lateral como sidebars o widgets',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside'
    },
    { 
      tag: 'footer', 
      label: 'Footer', 
      icon: Layout, 
      description: 'Pie de página con información adicional',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer'
    },
  ],
  'Text': [
    { 
      tag: 'p', 
      label: 'Paragraph', 
      icon: FileText, 
      description: 'Párrafo de texto con espaciado automático',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p'
    },
    { 
      tag: 'h1', 
      label: 'H1', 
      icon: Type, 
      description: 'Título principal de nivel 1 (más importante)',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    { 
      tag: 'h2', 
      label: 'H2', 
      icon: Type, 
      description: 'Subtítulo de nivel 2 para secciones',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    { 
      tag: 'h3', 
      label: 'H3', 
      icon: Type, 
      description: 'Subtítulo de nivel 3 para subsecciones',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    { 
      tag: 'h4', 
      label: 'H4', 
      icon: Type, 
      description: 'Subtítulo de nivel 4 para contenido específico',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    { 
      tag: 'h5', 
      label: 'H5', 
      icon: Type, 
      description: 'Subtítulo de nivel 5 para detalles menores',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    { 
      tag: 'h6', 
      label: 'H6', 
      icon: Type, 
      description: 'Subtítulo de nivel 6 (menos importante)',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
  ],
  'Interactive': [
    { 
      tag: 'a', 
      label: 'Anchor', 
      icon: Link, 
      description: 'Enlace navegable a otras páginas o secciones',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a'
    },
    { 
      tag: 'button', 
      label: 'Button', 
      icon: Square, 
      description: 'Botón interactivo para acciones y formularios',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button'
    },
  ],
  'Form': [
    { 
      tag: 'form', 
      label: 'Form', 
      icon: Square, 
      description: 'Formulario para recopilar datos del usuario',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form'
    },
    { 
      tag: 'input', 
      label: 'Input', 
      icon: Square, 
      description: 'Campo de entrada para texto, números, fechas, etc.',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input'
    },
    { 
      tag: 'textarea', 
      label: 'Textarea', 
      icon: Square, 
      description: 'Área de texto multilínea para contenido extenso',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea'
    },
    { 
      tag: 'select', 
      label: 'Select', 
      icon: List, 
      description: 'Lista desplegable con opciones seleccionables',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select'
    },
    { 
      tag: 'label', 
      label: 'Label', 
      icon: Type, 
      description: 'Etiqueta descriptiva asociada a campos de formulario',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label'
    },
  ],
  'List': [
    { 
      tag: 'ul', 
      label: 'UL', 
      icon: List, 
      description: 'Lista no ordenada con viñetas',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul'
    },
    { 
      tag: 'ol', 
      label: 'OL', 
      icon: List, 
      description: 'Lista ordenada con numeración',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol'
    },
    { 
      tag: 'li', 
      label: 'LI', 
      icon: Circle, 
      description: 'Elemento individual dentro de una lista',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li'
    },
  ],
  'Table': [
    { 
      tag: 'table', 
      label: 'Table', 
      icon: Grid3x3, 
      description: 'Tabla para mostrar datos tabulares estructurados',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table'
    },
    { 
      tag: 'thead', 
      label: 'THead', 
      icon: Square, 
      description: 'Cabecera de tabla con títulos de columnas',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead'
    },
    { 
      tag: 'tbody', 
      label: 'TBody', 
      icon: Square, 
      description: 'Cuerpo principal de la tabla con datos',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody'
    },
    { 
      tag: 'tr', 
      label: 'TR', 
      icon: Square, 
      description: 'Fila de tabla que contiene celdas',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr'
    },
    { 
      tag: 'th', 
      label: 'TH', 
      icon: Square, 
      description: 'Celda de encabezado con texto en negrita',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th'
    },
    { 
      tag: 'td', 
      label: 'TD', 
      icon: Square, 
      description: 'Celda de datos normal en la tabla',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td'
    },
  ],
  'Media': [
    { 
      tag: 'img', 
      label: 'Image', 
      icon: Image, 
      description: 'Imagen estática con soporte para alt y responsive',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img'
    },
    { 
      tag: 'video', 
      label: 'Video', 
      icon: Play, 
      description: 'Reproductor de video con controles nativos',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video'
    },
    { 
      tag: 'audio', 
      label: 'Audio', 
      icon: Play, 
      description: 'Reproductor de audio con controles de reproducción',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio'
    },
    { 
      tag: 'picture', 
      label: 'Picture', 
      icon: Image, 
      description: 'Contenedor para imágenes responsive con múltiples fuentes',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture'
    },
  ]
};

// ========================================
// CONFIGURACIONES PREDEFINIDAS POR ELEMENTO
// ========================================

export const ELEMENT_CONFIGURATIONS: Record<string, ElementConfiguration[]> = {
  'div': [
    {
      id: 'div-flexbox-container',
      name: 'Flexbox Container',
      description: 'Contenedor flexible centrado horizontal y verticalmente',
      icon: 'Layout',
      category: 'layout',
      isDefault: true,
      elementId: 'div',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout',
      propertyValues: [
        { propertyId: 'display', name: 'display', value: 'flex', comment: 'Activa el layout flexbox' },
        { propertyId: 'justify-content', name: 'justify-content', value: 'center', comment: 'Centra horizontalmente' },
        { propertyId: 'align-items', name: 'align-items', value: 'center', comment: 'Centra verticalmente' },
        { propertyId: 'min-height', name: 'min-height', value: '200px', comment: 'Altura mínima visible' },
        { propertyId: 'padding', name: 'padding', value: '1rem', comment: 'Espaciado interno' },
        { propertyId: 'gap', name: 'gap', value: '1rem', comment: 'Espacio entre elementos hijo' }
      ],
      preview: {
        code: 'display: flex;\njustify-content: center;\nalign-items: center;\nmin-height: 200px;\npadding: 1rem;\ngap: 1rem;',
        description: 'Contenedor flexbox centrado perfecto para layouts modernos',
        useCase: 'Cards, modales, secciones principales'
      },
      tags: ['responsive', 'modern', 'layout'],
      difficulty: 'beginner',
      popularity: 9
    },
    {
      id: 'div-grid-layout',
      name: 'Grid Layout',
      description: 'Sistema de rejilla CSS Grid con 3 columnas responsivas',
      icon: 'Grid3x3',
      category: 'layout',
      isDefault: false,
      elementId: 'div',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout',
      propertyValues: [
        { propertyId: 'display', name: 'display', value: 'grid', comment: 'Activa CSS Grid' },
        { propertyId: 'grid-template-columns', name: 'grid-template-columns', value: 'repeat(3, 1fr)', comment: '3 columnas iguales' },
        { propertyId: 'gap', name: 'gap', value: '1rem', comment: 'Espacio entre celdas' },
        { propertyId: 'padding', name: 'padding', value: '1rem', comment: 'Espaciado interno' }
      ],
      preview: {
        code: 'display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 1rem;\npadding: 1rem;',
        description: 'Rejilla de 3 columnas perfecta para galerías y layouts complejos',
        useCase: 'Galerías, dashboards, layouts de productos'
      },
      tags: ['responsive', 'grid', 'advanced'],
      difficulty: 'intermediate',
      popularity: 8
    }
  ],
  'button': [
    {
      id: 'button-primary',
      name: 'Primary Button',
      description: 'Botón principal con estilo moderno y efectos hover',
      icon: 'Square',
      category: 'component',
      isDefault: true,
      elementId: 'button',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#styling_with_css',
      propertyValues: [
        { propertyId: 'background-color', name: 'background-color', value: '#007bff', comment: 'Color azul principal' },
        { propertyId: 'color', name: 'color', value: 'white', comment: 'Texto blanco' },
        { propertyId: 'padding', name: 'padding', value: '0.5rem 1rem', comment: 'Espaciado cómodo' },
        { propertyId: 'border', name: 'border', value: 'none', comment: 'Sin borde' },
        { propertyId: 'border-radius', name: 'border-radius', value: '0.25rem', comment: 'Esquinas redondeadas' },
        { propertyId: 'cursor', name: 'cursor', value: 'pointer', comment: 'Cursor de mano' },
        { propertyId: 'font-weight', name: 'font-weight', value: '500', comment: 'Texto semi-bold' },
        { propertyId: 'transition', name: 'transition', value: 'background-color 0.2s ease', comment: 'Transición suave' }
      ],
      preview: {
        code: 'background-color: #007bff;\ncolor: white;\npadding: 0.5rem 1rem;\nborder: none;\nborder-radius: 0.25rem;\ncursor: pointer;\nfont-weight: 500;\ntransition: background-color 0.2s ease;',
        description: 'Botón principal con hover effect y diseño moderno',
        useCase: 'Formularios, CTAs, acciones principales'
      },
      tags: ['interactive', 'modern', 'hover'],
      difficulty: 'beginner',
      popularity: 10
    },
    {
      id: 'button-outline',
      name: 'Outline Button',
      description: 'Botón con borde y fondo transparente',
      icon: 'Square',
      category: 'component',
      isDefault: false,
      elementId: 'button',
      documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#styling_with_css',
      propertyValues: [
        { propertyId: 'background-color', name: 'background-color', value: 'transparent', comment: 'Fondo transparente' },
        { propertyId: 'color', name: 'color', value: '#007bff', comment: 'Texto azul' },
        { propertyId: 'border', name: 'border', value: '1px solid #007bff', comment: 'Borde azul' },
        { propertyId: 'padding', name: 'padding', value: '0.5rem 1rem', comment: 'Espaciado cómodo' },
        { propertyId: 'border-radius', name: 'border-radius', value: '0.25rem', comment: 'Esquinas redondeadas' },
        { propertyId: 'cursor', name: 'cursor', value: 'pointer', comment: 'Cursor de mano' },
        { propertyId: 'transition', name: 'transition', value: 'all 0.2s ease', comment: 'Transición suave' }
      ],
      preview: {
        code: 'background-color: transparent;\ncolor: #007bff;\nborder: 1px solid #007bff;\npadding: 0.5rem 1rem;\nborder-radius: 0.25rem;\ncursor: pointer;\ntransition: all 0.2s ease;',
        description: 'Botón secundario con estilo outline y hover effect',
        useCase: 'Acciones secundarias, cancelar, botones alternativos'
      },
      tags: ['interactive', 'outline', 'secondary'],
      difficulty: 'beginner',
      popularity: 7
    }
  ]
};

// ========================================
// PROPIEDADES CSS COMPLETAS CON DOCUMENTACIÓN
// ========================================

export const ALL_CSS_PROPERTIES: CSSProperty[] = [
  // Dimensiones
  { name: 'width', category: 'dimensions', description: 'Ancho del elemento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/width' },
  { name: 'height', category: 'dimensions', description: 'Alto del elemento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/height' },
  { name: 'min-width', category: 'dimensions', description: 'Ancho mínimo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/min-width' },
  { name: 'max-width', category: 'dimensions', description: 'Ancho máximo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/max-width' },
  { name: 'min-height', category: 'dimensions', description: 'Alto mínimo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/min-height' },
  { name: 'max-height', category: 'dimensions', description: 'Alto máximo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/max-height' },
  
  // Layout
  { name: 'display', category: 'layout', description: 'Tipo de renderizado', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/display' },
  { name: 'position', category: 'layout', description: 'Método de posicionamiento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/position' },
  { name: 'top', category: 'layout', description: 'Distancia desde arriba', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/top' },
  { name: 'right', category: 'layout', description: 'Distancia desde la derecha', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/right' },
  { name: 'bottom', category: 'layout', description: 'Distancia desde abajo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/bottom' },
  { name: 'left', category: 'layout', description: 'Distancia desde la izquierda', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/left' },
  { name: 'z-index', category: 'layout', description: 'Orden de apilamiento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/z-index' },
  { name: 'float', category: 'layout', description: 'Flotación del elemento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/float' },
  { name: 'clear', category: 'layout', description: 'Limpia flotaciones', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/clear' },
  
  // Espaciado
  { name: 'margin', category: 'spacing', description: 'Margen exterior', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/margin' },
  { name: 'margin-top', category: 'spacing', description: 'Margen superior', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top' },
  { name: 'margin-right', category: 'spacing', description: 'Margen derecho', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right' },
  { name: 'margin-bottom', category: 'spacing', description: 'Margen inferior', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom' },
  { name: 'margin-left', category: 'spacing', description: 'Margen izquierdo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left' },
  { name: 'padding', category: 'spacing', description: 'Relleno interior', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/padding' },
  { name: 'padding-top', category: 'spacing', description: 'Relleno superior', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top' },
  { name: 'padding-right', category: 'spacing', description: 'Relleno derecho', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right' },
  { name: 'padding-bottom', category: 'spacing', description: 'Relleno inferior', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom' },
  { name: 'padding-left', category: 'spacing', description: 'Relleno izquierdo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left' },
  
  // Bordes  
  { name: 'border', category: 'border', description: 'Borde completo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border' },
  { name: 'border-width', category: 'border', description: 'Grosor del borde', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-width' },
  { name: 'border-style', category: 'border', description: 'Estilo del borde', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-style' },
  { name: 'border-color', category: 'border', description: 'Color del borde', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-color' },
  { name: 'border-radius', category: 'border', description: 'Esquinas redondeadas', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius' },
  { name: 'border-top', category: 'border', description: 'Borde superior', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-top' },
  { name: 'border-right', category: 'border', description: 'Borde derecho', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-right' },
  { name: 'border-bottom', category: 'border', description: 'Borde inferior', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom' },
  { name: 'border-left', category: 'border', description: 'Borde izquierdo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/border-left' },
  
  // Flexbox
  { name: 'flex', category: 'flexbox', description: 'Propiedad flex shorthand', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex' },
  { name: 'flex-direction', category: 'flexbox', description: 'Dirección del flex', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction' },
  { name: 'flex-wrap', category: 'flexbox', description: 'Envoltorio flex', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap' },
  { name: 'flex-grow', category: 'flexbox', description: 'Factor de crecimiento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow' },
  { name: 'flex-shrink', category: 'flexbox', description: 'Factor de encogimiento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink' },
  { name: 'flex-basis', category: 'flexbox', description: 'Tamaño base flex', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis' },
  { name: 'justify-content', category: 'flexbox', description: 'Alineación horizontal', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content' },
  { name: 'align-items', category: 'flexbox', description: 'Alineación vertical', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/align-items' },
  { name: 'align-content', category: 'flexbox', description: 'Alineación de contenido', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/align-content' },
  { name: 'align-self', category: 'flexbox', description: 'Auto-alineación', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/align-self' },
  { name: 'gap', category: 'flexbox', description: 'Espacio entre elementos', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/gap' },
  
  // Grid
  { name: 'grid', category: 'grid', description: 'Grid shorthand', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid' },
  { name: 'grid-template-columns', category: 'grid', description: 'Columnas de la rejilla', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns' },
  { name: 'grid-template-rows', category: 'grid', description: 'Filas de la rejilla', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows' },
  { name: 'grid-template-areas', category: 'grid', description: 'Áreas de la rejilla', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas' },
  { name: 'grid-column', category: 'grid', description: 'Posición en columna', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column' },
  { name: 'grid-row', category: 'grid', description: 'Posición en fila', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row' },
  { name: 'grid-area', category: 'grid', description: 'Área del elemento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area' },
  
  // Tipografía
  { name: 'color', category: 'typography', description: 'Color del texto', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color' },
  { name: 'font-family', category: 'typography', description: 'Familia tipográfica', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-family' },
  { name: 'font-size', category: 'typography', description: 'Tamaño de fuente', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-size' },
  { name: 'font-weight', category: 'typography', description: 'Peso de fuente', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight' },
  { name: 'font-style', category: 'typography', description: 'Estilo de fuente', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-style' },
  { name: 'line-height', category: 'typography', description: 'Altura de línea', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/line-height' },
  { name: 'text-align', category: 'typography', description: 'Alineación de texto', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-align' },
  { name: 'text-decoration', category: 'typography', description: 'Decoración de texto', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration' },
  { name: 'text-transform', category: 'typography', description: 'Transformación de texto', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform' },
  { name: 'letter-spacing', category: 'typography', description: 'Espaciado entre letras', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing' },
  { name: 'word-spacing', category: 'typography', description: 'Espaciado entre palabras', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing' },
  
  // Fondo
  { name: 'background', category: 'background', description: 'Fondo shorthand', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background' },
  { name: 'background-color', category: 'background', description: 'Color de fondo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-color' },
  { name: 'background-image', category: 'background', description: 'Imagen de fondo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-image' },
  { name: 'background-repeat', category: 'background', description: 'Repetición de fondo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat' },
  { name: 'background-position', category: 'background', description: 'Posición de fondo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-position' },
  { name: 'background-size', category: 'background', description: 'Tamaño de fondo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/background-size' },
  
  // Efectos
  { name: 'opacity', category: 'effects', description: 'Transparencia', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/opacity' },
  { name: 'visibility', category: 'effects', description: 'Visibilidad del elemento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/visibility' },
  { name: 'overflow', category: 'effects', description: 'Comportamiento del desbordamiento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/overflow' },
  { name: 'overflow-x', category: 'effects', description: 'Desbordamiento horizontal', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x' },
  { name: 'overflow-y', category: 'effects', description: 'Desbordamiento vertical', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y' },
  { name: 'box-shadow', category: 'effects', description: 'Sombra de caja', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow' },
  { name: 'text-shadow', category: 'effects', description: 'Sombra de texto', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow' },
  { name: 'filter', category: 'effects', description: 'Filtros visuales', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/filter' },
  
  // Transformaciones
  { name: 'transform', category: 'transform', description: 'Transformaciones 2D/3D', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform' },
  { name: 'transform-origin', category: 'transform', description: 'Origen de transformación', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin' },
  { name: 'rotate', category: 'transform', description: 'Rotación del elemento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/rotate' },
  { name: 'scale', category: 'transform', description: 'Escalado del elemento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/scale' },
  { name: 'translate', category: 'transform', description: 'Traslación del elemento', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/translate' },
  
  // Transiciones y Animaciones
  { name: 'transition', category: 'animation', description: 'Transición shorthand', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition' },
  { name: 'transition-property', category: 'animation', description: 'Propiedades a animar', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property' },
  { name: 'transition-duration', category: 'animation', description: 'Duración de transición', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration' },
  { name: 'transition-timing-function', category: 'animation', description: 'Función de tiempo', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function' },
  { name: 'transition-delay', category: 'animation', description: 'Retraso de transición', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay' },
  { name: 'animation', category: 'animation', description: 'Animación shorthand', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/animation' },
  { name: 'animation-name', category: 'animation', description: 'Nombre de animación', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name' },
  { name: 'animation-duration', category: 'animation', description: 'Duración de animación', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration' },
  
  // Interactividad
  { name: 'cursor', category: 'interactive', description: 'Tipo de cursor', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/cursor' },
  { name: 'pointer-events', category: 'interactive', description: 'Eventos del puntero', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events' },
  { name: 'user-select', category: 'interactive', description: 'Selección de texto', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/user-select' },
  { name: 'touch-action', category: 'interactive', description: 'Acciones táctiles', documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action' }
];

// ========================================
// UTILIDADES DE DATOS
// ========================================

// Obtener todos los elementos HTML como array plano
export const getAllElements = (): HTMLElement[] => {
  return Object.values(HTML_ELEMENTS_BY_CATEGORY).flat();
};

// Obtener elemento por tag
export const getElementById = (tag: string): HTMLElement | undefined => {
  return getAllElements().find(element => element.tag === tag);
};

// Obtener configuraciones por elemento
export const getConfigurationsByElement = (elementTag: string): ElementConfiguration[] => {
  return ELEMENT_CONFIGURATIONS[elementTag] || [];
};

// Obtener propiedad CSS por nombre
export const getCSSProperty = (name: string): CSSProperty | undefined => {
  return ALL_CSS_PROPERTIES.find(prop => prop.name === name);
};

// Obtener propiedades CSS por categoría
export const getCSSPropertiesByCategory = (category: string): CSSProperty[] => {
  return ALL_CSS_PROPERTIES.filter(prop => prop.category === category);
};

// Obtener todas las categorías de propiedades CSS
export const getCSSCategories = (): string[] => {
  return [...new Set(ALL_CSS_PROPERTIES.map(prop => prop.category))];
};

export const MOCK_CONFIGURATIONS: ElementConfiguration[] = [
  {
    id: 'div-flexbox',
    name: 'Flexbox Container',
    description: 'Configure div as a flexible container for responsive layouts',
    icon: 'layout',
    category: 'Layout',
    isDefault: true,
    elementId: 'div',
    documentationUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout',
    propertyValues: [
      { propertyId: 'display', name: 'display', value: 'flex' },
      { propertyId: 'flex-direction', name: 'flex-direction', value: 'row' },
      { propertyId: 'justify-content', name: 'justify-content', value: 'flex-start' },
      { propertyId: 'align-items', name: 'align-items', value: 'stretch' }
    ],
    preview: {
      code: '<div class="flex-container">...</div>',
      description: 'Flexible container with customizable alignment',
      useCase: 'Perfect for creating responsive navigation bars, card layouts, and form controls'
    },
    tags: ['layout', 'responsive', 'modern'],
    difficulty: 'beginner',
    popularity: 95
  },
  // ... (resto de las configuraciones)
];

export const MOCK_PROPERTIES = [
  // ... (datos de las propiedades)
]; 