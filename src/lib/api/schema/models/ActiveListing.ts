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
