// Centralized constants for the application

// --- API Endpoints and Configuration ---
export const API_ENDPOINTS = {
  COFFEE_LIST: '/api/coffees',
  COFFEE_DETAIL: (id: string) => `/api/coffees/${id}`,
  // Add more endpoints as needed
};

export const CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_RETRIES: 3,
  TIMEOUT_MS: 10000,
};

// --- UI Constants and Display Values ---
export const UI = {
  DEFAULT_PLACEHOLDER: 'Select an option...',
  ERROR_COLOR: 'text-red-600',
  SUCCESS_COLOR: 'text-green-600',
  CARD_CLASS: 'bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg',
  CARD_HEADER_CLASS: 'bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg',
  CARD_TITLE: '🎯 Your Perfect Matches',
  CARD_TITLE_CLASS: 'text-2xl text-amber-900 text-center',
  CARD_SUBTITLE: 'Curated just for you based on your taste preferences',
  CARD_SUBTITLE_CLASS: 'text-amber-700 text-center',
  EMPTY_STATE_ICON: '🔍',
  EMPTY_STATE_ICON_CLASS: 'w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center',
  EMPTY_STATE_TITLE: 'Expanding Your Horizons',
  EMPTY_STATE_TITLE_CLASS: 'text-xl font-bold text-amber-900 mb-2',
  EMPTY_STATE_MESSAGE: "We're finding some unique matches that might surprise you! Try adjusting your preferences to see more options.",
  EMPTY_STATE_MESSAGE_CLASS: 'text-amber-700',
  APP_NAME: 'BrewMatch',
  APP_TAGLINE: 'Your AI-powered coffee matchmaker',
  FOOTER_TEXT: 'Connecting coffee lovers with their perfect beans',
  // Add more UI constants as needed
};

// --- Validation Rules and Constraints ---
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PRICE_REGEX: /^\$?\d+(\.\d{2})?$/,
  BUDGET_MIN: 10,
  BUDGET_MAX: 50,
  BUDGET_STEP: 5,
  FLAVORS_REQUIRED: 'Please select at least one flavor.',
  MILK_REQUIRED: 'Please select a milk preference.',
  // Add more validation rules as needed
};

// --- Error Messages and Default Values ---
export const ERRORS = {
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  NETWORK_ERROR: 'Network error. Please try again.',
  FLAVORS_REQUIRED: 'We need your flavor preferences to find the perfect match!',
  MILK_REQUIRED: 'We need your milk preference to find the perfect match!',
  // Add more error messages as needed
};

export const DEFAULTS = {
  COFFEE_IMAGE: '/images/default-coffee.png',
  BUDGET_RANGE: [15, 25],
  // Add more default values as needed
}; 