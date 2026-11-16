import { ComponentType, ReactElement } from 'react';

export type Sides = 'left' | 'right';

export type SideId = number | string;

export interface SideSheetOptions {
  side: Sides;
  enableOverflow: boolean;
  mountStrategy: 'all' | 'top-only';
  confirmMessage: string;
  confirmCallback: (message: string) => Promise<boolean>;
}

export interface SideOptions {
  id?: SideId;
  width?: number;
  className?: string;
  confirmBeforeClose?: boolean;
  confirmMessage?: string | null;
  confirmCallback?: ((message: string) => Promise<boolean>) | null;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  animationDuration?: number;
  onOpen?: (id: SideId) => void;
  onClose?: (id: SideId) => void;
}

export type OpenSide = (element: SideElement, options?: SideOptions) => SideId;
export type CloseSide = (id: SideId | null, force?: boolean) => Promise<void>;
export type UpdateSide = (id: SideId, options: SideOptions) => void;

export interface SideElementProps {
  sideId: SideId;
  open: OpenSide;
  close: CloseSide;
  update: UpdateSide;
  options: SideOptions;
}

export type SideComponent<P = {}> = ComponentType<P & SideElementProps> & {
  defaultWidth?: number;
};

export type SideElement = (
  props: SideElementProps
) => ReactElement<any, SideComponent>;

export interface SideStackItem {
  id: SideId;
  element: SideElement;
  options: Required<Omit<SideOptions, 'width'>> & { width?: number };
  state: 'opening' | 'open' | 'closing';
}

export interface SideSheetContextValue {
  open: OpenSide;
  close: CloseSide;
  update: UpdateSide;
  config: SideSheetOptions;
}
