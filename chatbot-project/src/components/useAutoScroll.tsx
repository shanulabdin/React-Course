import { useRef, useEffect, type DependencyList } from 'react'

export function useAutoScroll(dependencies: DependencyList = []){
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [...dependencies]);

  return containerRef;
}