import React, { useEffect } from 'react';
import classNames from 'classnames';
import {
  SideElement,
  SideOptions,
  SideSheetOptions,
  SideStackItem,
} from '../types';

type SideSheetContainerProps = {
  stack: SideStackItem[];
  open: (el: SideElement, opts?: SideOptions) => number | string;
  close: (id: number | string | null) => Promise<void>;
  update: (id: number | string, opts: SideOptions) => void;
  config: Required<SideSheetOptions>;
};

function getStackItemMeta(stack: SideStackItem[], idx: number) {
  const prev = stack[idx - 1];
  const next = stack[idx + 1];
  return {
    prev,
    next,
    isTop: idx === stack.length - 1,
    isPrevClosing: prev?.state === 'closing',
    isNextTransitioning: next?.state === 'closing' || next?.state === 'opening',
  };
}

function computePadding(
  stack: SideStackItem[],
  idx: number
): number | undefined {
  const { next, isTop, isPrevClosing, isNextTransitioning } = getStackItemMeta(
    stack,
    idx
  );

  if (isTop || isPrevClosing || isNextTransitioning || !next) return undefined;

  const viewportWidth = document.documentElement.clientWidth;
  const maxWidth = stack[stack.length - 1]?.options.width ?? 0;

  let padding = 0;
  if (viewportWidth >= 1160) {
    padding = Math.floor((viewportWidth - 960) / 2);
  } else if (viewportWidth >= 768) {
    padding = Math.floor((viewportWidth - 768) / 2);
  }

  padding = Math.min(padding, maxWidth);

  return padding > 0 ? padding : next.options.width / 2;
}

export const SideSheetContainer: React.FC<SideSheetContainerProps> = ({
  stack,
  open,
  close,
  update,
  config,
}) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const top = stack[stack.length - 1];
        if (top?.options.closeOnEsc && top.state === 'open') {
          close(top.id);
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [stack, close]);

  const paddingKey = config.side === 'left' ? 'paddingLeft' : 'paddingRight';

  return (
    <>
      {stack.map((item, idx) => {
        const {
          next,
          isTop,
          isPrevClosing,
          isNextTransitioning,
        } = getStackItemMeta(stack, idx);
        const { width, closeOnOverlayClick, className } = item.options;

        const isEffectiveTop = isTop || isPrevClosing;
        const isVisible = !(
          config.mountStrategy === 'top-only' && !isEffectiveTop
        );
        const paddingValue =
          isEffectiveTop || isNextTransitioning || !next
            ? undefined
            : `${computePadding(stack, idx)}px`;

        const elementProps = {
          sideId: item.id,
          options: item.options,
          close,
          open,
          update,
        };

        return (
          <React.Fragment key={item.id}>
            {isVisible && (
              <div
                className="sidesheet-overlay"
                onClick={() => {
                  if (closeOnOverlayClick && item.state === 'open') {
                    close(item.id);
                  }
                }}
              />
            )}
            <div
              role="dialog"
              aria-modal="true"
              className={classNames(
                'sidesheet',
                `sidesheet-animation-${item.state}`,
                `sidesheet-${config.side}`,
                !isVisible && 'sidesheet-invisible',
                className
              )}
              style={{
                width: isEffectiveTop ? `${width}px` : '100%',
                [paddingKey]: paddingValue,
              }}
            >
              {item.element(elementProps)}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};
