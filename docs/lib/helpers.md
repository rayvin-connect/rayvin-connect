[Back to Index](../index.md)

### Helpers

Various useful helper functions are included with this library.

```typescript
// get the URL for a moment on nbatopshot.com
function momentUrl (momentExternalId: string): string

// use this method to go directly to the page for a specific moment
```

```typescript
// get the URL for a set play on nbatopshot.com
function setPlayUrl (setExternalId: string, playExternalId: string): string

// use this method to go to the list of all serial numbers for a moment
```

```typescript
// get the display name for a visual id
function niceVisualName (visualId: string | null): string
```
