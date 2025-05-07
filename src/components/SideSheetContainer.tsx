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
  open: (el: SideElement, opts?: SideOptions) => number;
  close: (id: number | null) => Promise<void>;
  update: (id: number, opts: SideOptions) => void;
  config: Required<SideSheetOptions>;
};

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

  return (
    <>
      {stack.map((item, idx) => {
        const isTop = idx === stack.length - 1;
        const isPrevClosing = stack[idx - 1]?.state === 'closing';
        const { width, closeOnOverlayClick, className } = item.options;

        if (config.mountStrategy === 'top-only' && !isTop && !isPrevClosing)
          return null;

        return (
          <React.Fragment key={item.id}>
            <div
              className="sidesheet-overlay"
              onClick={() => {
                if (closeOnOverlayClick && item.state === 'open') {
                  close(item.id);
                }
              }}
            />
            <div
              role="dialog"
              aria-modal="true"
              className={classNames(
                'sidesheet',
                `sidesheet-animation-${item.state}`,
                {
                  'sidesheet-left': config.side === 'left',
                  'sidesheet-right': config.side === 'right',
                },
                className
              )}
              style={{
                width: `${isTop || isPrevClosing ? `${width}px` : '100%'}`,
              }}
            >
              {item.element({
                sideId: item.id,
                options: item.options,
                close,
                open,
                update,
              })}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};
