export enum ApplicationCategory {
  CRM = 'CRM',
  STORAGE = 'Almacenamiento',
  AI = 'Inteligencia Artificial',
  COMMUNICATION = 'Comunicación',
  DEVELOPMENT = 'Desarrollo',
  OTHER = 'Otro',
}

export type AuthType = 'oauth' | 'apikey' | 'none';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type ParameterType = 'string' | 'number' | 'boolean' | 'file' | 'object' | 'array';
export type AuthTokenPlacement = 'header' | 'query';

export interface FunctionParameter {
  name: string;
  type: ParameterType;
  required: boolean;
  description: string;
  placeholder?: string;
  defaultValue?: unknown;
  options?: (string | number)[];
  mapping?: string;
}

export interface RequestConfig {
  bodyTemplate?: string;
  headers?: Record<string, string>;
}

export interface ResponseTransformation {
  type: 'extract' | 'format' | 'map';
  extractPath?: string;
  template?: string;
  mapping?: Record<string, string>;
}

export interface ResponseConfig {
  successPath?: string;
  dataPath?: string;
  errorPath?: string;
  transformations?: ResponseTransformation[];
}

export interface ApplicationFunction {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  method: HttpMethod;
  endpoint: string;
  isAsync: boolean;
  requiresAuth: boolean;
  returnType: 'object' | 'array' | 'string' | 'number' | 'boolean';
  parameters: FunctionParameter[];
  example?: unknown;
  requestConfig?: RequestConfig;
  responseConfig?: ResponseConfig;
}

export interface ConnectionConfig {
  authUrl?: string;
  tokenUrl?: string;
  scopes?: string[];
  apiKeyHeader?: string;
  baseHeaders?: Record<string, string>;
  authValidationEndpoint?: string;
  authValidationMethod?: HttpMethod;
}

export interface GlobalRequestConfig {
  authTokenPlacement?: AuthTokenPlacement;
  authTokenFormat?: string; // e.g., 'Bearer {token}'
}

export interface GlobalResponseConfig {
  successPath?: string;
  errorPath?: string;
}

export interface Application {
  id: string;
  name: string;
  category: ApplicationCategory;
  icon: string;
  description: string;
  color: string;
  isConnected: boolean;
  authType: AuthType;
  baseUrl: string;
  documentation: string;
  functions: ApplicationFunction[];
  connectionConfig?: ConnectionConfig;
  globalRequestConfig?: GlobalRequestConfig;
  globalResponseConfig?: GlobalResponseConfig;
}

// Mapeo de iconos de Lucide Charts para reemplazar emojis
export const ICON_MAPPING = {
  // Applications
  SALESFORCE: 'Building2',
  GOOGLE_DRIVE: 'FolderOpen', 
  OPENAI: 'Bot',
  SLACK: 'MessageSquare',
  GITHUB: 'GitBranch',
  
  // Functions
  USER: 'User',
  UPLOAD: 'Upload',
  WRITE: 'PenTool',
  SENTIMENT: 'Heart',
  MESSAGE: 'MessageCircle',
  EMAIL: 'Mail',
  CLIPBOARD: 'Clipboard',
  REPOSITORY: 'GitBranch'
} as const;

