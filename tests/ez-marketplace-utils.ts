import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  itemCancelled,
  itemListed,
  itemPurchased
} from "../generated/EZMarketplace/EZMarketplace"

export function createitemCancelledEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt
): itemCancelled {
  let itemCancelledEvent = changetype<itemCancelled>(newMockEvent())

  itemCancelledEvent.parameters = new Array()

  itemCancelledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return itemCancelledEvent
}

export function createitemListedEvent(
  seller: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): itemListed {
  let itemListedEvent = changetype<itemListed>(newMockEvent())

  itemListedEvent.parameters = new Array()

  itemListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return itemListedEvent
}

export function createitemPurchasedEvent(
  buyer: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): itemPurchased {
  let itemPurchasedEvent = changetype<itemPurchased>(newMockEvent())

  itemPurchasedEvent.parameters = new Array()

  itemPurchasedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  itemPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemPurchasedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return itemPurchasedEvent
}
