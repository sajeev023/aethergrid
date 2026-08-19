"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]:not([disabled])",
  "button:not([disabled])",
  "textarea:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Traps keyboard focus inside `containerRef` while `active` is true, moves focus
 * into the container on open, and restores focus to the previously-focused element
 * (the trigger) on close. Pairs with `role="dialog"` + `aria-modal="true"`.
 *
 * Escape handling is left to the caller (most call sites already close on Escape).
 */
export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
  containerRef: RefObject<T | null>,
) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    // Capture a non-null reference for use inside the closure below.
    const root: HTMLElement = container;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusables = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
      ).filter((el) => el.offsetParent !== null || el === root);

    // Move focus into the container — prefer an explicit [autofocus] element.
    const items = getFocusables();
    const initial =
      root.querySelector<HTMLElement>("[autofocus]") ?? items[0];
    if (initial) {
      initial.focus();
    } else {
      root.setAttribute("tabindex", "-1");
      root.focus();
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const focusables = getFocusables();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement;
      if (event.shiftKey) {
        if (activeEl === first || !root.contains(activeEl)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (activeEl === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    root.addEventListener("keydown", handleKeydown);

    return () => {
      root.removeEventListener("keydown", handleKeydown);
      root.removeAttribute("tabindex");
      if (
        previouslyFocused &&
        typeof previouslyFocused.focus === "function" &&
        document.body.contains(previouslyFocused)
      ) {
        previouslyFocused.focus();
      }
    };
  }, [active, containerRef]);
}