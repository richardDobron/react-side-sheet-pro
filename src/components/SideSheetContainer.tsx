import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { createFocusTrap, FocusTrap } from 'focus-trap';
import { RemoveScroll } from 'react-remove-scroll';
import {
  CloseSide,
  OpenSide,
  SideId,
  SideSheetOptions,
  SideStackItem,
  UpdateSide,
} from '../types';

type SideSheetContainerProps = {
  stack: SideStackItem[];
  open: OpenSide;
  close: CloseSide;
  update: UpdateSide;
  config: Required<SideSheetOptions>;
};

const isSecondary = (stack: SideStackItem[], idx: number) =>
  stack[idx].state !== 'closing' &&
  stack.slice(idx + 1).some(i => i.state !== 'closing');

export const SideSheetContainer: React.FC<SideSheetContainerProps> = ({
  stack,
  open,
  close,
  update,
  config,
}) => {
  const sheetRefs = useRef(new Map<SideId, HTMLDivElement>());
  const trapsRef = useRef(new Map<SideId, FocusTrap>());
  const top = stack.filter(i => i.state !== 'closing').pop();

  useEffect(() => {
    const traps = trapsRef.current;
    const onScreen = new Set(
      stack.filter(i => i.state !== 'closing').map(i => i.id)
    );

    Array.from(traps.keys())
      .reverse()
      .filter(id => !onScreen.has(id))
      .forEach(id => {
        traps.get(id)?.deactivate();
        traps.delete(id);
      });

    stack.forEach(item => {
      const el = sheetRefs.current.get(item.id);
      if (!onScreen.has(item.id) || traps.has(item.id) || !el) return;
      const trap = createFocusTrap(el, {
        initialFocus: el,
        fallbackFocus: el,
        escapeDeactivates: false,
        allowOutsideClick: true,
        preventScroll: true,
      });
      traps.set(item.id, trap);
      trap.activate();
    });
  }, [stack]);

  useEffect(
    () => () => {
      Array.from(trapsRef.current.values())
        .reverse()
        .forEach(trap => trap.deactivate());
    },
    []
  );

  useEffect(() => {
    if (!top) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' &&
        !e.defaultPrevented &&
        top.options.closeOnEsc &&
        top.state === 'open'
      ) {
        close(top.id);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [top, close]);

  const rendered = stack.map(item => {
    const element = item.element({
      sideId: item.id,
      options: item.options,
      open,
      close,
      update,
    });
    const width: number =
      item.options.width ?? element.type.defaultWidth ?? 400;
    return { element, width };
  });

  return (
    <RemoveScroll enabled={!config.enableOverflow && stack.length > 0}>
      {stack.map((item, idx) => {
        const {
          closeOnOverlayClick,
          className,
          animationDuration,
        } = item.options;
        const secondary = isSecondary(stack, idx);
        const isVisible = !(config.mountStrategy === 'top-only' && secondary);
        const { element, width } = rendered[idx];
        const aboveIdx = stack.findIndex(
          (i, j) => j > idx && i.state !== 'closing'
        );

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
              ref={el => {
                if (el) sheetRefs.current.set(item.id, el);
                else sheetRefs.current.delete(item.id);
              }}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              className={classNames(
                'sidesheet',
                `sidesheet-animation-${item.state}`,
                `sidesheet-${config.side}`,
                secondary && 'sidesheet-secondary',
                !isVisible && 'sidesheet-invisible',
                className
              )}
              style={{
                width: `${width}px`,
                minWidth: secondary
                  ? `calc(100vw - ${rendered[aboveIdx].width}px)`
                  : '0px',
                transitionDuration: `${animationDuration}ms`,
              }}
            >
              {element}
            </div>
          </React.Fragment>
        );
      })}
    </RemoveScroll>
  );
};
