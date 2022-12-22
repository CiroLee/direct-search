import { ref, Ref, UnwrapRef } from 'vue';
import { useEventListener } from './useEventListener';

/**
 * @desc useDark will auto memory state if set manually
 */
function useDark(localName?: string): Ref<UnwrapRef<boolean>> {
  function diffDarkWidthLocal(darkMatch: boolean, local: string | null) {
    return local ? local === 'dark' : darkMatch;
  }
  const darkMatch = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = ref<boolean>(diffDarkWidthLocal(darkMatch.matches, localStorage.getItem(localName || 'darkMode')));

  useEventListener(darkMatch, 'change', (event) => {
    const sys = (event as MediaQueryListEvent).matches;
    const local = localStorage.getItem(localName || 'darkMode');
    isDark.value = diffDarkWidthLocal(sys, local);
  });
  return isDark;
}

export { useDark };
