import { useEffect } from "react";

function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    // Handler to call when a click happens outside the element
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(); // Call the callback function if the click is outside
      }
    };

    // Add event listener to document when the component is mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]); // Effect depends on `ref` and `callback`
}

export default useClickOutside;
