[Back to Index](../index.md)

### Rayvin Feed

The `RayvinFeed` class ([rayvin-feed.ts](../../src/lib/feed/rayvin-feed.ts)) is responsible for interfacing with Rayvin Connect's real-time WebSocket marketplace data feed. The schema for all WebSocket messages can be found in the [messages/](../../src/lib/feed/messages) folder.

Once connected, the WebSocket will automatically reconnect if it is disconnected for some reason. It will emit events for any messages that are received from the server.

#### Constructor

```typescript
function constructor (private readonly client: RayvinClient)
```

You must provide an intance of the `RayvinClient` class that you have created using your API key.

#### Methods

```typescript
// connect to the feed
function connect (): Promise<void>
```

```typescript
// add an event listner for feed events
function on (s: string, listener: (ev: any) => void): void
```

Available events are described in the [Events](#events) section below.

```typescript
// disconnect from the feed
function disconnect ()
```

---

#### Events

```typescript
// event = 'moment-listed'

// payload
export type MomentListedData = {
  // timestamp of when this message was sent by the server
  timestamp: number
  // block height of the transaction that emitted this event on the blockchain
  blockHeight: number
  // listing data
  listing: {
    // price of the listing (in USD)
    price: number
    // seller data
    seller: {
      // flow address of the seller (no leading 0x)
      flowAddress: string
      // top shot username of the seller (if available)
      topShotUsername: string | null
    }
  }
  // moment data
  moment: {
    // id of the moment on the Flow blockchain
    flowId: number
    // serial number of the moment
    serialNumber: number
    // ID for this moment on Top Shot (used in Top Shot URLs)
    externalId: string
  }
  // set data
  set: {
    // id of the set on the Flow blockchain
    flowId: number
    // name of the set (can be null if no name has been found)
    name: string
    // series number
    series: number
    // name of the series
    seriesName: string | null
    // visual id of the set (ie: SET_VISUAL_LEGENDARY)
    visualId: string
    // ID for this set on Top Shot (used in Top Shot URLs)
    externalId: string
  }
  // play data
  play: {
    // id of this play on the Flow blockchain
    flowId: number
    // player's full name
    playerName: string
    // category of the play (ie: Dunk)
    playCategory: string
    // jersey number of the player for this play
    jerseyNumber: number
    // ID for this play on Top Shot (used in Top Shot URLs)
    externalId: string
    // league (ie: NBA, WNBA)
    league: string
  }
  // set play data
  setPlay: {
    // circulation count
    circulationCount: number
    // whether or not this set play is retired (this means it is LE)
    isRetired: boolean
  }
  // tags for the listing
  tags: {
    // id of the tag on Top Shot
    id: string
    // title of the tag
    title: string
  }[]
  // if the lowest ask changed with this listing, the previous lowest ask will be provided here
  previousLowestAsk?: number
  // current lowest ask
  lowestAsk?: number
}
```

```typescript
// event = 'moment-withdrawn'

// payload
export type MomentWithdrawnData = {
  // timestamp of when this message was sent by the server
  timestamp: number
  // block height of the transaction that emitted this event on the blockchain
  blockHeight: number
  // moment data
  moment: {
    // flow blockchain id of the moment that was withdrawn
    flowId: number
  }
}
```

```typescript
// event = 'moment-purchased'

// payload
export type MomentPurchasedData = {
  // timestamp of when this message was sent by the server
  timestamp: number
  // block height of the transaction that emitted this event on the blockchain
  blockHeight: number
  // moment data
  moment: {
    // flow id of the moment that was purchased
    flowId: number
    // serial number of the moment that was purchased
    serialNumber: number
  }
  // purchase data
  purchase: {
    // purchase price of the moment (in USD)
    price: number
    // buyer data
    buyer: {
      // flow address of the buyer (no leading 0x)
      flowAddress: string
      // Top Shot username of the buyer (if available)
      topShotUsername: string | null
    }
  }
  // set data
  set: {
    // flow id of the set
    flowId: number
  }
  // play data
  play: {
    // flow id of the play
    flowId: number
  }
}
```

```typescript
// event = 'connected'

// no payload
```

```typescript
// event = 'disconnected'

// no payload
```

```typescript
// event = 'pong'

// payload
type PongData = {
  // time it took for the ping response to return
  pingTime: number
}
```

```typescript
// event = 'error'

// payload
type ErrorData = {
  // error message returned by the server
  error: string
}
```
