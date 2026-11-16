import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  DEFAULT_OPTIONS,
  DEFAULT_SHEET_OPTIONS,
} from '../constants/defaultOptions';
import {
  CloseSide,
  OpenSide,
  SideSheetContextValue,
  SideSheetOptions,
  SideStackItem,
  UpdateSide,
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
  const idRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  const stackRef = useRef<SideStackItem[]>(stack);
  stackRef.current = stack;

  const config = useMemo(
    () =>
      ({ ...DEFAULT_OPTIONS, ...configuration } as Required<SideSheetOptions>),
    [configuration]
  );
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const opening = stack.filter(i => i.state === 'opening');
    if (!opening.length) return;
    void document.body.offsetWidth;
    opening.forEach(i => dispatch({ type: 'SET_OPEN', id: i.id }));
  }, [stack]);

  const open = useCallback<OpenSide>((element, opts = {}) => {
    const id = opts.id ?? ++idRef.current;
    const options = { ...DEFAULT_SHEET_OPTIONS, ...opts };
    dispatch({
      type: 'OPEN',
      payload: { id, element, options, state: 'opening' },
    });
    setTimeout(() => options.onOpen?.(id), options.animationDuration);
    return id;
  }, []);

  const close = useCallback<CloseSide>(async (id, force = false) => {
    const itemsToClose =
      id === null
        ? [...stackRef.current]
        : stackRef.current.filter(i => i.id === id);

    for (const item of itemsToClose) {
      if (!force && item.options.confirmBeforeClose) {
        const confirmCallback =
          item.options.confirmCallback ?? configRef.current.confirmCallback;
        const confirmed = await confirmCallback(
          item.options.confirmMessage ?? configRef.current.confirmMessage
        );
        if (!confirmed) return;
      }
      item.options.onClose?.(item.id);
    }

    const duration =
      itemsToClose[itemsToClose.length - 1]?.options.animationDuration ??
      DEFAULT_SHEET_OPTIONS.animationDuration;
    dispatch({ type: 'CLOSE', id });

    await new Promise(resolve => setTimeout(resolve, duration));

    const removeIds = id === null ? itemsToClose.map(item => item.id) : [id];
    removeIds.forEach(rid => dispatch({ type: 'REMOVE', id: rid }));
  }, []);

  const update = useCallback<UpdateSide>((id, options) => {
    dispatch({ type: 'UPDATE', id, options });
  }, []);

  const contextValue = useMemo(() => ({ open, close, update, config }), [
    open,
    close,
    update,
    config,
  ]);

  return (
    <SideSheetContext.Provider value={contextValue}>
      {children}
      {mounted &&
        createPortal(
          <SideSheetContainer
            stack={stack}
            open={open}
            close={close}
            update={update}
            config={config}
          />,
          document.body
        )}
    </SideSheetContext.Provider>
  );
};
