import { ComponentType, ReactElement } from 'react';

export type Sides = 'left' | 'right';

export interface SideSheetOptions {
  side: Sides;
  enableOverflow: boolean;
  mountStrategy: 'all' | 'top-only';
  confirmMessage: string;
  confirmCallback: (message: string) => Promise<boolean>;
}

export interface SideOptions {
  id?: string | number;
  width?: number;
  className?: string;
  confirmBeforeClose?: boolean;
  confirmMessage?: string | null;
  confirmCallback?: ((message: string) => Promise<boolean>) | null;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  animationDuration?: number;
  onOpen?: (id: number | string) => void;
  onClose?: (id: number | string) => void;
}

export interface SideElementProps {
  sideId: number | string;
  close: (id: number | string | null) => Promise<void>;
  open: (element: SideComponent, options?: SideOptions) => number | string;
  update: (id: number | string, options: SideOptions) => void;
  options: SideOptions;
}

export type SideComponent<P = {}> = ComponentType<P & SideElementProps> & {
  defaultWidth?: number;
};

export type SideElement = (
  props: SideElementProps
) => ReactElement<any, SideComponent>;

export interface SideStackItem {
  id: number | string;
  element: SideElement;
  options: Required<Omit<SideOptions, 'width'>> & { width?: number };
  state: 'opening' | 'open' | 'closing';
}

export interface SideSheetContextValue {
  open: (el: SideElement, opts?: SideOptions) => number | string;
  close: (id: number | string | null, force: boolean) => Promise<void>;
  update: (id: number | string, opts: SideOptions) => void;
  config: SideSheetOptions;
}
