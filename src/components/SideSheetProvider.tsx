import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import {
  DEFAULT_OPTIONS,
  DEFAULT_SHEET_OPTIONS,
} from '../constants/defaultOptions';
import {
  SideElement,
  SideOptions,
  SideSheetContextValue,
  SideSheetOptions,
  SideStackItem,
} from '../types';
import { SideSheetContainer } from './SideSheetContainer';
import { SideSheetReducer } from '../contexts/SideSheetReducer';

export const SideSheetContext = createContext<SideSheetContextValue | null>(
  null
);

export const SideSheetProvider: React.FC<{
  children: ReactNode;
  configuration?: Partial<SideSheetOptions>;
}> = ({ children, configuration }) => {
  const [stack, dispatch] = useReducer(SideSheetReducer, []);
  const stackRef = useRef<SideStackItem[]>(stack);
  const overflowRef = useRef('');
  const idRef = useRef(0);

  useEffect(() => {
    stackRef.current = stack;
  }, [stack]);

  const open = useCallback((element: SideElement, opts: SideOptions = {}) => {
    const id = ++idRef.current;
    const options = { ...DEFAULT_SHEET_OPTIONS, ...opts };
    if (!config.enableOverflow && stackRef.current.length === 0) {
      overflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    dispatch({
      type: 'OPEN',
      payload: { id, element, options, state: 'opening' },
    });
    setTimeout(() => {
      dispatch({ type: 'SET_OPEN', id });
      options.onOpen?.(id);
    }, options.animationDuration);
    return id;
  }, []);

  const close = useCallback(async (id: number | null, force = false) => {
    const itemsToClose =
      id === null
        ? [...stackRef.current]
        : stackRef.current.filter(i => i.id === id);

    for (const item of itemsToClose) {
      if (! force && item.options.confirmBeforeClose) {
        const confirmCallback =
          item.options.confirmCallback ?? config.confirmCallback;
        const confirmed = await confirmCallback(
          item.options.confirmMessage ?? config.confirmMessage
        );
        if (!confirmed) return;
      }
      item.options.onClose?.(item.id);
    }

    if (
        !config.enableOverflow &&
        stackRef.current.length <= itemsToClose.length
    ) {
      document.body.style.overflow = overflowRef.current;
    }

    const duration =
      itemsToClose[itemsToClose.length - 1]?.options.animationDuration;
    dispatch({ type: 'CLOSE', id });
    setTimeout(() => {
      if (id === null) {
        itemsToClose.forEach(item => dispatch({ type: 'REMOVE', id: item.id }));
      } else {
        dispatch({ type: 'REMOVE', id: id! });
      }
    }, duration);
  }, []);

  const update = useCallback((id: number, options: Partial<SideOptions>) => {
    dispatch({ type: 'UPDATE', id, options });
  }, []);
  const config = { ...DEFAULT_OPTIONS, ...configuration } as Required<
    SideSheetOptions
  >;

  return (
    <SideSheetContext.Provider value={{ open, close, update, config }}>
      {children}
      {createPortal(
        <SideSheetContainer
          stack={stack}
          close={close}
          open={open}
          update={update}
          config={config}
        />,
        document.body
      )}
    </SideSheetContext.Provider>
  );
};