export const APPLICATIONS_DATA: Application[] = [
  // 1. SALESFORCE
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: ApplicationCategory.CRM,
    icon: ICON_MAPPING.SALESFORCE,
    description: 'Plataforma CRM líder mundial para gestión de ventas y clientes',
    color: '#00A1E0',
    isConnected: false,
    authType: 'oauth',
    baseUrl: 'https://login.salesforce.com',
    documentation: 'https://developer.salesforce.com/docs',
    connectionConfig: {
      authUrl: 'https://login.salesforce.com/services/oauth2/authorize',
      tokenUrl: 'https://login.salesforce.com/services/oauth2/token',
      scopes: ['api', 'refresh_token']
    },
    functions: [
      {
        id: 'sf_create_contact',
        name: 'Crear Contacto',
        description: 'Crear un nuevo contacto en Salesforce',
        category: 'Contactos',
        icon: ICON_MAPPING.USER,
        method: 'POST',
        endpoint: '/services/data/v57.0/sobjects/Contact/',
        isAsync: false,
        requiresAuth: true,
        returnType: 'object',
        parameters: [
          {
            name: 'FirstName',
            type: 'string',
            required: true,
            description: 'Nombre del contacto',
            placeholder: 'Juan'
          },
          {
            name: 'LastName',
            type: 'string',
            required: true,
            description: 'Apellido del contacto',
            placeholder: 'Pérez'
          },
          {
            name: 'Email',
            type: 'string',
            required: false,
            description: 'Correo electrónico',
            placeholder: 'juan.perez@email.com'
          },
          {
            name: 'Phone',
            type: 'string',
            required: false,
            description: 'Teléfono',
            placeholder: '+34 600 123 456'
          }
        ],
        example: { id: '0031234567890ABC', success: true }
      }
    ]
  },

  // 2. GOOGLE DRIVE
  {
    id: 'google_drive',
    name: 'Google Drive',
    category: ApplicationCategory.STORAGE,
    icon: ICON_MAPPING.GOOGLE_DRIVE,
    description: 'Servicio de almacenamiento en la nube de Google',
    color: '#4285F4',
    isConnected: false,
    authType: 'oauth',
    baseUrl: 'https://www.googleapis.com',
    documentation: 'https://developers.google.com/drive',
    connectionConfig: {
      authUrl: 'https://accounts.google.com/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      scopes: ['https://www.googleapis.com/auth/drive']
    },
    functions: [
      {
        id: 'gd_upload_file',
        name: 'Subir Archivo',
        description: 'Subir un archivo a Google Drive',
        category: 'Archivos',
        icon: ICON_MAPPING.UPLOAD,
        method: 'POST',
        endpoint: '/upload/drive/v3/files',
        isAsync: true,
        requiresAuth: true,
        returnType: 'object',
        parameters: [
          {
            name: 'file',
            type: 'file',
            required: true,
            description: 'Archivo a subir'
          },
          {
            name: 'name',
            type: 'string',
            required: false,
            description: 'Nombre del archivo',
            placeholder: 'documento.pdf'
          }
        ]
      }
    ]
  },

  // 3. OPENAI (ChatGPT)
  {
    id: 'openai',
    name: 'ChatGPT (OpenAI)',
    category: ApplicationCategory.AI,
    icon: ICON_MAPPING.OPENAI,
    description: 'API de inteligencia artificial de OpenAI',
    color: '#10A37F',
    isConnected: false,
    authType: 'apikey',
    baseUrl: 'https://api.openai.com',
    documentation: 'https://platform.openai.com/docs',
    connectionConfig: {
      apiKeyHeader: 'Authorization',
      baseHeaders: { 'Content-Type': 'application/json' },
      authValidationEndpoint: '/v1/models',
      authValidationMethod: 'GET'
    },
    globalRequestConfig: {
      authTokenPlacement: 'header',
      authTokenFormat: 'Bearer {apiKey}'
    },
    globalResponseConfig: {
      errorPath: 'error.message'
    },
    functions: [
      {
        id: 'openai_generate_text',
        name: 'Generar Texto',
        description: 'Generar texto usando GPT-4',
        category: 'Generación',
        icon: ICON_MAPPING.WRITE,
        method: 'POST',
        endpoint: '/v1/chat/completions',
        isAsync: true,
        requiresAuth: true,
        returnType: 'object',
        parameters: [
          {
            name: 'prompt',
            type: 'string',
            required: true,
            description: 'Mensaje o pregunta para la IA',
            placeholder: 'Escribe un email profesional sobre...',
            mapping: 'messages[0].content'
          },
          {
            name: 'model',
            type: 'string',
            required: false,
            description: 'Modelo a usar',
            defaultValue: 'gpt-4',
            options: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo']
          },
          {
            name: 'max_tokens',
            type: 'number',
            required: false,
            description: 'Máximo de tokens',
            defaultValue: 1000,
            placeholder: '1000'
          },
          {
            name: 'temperature',
            type: 'number',
            required: false,
            description: 'Creatividad (0-1)',
            defaultValue: 0.7,
            placeholder: '0.7'
          }
        ],
        requestConfig: {
          bodyTemplate: JSON.stringify({
            model: '{model}',
            messages: [
              {
                role: 'user',
                content: '{prompt}'
              }
            ],
            max_tokens: '{max_tokens}',
            temperature: '{temperature}'
          })
        },
        responseConfig: {
          dataPath: 'choices[0].message.content',
          transformations: [
            {
              type: 'extract',
              extractPath: 'choices[0].message.content'
            }
          ]
        }
      },
      {
        id: 'openai_analyze_sentiment',
        name: 'Análisis de Sentimientos',
        description: 'Analizar el sentimiento de un texto',
        category: 'Análisis',
        icon: ICON_MAPPING.SENTIMENT,
        method: 'POST',
        endpoint: '/v1/chat/completions',
        isAsync: true,
        requiresAuth: true,
        returnType: 'object',
        parameters: [
          {
            name: 'text',
            type: 'string',
            required: true,
            description: 'Texto a analizar',
            placeholder: 'El producto es excelente, muy recomendado'
          }
        ],
        requestConfig: {
          bodyTemplate: JSON.stringify({
            model: 'gpt-4',
            messages: [
              {
                role: 'user',
                content: 'Analiza el sentimiento del siguiente texto y responde solo con un JSON en este formato: {"sentiment": "positive|negative|neutral", "confidence": 0.95}\n\nTexto: "{text}"'
              }
            ],
            max_tokens: 100,
            temperature: 0.1
          })
        },
        responseConfig: {
          dataPath: 'choices[0].message.content',
          transformations: [
            {
              type: 'extract',
              extractPath: 'choices[0].message.content'
            },
            {
              type: 'format',
              template: '{data}'
            }
          ]
        }
      }
    ]
  },

  // 4. SLACK
  {
    id: 'slack',
    name: 'Slack',
    category: ApplicationCategory.COMMUNICATION,
    icon: ICON_MAPPING.SLACK,
    description: 'Plataforma de comunicación empresarial',
    color: '#4A154B',
    isConnected: false,
    authType: 'oauth',
    baseUrl: 'https://slack.com',
    documentation: 'https://api.slack.com',
    connectionConfig: {
      authUrl: 'https://slack.com/oauth/v2/authorize',
      tokenUrl: 'https://slack.com/api/oauth.v2.access',
      scopes: ['chat:write', 'channels:read', 'files:write'],
      authValidationEndpoint: '/api/auth.test',
      authValidationMethod: 'POST'
    },
    globalRequestConfig: {
      authTokenPlacement: 'header',
      authTokenFormat: 'Bearer {token}'
    },
    globalResponseConfig: {
      successPath: 'ok',
      errorPath: 'error'
    },
    functions: [
      {
        id: 'slack_send_message',
        name: 'Enviar Mensaje',
        description: 'Enviar un mensaje a un canal o usuario',
        category: 'Mensajes',
        icon: ICON_MAPPING.EMAIL,
        method: 'POST',
        endpoint: '/api/chat.postMessage',
        isAsync: false,
        requiresAuth: true,
        returnType: 'object',
        parameters: [
          {
            name: 'channel',
            type: 'string',
            required: true,
            description: 'Canal o usuario destino',
            placeholder: '#general o @usuario'
          },
          {
            name: 'text',
            type: 'string',
            required: true,
            description: 'Mensaje a enviar',
            placeholder: 'Hola equipo!'
          },
          {
            name: 'thread_ts',
            type: 'string',
            required: false,
            description: 'ID del hilo (opcional)',
            placeholder: '1234567890.123456'
          }
        ],
        responseConfig: {
          successPath: 'ok',
          dataPath: 'message',
          errorPath: 'error'
        }
      },
      {
        id: 'slack_get_channels',
        name: 'Obtener Canales',
        description: 'Listar todos los canales disponibles',
        category: 'Información',
        icon: ICON_MAPPING.CLIPBOARD,
        method: 'GET',
        endpoint: '/api/conversations.list',
        isAsync: false,
        requiresAuth: true,
        returnType: 'array',
        parameters: [
          {
            name: 'types',
            type: 'string',
            required: false,
            description: 'Tipos de conversaciones',
            defaultValue: 'public_channel,private_channel',
            placeholder: 'public_channel,private_channel'
          }
        ],
        responseConfig: {
          successPath: 'ok',
          dataPath: 'channels',
          errorPath: 'error'
        }
      }
    ]
  },

  // 5. GITHUB
  {
    id: 'github',
    name: 'GitHub',
    category: ApplicationCategory.DEVELOPMENT,
    icon: ICON_MAPPING.GITHUB,
    description: 'Plataforma de desarrollo y control de versiones',
    color: '#24292F',
    isConnected: false,
    authType: 'oauth',
    baseUrl: 'https://api.github.com',
    documentation: 'https://docs.github.com/rest',
    functions: [
      {
        id: 'github_create_repo',
        name: 'Crear Repositorio',
        description: 'Crear un nuevo repositorio en GitHub',
        category: 'Repositorios',
        icon: ICON_MAPPING.REPOSITORY,
        method: 'POST',
        endpoint: '/user/repos',
        isAsync: false,
        requiresAuth: true,
        returnType: 'object',
        parameters: [
          {
            name: 'name',
            type: 'string',
            required: true,
            description: 'Nombre del repositorio',
            placeholder: 'mi-proyecto'
          },
          {
            name: 'description',
            type: 'string',
            required: false,
            description: 'Descripción del repositorio',
            placeholder: 'Mi nuevo proyecto awesome'
          },
          {
            name: 'private',
            type: 'boolean',
            required: false,
            description: 'Repositorio privado',
            defaultValue: false
          }
        ]
      }
    ]
  }
];

// Función helper para obtener aplicaciones por categoría
export const getApplicationsByCategory = (category: ApplicationCategory): Application[] => {
  return APPLICATIONS_DATA.filter(app => app.category === category);
};

// Función helper para buscar aplicaciones
export const searchApplications = (query: string): Application[] => {
  const searchTerm = query.toLowerCase();
  return APPLICATIONS_DATA.filter(app => 
    app.name.toLowerCase().includes(searchTerm) ||
    app.description.toLowerCase().includes(searchTerm) ||
    app.functions.some(func => 
      func.name.toLowerCase().includes(searchTerm) ||
      func.description.toLowerCase().includes(searchTerm)
    )
  );
};

// Función helper para obtener aplicación por ID
export const getApplicationById = (id: string): Application | undefined => {
  return APPLICATIONS_DATA.find(app => app.id === id);
};

// Función helper para obtener todas las categorías únicas
export const getAllCategories = (): ApplicationCategory[] => {
  return Object.values(ApplicationCategory);
};

// Función helper para obtener funciones por aplicación
export const getFunctionsByApplication = (appId: string): Application['functions'] => {
  const app = getApplicationById(appId);
  return app ? app.functions : [];
}; 