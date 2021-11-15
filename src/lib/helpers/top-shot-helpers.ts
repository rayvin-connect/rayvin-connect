import _ from 'lodash'

// get the URL for a moment on nbatopshot.com
export function momentUrl (momentExternalId: string): string {
  return `https://www.nbatopshot.com/moment/${momentExternalId}`
}

// get the URL for a set play on nbatopshot.com
export function setPlayUrl (setExternalId: string, playExternalId: string): string {
  return `https://www.nbatopshot.com/listings/p2p/${setExternalId}+${playExternalId}`
}

// get the display name for a visual id
export function niceVisualName (visualId: string | null): string {
  if (!visualId) {
    return ''
  }

  const names: {[key: string]: string} = {
    SET_VISUAL_COMMON: 'Common',
    SET_VISUAL_RARE: 'Rare',
    SET_VISUAL_LEGENDARY: 'Legendary',
    SET_VISUAL_FANDOM: 'Fandom',
  }

  const defaultVisualName = visualId.startsWith('SET_VISUAL_') ? _.upperFirst(visualId.substr(11)) : visualId

  return names[visualId] ?? defaultVisualName
}
