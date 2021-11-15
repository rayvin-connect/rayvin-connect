## Rayvin Connect

Rayvin Connect allows you to tap into the data feed from [Rayvin](https://rayvin.io/) so that you can extend and customize the functionality to work in ways that we haven't thought of yet. You can create complex filters, build your own UI to display information in a custom way, or even implement your own pricing models.

Once your custom logic determines that you are interested in a moment, you can leverage Rayvin's notification system to send yourself a notification over email or Telegram (just like we do for Price Watch alerts).

This repository contains a JavaScript library that implements the interface of Rayvin Connect, but you can consume the API in whatever language/environment that you'd like. Check out the [API Reference](docs/api-reference.md) for details about the available endpoints.

---

### Beta

Rayvin Connect is still very much in beta. We don't plan on making any breaking changes, but please always check this repository for the latest information about the status of the API and library. If you run into any issues, please report them on this repository.

We are planning on expanding the functionality available through the API, and are very receptive to any feature requests. Create an issue on this repository if there is something that you'd like to see!

---

### Quickstart

If you want to dive right in, just install the package from NPM into a JavaScript project and paste the example code below. If you want to dig deeper, check out the [full documentation](docs/index.md).

```shell
npm install @rayvin-connect/rayvin-connect
```

You can find the following code in the [basic-feed example](src/examples/basic-feed.ts):

```typescript
import { momentUrl, niceVisualName } from '../lib/helpers/top-shot-helpers'
import { RayvinFeed } from '../lib/feed/rayvin-feed'
import { RayvinClient } from '../lib/api/rayvin-client'

// this example connects to Rayvin's real-time marketplace feed and outputs all new listings to the console

(async () => {
  // you will need to generate an API key on https://rayvin.io/ to access the API
  // log in and navigate to the "Rayvin Connect" page from the header navigation menu
  const API_KEY = 'YOUR_API_KEY_GOES_HERE'

  // create the HTTP API client
  const client = new RayvinClient(API_KEY)

  // create the real-time feed client
  const feed = new RayvinFeed(client)

  // the "pong" event will be emitted every time the server responds to the automatic ping requests
  feed.on('pong', ev => console.log(`Pong: ${ev.pingTime}ms`))

  // the "error" event will be emitted when an error occurs
  feed.on('error', ev => console.error(`Error: ${ev.error}`))

  // the "connected" event will be emitted when the real-time feed connects to the server
  feed.on('connected', () => console.log('Connected'))

  // the "disconnected" event will be emitted if the real-time feed disconnects from the server
  feed.on('disconnected', () => console.log('Disconnected'))

  // the "moment-listed" event will be emitted every time a new listing is posted to the marketplace
  feed.on('moment-listed', ev => {
    const isNewLowestAsk = Boolean(ev.previousLowestAsk && ev.previousLowestAsk > ev.listing.price)

    const momentInfo: string[] = [
      `${ev.play.playerName} ${ev.play.playCategory} #${ev.moment.serialNumber}/${ev.setPlay.circulationCount}`,
      `${ev.set.name} (${ev.set.seriesName}) ${niceVisualName(ev.set.visualId)}`,
      `$${ev.listing.price}${isNewLowestAsk ? ` NEW LOWEST` : ''}`,
      momentUrl(ev.moment.externalId),
    ]

    console.log(`${momentInfo.join('\n')}\n---`)

    if (isNewLowestAsk) {
      // uncomment this to receive a notification (through the Rayvin alert system) every time there is a new lowest ask posted to the marketplace
      // client.sendNotification({
      //   message: `New lowest ask:\n${momentInfo.join('\n')}`,
      // })
    }
  })

  // the "moment-purchased" event will be emitted every time a listing is purchased from the marketplace
  feed.on('moment-purchased', ev => {
  })

  // the "moment-withdrawn" event will be emitted every time a listing is withdrawn from the marketplace
  feed.on('moment-withdrawn', ev => {
  })

  // connect to the real-time marketplace listing feed
  console.log('Connecting...')
  await feed.connect()

  await new Promise(resolve => {
    // just wait until the application is terminated
  })
})()
```
