/// <reference types="react" />
import { ReactNode } from "react";
type Sides = "left" | "right";
interface SideSheetOptions {
    side: Sides;
    enableOverflow: boolean;
    mountStrategy: "all" | "top-only";
    confirmMessage: string;
    confirmCallback: (message: string) => Promise<boolean>;
}
interface SideOptions {
    id?: number | string;
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
interface SideElementProps {
    sideId: number | string;
    close: (id: number | string | null, force?: boolean) => Promise<void>;
    open: (element: SideElement, options?: SideOptions) => number | string;
    update: (id: number | string, options: SideOptions) => void;
    options: SideOptions;
}
type SideElement = (props: SideElementProps) => ReactNode;
interface SideStackItem {
    id: number | string;
    element: SideElement;
    options: Required<SideOptions>;
    state: "opening" | "open" | "closing";
}
interface SideSheetContextValue {
    open: (el: SideElement, opts?: SideOptions) => number | string;
    close: (id: number | string | null, force?: boolean) => Promise<void>;
    update: (id: number | string, opts: SideOptions) => void;
    config: SideSheetOptions;
}
declare const useSideSheet: () => SideSheetContextValue;
declare const SideSheet: {
    Provider: import("react").FC<{
        children: import("react").ReactNode;
        configuration?: Partial<SideSheetOptions> | undefined;
    }>;
    Header: import("react").FC<{
        title: string;
        onClose?: (() => void) | undefined;
        actions?: import("react").ReactNode;
        className?: string | undefined;
    }>;
    Content: import("react").FC<{
        children: import("react").ReactNode;
        className?: string | undefined;
    }>;
    Footer: import("react").FC<{
        children: import("react").ReactNode;
        className?: string | undefined;
    }>;
};
export { useSideSheet, Sides, SideSheetOptions, SideOptions, SideElementProps, SideElement, SideStackItem, SideSheetContextValue, SideSheet };
