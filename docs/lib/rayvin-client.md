[Back to Index](../index.md)

### Rayvin Client

The `RayvinClient` class ([rayvin-client.ts](../../src/lib/api/rayvin-client.ts)) is responsible for interfacing with Rayvin Connect's HTTP API. The schema for all API calls can be found in the [schema/](../../src/lib/api/schema) folder.

The following features are available:

* [Sending Notifications](#sending-notifications)
* [Getting Sets](#getting-sets)
* [Getting Plays](#getting-plays)
* [Getting Set Plays](#getting-set-plays)
* [Getting Active Listings](#getting-active-listings)
* [Getting Feed Authentication Token](#getting-feed-authentication-token)

---

### Sending Notifications

```typescript
function sendNotification (request: SendNotificationRequest): Promise<void>
```

Use this to send yourself a notification through Rayvin's notification system. You can configure both email and Telegram delivery through the Rayvin website. You aren't required to use this, but it is available if you don't want to roll your own notification system.

The `SendNotificationRequest` object has the following type:

```typescript
export type SendNotificationRequest = {
  // the subject that will be used for email notifications (this will default to a standard subject line if you do not provide a value)
  subject?: string
  /// the message this will be included in the body of the email/Telegram message
  message: string
}
```

---

### Getting Sets

```typescript
function getSets (request: GetSetsRequest): Promise<GetSetsResponse>
```

Get information about Top Shot sets

```typescript
export type GetSetsRequest = {
  // limit the number of results returned (defaults to 100, max is 500)
  limit?: number
  // cursor to use when paginating results. this value will be provided in the response so you can request the next set of results
  cursor?: string
}
```

jsonschema for the request objeect

```typescript
export const GetSetsRequestSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    limit: {
      type: 'number',
      minimum: 1,
      maximum: 500,
    },
    cursor: {
      type: 'string',
    },
  },
}
```

```typescript
export type GetSetsResponse = {
  // sets returned from the API
  sets: Set[]
  // cursor to use to fetch the next set of results
  cursor: string
}

export type Set = {
  // Id of this set on the Flow blockchain
  flowId: number
  // name of the set (can be null if no name has been found)
  name: string | null
  // ID for this set on Top Shot (used in Top Shot URLs)
  externalId: string | null
  // series number
  series: number
  // name of the series
  seriesName: string | null
  // visual id of the set (ie: SET_VISUAL_LEGENDARY)
  visualId: string | null
}
```

You can use the `niceVisualName()` method from the [Helpers](./helpers.md) to convert this to the same text you would see on the Top Shot marketplace.

---

### Getting Plays

```typescript
function getPlays (request: GetPlaysRequest): Promise<GetPlaysResponse>
```

Get information about Top Shot plays

```typescript
export type GetPlaysRequest = {
  // limit the number of results returned (defaults to 100, max is 500)
  limit?: number
  // cursor to use when paginating results. this value will be provided in the response so you can request the next set of results
  cursor?: string
}
```

jsonschema for the `GetPlaysRequest` object:

```typescript
export const GetPlaysRequestSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    limit: {
      type: 'number',
      minimum: 1,
      maximum: 500,
    },
    cursor: {
      type: 'string',
    },
  },
}
```

```typescript
export type GetPlaysResponse = {
  // plays returned from the API
  plays: Play[]
  // cursor to use to fetch the next set of results
  cursor: string
}

export type Play = {
  // id of this play on the Flow blockchain
  flowId: number
  // category of the play (ie: Dunk)
  playCategory: string
  // jersey number of the player for this play
  jerseyNumber: number
  // player's full name
  playerName: string
  // ID for this play on Top Shot (used in Top Shot URLs)
  externalId: string | null
  // league (ie: NBA, WNBA)
  league: string | null
  // the date for the moment (in ISO 8601 format)
  dateOfMoment: string
}
```

---

### Getting Set Plays

A `SetPlay` is a combination of a set and play that make up a moment edition on Top Shot.

```typescript
function getSetPlays (request: GetSetPlaysRequest): Promise<GetSetPlaysResponse>
```

```typescript
export type GetSetPlaysRequest = {
  // limit results to specified sets (these are the flow IDs of the sets)
  sets?: number[]
  // limit results to specified plays (these are the flow IDs of the plays)
  plays?: number[]
  // limit the number of results returned (defaults to 100, max is 500)
  limit?: number
  // cursor to use when paginating results. this value will be provided in the response so you can request the next set of results
  cursor?: string
}
```

jsonschema for the `GetSetPlaysRequest` object

```typescript
export const GetSetPlaysRequestSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    sets: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
    plays: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
    limit: {
      type: 'number',
      minimum: 1,
      maximum: 500,
    },
    cursor: {
      type: 'string',
    },
  },
}
```

```typescript
export type GetSetPlaysResponse = {
  // set plays returned by the API
  setPlays: SetPlay[]
  // cursor used for requesting the next page of results
  cursor: string
}

export type SetPlay = {
  // set for this set play
  set: Set
  // play for this set play
  play: Play
  // circulation count
  circulationCount: number
  // whether or not this set play is retired (this means it is LE)
  isRetired: boolean
}

export type Set = {
  // Id of this set on the Flow blockchain
  flowId: number
  // name of the set (can be null if no name has been found)
  name: string | null
  // ID for this set on Top Shot (used in Top Shot URLs)
  externalId: string | null
  // series number
  series: number
  // name of the series
  seriesName: string | null
  // visual id of the set (ie: SET_VISUAL_LEGENDARY)
  visualId: string | null
}

export type Play = {
  // id of this play on the Flow blockchain
  flowId: number
  // category of the play (ie: Dunk)
  playCategory: string
  // jersey number of the player for this play
  jerseyNumber: number
  // player's full name
  playerName: string
  // ID for this play on Top Shot (used in Top Shot URLs)
  externalId: string | null
  // league (ie: NBA, WNBA)
  league: string | null
  // the date for the moment (in ISO 8601 format)
  dateOfMoment: string
}
```

---

### Getting Active Listings

This will query for any currently active listings on the Top Shot marketplace

```typescript
function getActiveListings (request: GetActiveListingsRequest): Promise<GetActiveListingsResponse>
```

```typescript
export type GetActiveListingsRequest = {
  // set to retrieve listings for (this is the flow ID of the set)
  set: number
  // play to retrieve listings for (this is the flow ID of the play)
  play: number
  // minimum serial number to retrieve
  minSerial?: number
  // maximum serial number to retrieve
  maxSerial?: number
  // minimum price of listings to retrieve
  minPrice?: number
  // maximum price of listings to retrieve
  maxPrice?: number
  // earliest date to return listings for
  fromDate?: string
  // latest date to return listings for
  toDate?: string
  // limit the number of results returned (defaults to 100, max is 500)
  limit?: number
  // cursor to use when paginating results. this value will be provided in the response so you can request the next set of results
  cursor?: string
}
```

jsonschema for the `GetActiveListingsRequest` object

```typescript
export const GetActiveListingsRequestSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    set: {
      type: 'number',
    },
    play: {
      type: 'number',
    },
    minSerial: {
      type: 'number',
    },
    maxSerial: {
      type: 'number',
    },
    minPrice: {
      type: 'number',
    },
    maxPrice: {
      type: 'number',
    },
    fromDate: {
      type: 'date-time',
    },
    toDate: {
      type: 'date-time',
    },
    limit: {
      type: 'number',
      minimum: 1,
      maximum: 500,
    },
    cursor: {
      type: 'string',
    },
  },
  required: ['set', 'play'],
}
```

```typescript
import { ActiveListing } from './models/ActiveListing'

export type GetActiveListingsResponse = {
  // active listings returned from the API
  activeListings: ActiveListing[]
  // total number of listings that matched the query
  total: number
  // cursor to use for requested the next page of results
  cursor: string
}

export type ActiveListing = {
  // date of the listing (ISO 8601 format)
  date: string
  // price of the listing (in USD)
  price: number
  // seller information
  seller: {
    // the seller's flow address (no leading 0x)
    flowAddress: string
    // Top Shot username of the seller (if available)
    topShotUsername: string | null
  }
  // information about the specific moment listed
  moment: {
    // id of the moment on the Flow blockchain
    flowId: number
    // serial number of the moment
    serialNumber: number
    // ID for this set on Top Shot (used in Top Shot URLs)
    externalId: string | null
  }
}
```

---

### Getting Feed Authentication Token

This method will request an authentication token that can be used by the [RayvinFeed](./rayvin-feed.md) class to connect to the real-time data feed from Rayvin.

```typescript
function getFeedAuthToken (): Promise<GetFeedAuthTokenResponse>
```

```typescript
export type GetFeedAuthTokenResponse = {
  // WebSocket endpoint to connect to for the real-time feed
  endpoint: string
  // auth token to use when connecting to the real-time feed
  authToken: string
}
```
