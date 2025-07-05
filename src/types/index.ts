import { ReactNode } from 'react';

export type Sides = 'left' | 'right';

export interface SideSheetOptions {
  side: Sides;
  mountStrategy: 'all' | 'top-only';
  confirmMessage: string;
  confirmCallback: (message: string) => Promise<boolean>;
}

export interface SideOptions {
  width?: number;
  className?: string;
  confirmBeforeClose?: boolean;
  confirmMessage?: string | null;
  confirmCallback?: ((message: string) => Promise<boolean>) | null;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  animationDuration?: number;
  onOpen?: (id: number) => void;
  onClose?: (id: number) => void;
}

export interface SideElementProps {
  sideId: number;
  close: (id: number | null) => Promise<void>;
  open: (element: SideElement, options?: SideOptions) => number;
  update: (id: number, options: SideOptions) => void;
  options: SideOptions;
}

export type SideElement = (props: SideElementProps) => ReactNode;

export interface SideStackItem {
  id: number;
  element: SideElement;
  options: Required<SideOptions>;
  state: 'opening' | 'open' | 'closing';
}

export interface SideSheetContextValue {
  open: (el: SideElement, opts?: SideOptions) => number;
  close: (id: number | null) => Promise<void>;
  update: (id: number, opts: SideOptions) => void;
  config: SideSheetOptions;
}
