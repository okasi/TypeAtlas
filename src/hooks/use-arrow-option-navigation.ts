import { useCallback, useEffect, useRef } from 'react';

interface UseArrowOptionNavigationArgs {
  enabled: boolean;
  optionCount: number;
  selectedIndex: number;
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();
  return target.isContentEditable || tagName === 'input' || tagName === 'textarea' || tagName === 'select';
}

export function useArrowOptionNavigation({
  enabled,
  optionCount,
  selectedIndex,
}: UseArrowOptionNavigationArgs) {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pendingAutoFocusRef = useRef(false);
  const focusIndex = selectedIndex >= 0 ? selectedIndex : 0;

  const focusOption = useCallback((index: number) => {
    const option = optionRefs.current[index];

    if (!option) {
      return false;
    }

    option.focus();
    return document.activeElement === option;
  }, []);

  const setOptionRef = useCallback((index: number, node: HTMLButtonElement | null) => {
    optionRefs.current[index] = node;

    if (!node || !pendingAutoFocusRef.current) {
      return;
    }

    if (!enabled || index !== focusIndex) {
      return;
    }

    window.requestAnimationFrame(() => {
      if (
        pendingAutoFocusRef.current &&
        optionRefs.current[focusIndex] === node &&
        focusOption(focusIndex)
      ) {
        pendingAutoFocusRef.current = false;
      }
    });
  }, [enabled, focusIndex, focusOption]);

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, optionCount);
  }, [optionCount]);

  useEffect(() => {
    if (!enabled || optionCount === 0) {
      pendingAutoFocusRef.current = false;
      return;
    }

    pendingAutoFocusRef.current = true;
    const frame = window.requestAnimationFrame(() => {
      if (focusOption(focusIndex)) {
        pendingAutoFocusRef.current = false;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [enabled, focusIndex, focusOption, optionCount]);

  useEffect(() => {
    if (!enabled || optionCount === 0) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || isEditableTarget(event.target)) {
        return;
      }

      const focusedIndex = optionRefs.current.findIndex((option) => option === document.activeElement);
      if (focusedIndex === -1) {
        return;
      }

      let nextIndex: number | null = null;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextIndex = (focusedIndex + 1) % optionCount;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        nextIndex = (focusedIndex - 1 + optionCount) % optionCount;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = optionCount - 1;
      }

      if (nextIndex === null) {
        return;
      }

      event.preventDefault();
      optionRefs.current[nextIndex]?.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, optionCount, selectedIndex]);

  return { setOptionRef };
}
