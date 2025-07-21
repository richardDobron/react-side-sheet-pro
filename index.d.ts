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
interface SideElementProps {
    sideId: number;
    close: (id: number | null) => Promise<void>;
    open: (element: SideElement, options?: SideOptions) => number;
    update: (id: number, options: SideOptions) => void;
    options: SideOptions;
}
type SideElement = (props: SideElementProps) => ReactNode;
interface SideStackItem {
    id: number;
    element: SideElement;
    options: Required<SideOptions>;
    state: "opening" | "open" | "closing";
}
interface SideSheetContextValue {
    open: (el: SideElement, opts?: SideOptions) => number;
    close: (id: number | null) => Promise<void>;
    update: (id: number, opts: SideOptions) => void;
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
