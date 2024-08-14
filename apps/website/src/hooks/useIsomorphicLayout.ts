import React from 'react';

export const useIsomorphicLayout = (callback: () => void, deps: React.DependencyList) => {
  const canUseDOM: boolean = !!(
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );

  const useIsomorphicLayoutEffect = canUseDOM ? React.useLayoutEffect : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    callback();
  }, [...deps]);

  return null;
};
