import { useEffect, useState } from 'react'

function useMediaQuery(query: string): boolean {
  const mediaQueryList = window.matchMedia(query)
  const [matches, setMatches] = useState(mediaQueryList.matches)

  useEffect(() => {
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQueryList.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange)
    }
  }, [mediaQueryList])

  return matches
}

export default useMediaQuery
