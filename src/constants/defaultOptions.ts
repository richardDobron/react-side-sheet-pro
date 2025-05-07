import { SideOptions, SideSheetOptions } from '../types';

export const DEFAULT_OPTIONS: Required<SideSheetOptions> = {
  side: 'right',
  mountStrategy: 'all',
};

export const DEFAULT_SHEET_OPTIONS: Required<SideOptions> = {
  width: 400,
  className: '',
  confirmBeforeClose: false,
  confirmMessage: 'Are you sure you want to close?',
  confirmCallback: async (msg: string) =>
    typeof window !== 'undefined'
      ? Promise.resolve(window.confirm(msg))
      : Promise.resolve(true),
  closeOnOverlayClick: true,
  closeOnEsc: true,
  animationDuration: 240,
  onOpen: () => {},
  onClose: () => {},
};
