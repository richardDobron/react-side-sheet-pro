import { SideOptions, SideStackItem } from '../types';

type Action =
  | { type: 'OPEN'; payload: SideStackItem }
  | { type: 'SET_OPEN'; id: number }
  | { type: 'CLOSE'; id: number | null }
  | { type: 'REMOVE'; id: number }
  | { type: 'UPDATE'; id: number; options: Partial<SideOptions> };

export const SideSheetReducer = (
  state: SideStackItem[],
  action: Action
): SideStackItem[] => {
  switch (action.type) {
    case 'OPEN':
      return [...state, action.payload];
    case 'SET_OPEN':
      return state.map(item =>
        item.id === action.id ? { ...item, state: 'open' } : item
      );
    case 'CLOSE':
      return state.map(item =>
        action.id === null || item.id === action.id
          ? { ...item, state: 'closing' }
          : item
      );
    case 'REMOVE':
      return state.filter(item => item.id !== action.id);
    case 'UPDATE':
      return state.map(item =>
        item.id === action.id
          ? {
              ...item,
              options: { ...item.options, ...action.options },
            }
          : item
      );
    default:
      return state;
  }
};
