import { BigInt } from "@graphprotocol/graph-ts"
import {
  itemCancelled as itemCancelledEvent,
  itemListed as itemListedEvent,
  itemPurchased as itemPurchasedEvent
} from "../generated/EZMarketplace/EZMarketplace"
import { Nft } from "../generated/schema"

export function handleitemCancelled(event: itemCancelledEvent): void {
  let nftAddress = event.params.nftAddress.toHex()
  let tokenId = event.params.tokenId.toHex()
  let nft = Nft.load(tokenId+nftAddress)
  nft!.price = BigInt.fromI32(0)
  nft!.save()
}

export function handleitemListed(event: itemListedEvent): void {
  let nftAddress = event.params.nftAddress.toHex()
  let tokenId = event.params.tokenId.toHex()
  let nft = Nft.load(tokenId+nftAddress)
  nft!.price = event.params.price
  nft!.save()
}

export function handleitemPurchased(event: itemPurchasedEvent): void {}
