import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent
} from "../generated/EZNft/EZNft"
import {Nft, User} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {}

export function handleTransfer(event: TransferEvent): void {
  // if the 'from' address is o, then user just minted a new nft, create a new user there is not one
  if(event.params.from == Address.zero()){
    let theUser = User.load(event.params.to.toHex())
    if(theUser == null){
      theUser = new User(event.params.to.toHex())
      theUser.balance = BigInt.fromI32(0)
      theUser.allowance = BigInt.fromI32(0)
      theUser.nftNum = BigInt.fromI32(0)
    }
    let nftAddress = event.address.toHex()
    let tokenId = event.params.tokenId.toHex()
    let newNft = new Nft(tokenId+nftAddress)
    newNft.owner = theUser.id
    newNft.nftAddress = nftAddress
    newNft.tokenId = event.params.tokenId
    newNft.price = BigInt.fromI32(0)
    newNft.save()
    theUser.nftNum = theUser.nftNum.plus(BigInt.fromI32(1))
    theUser.save()
  }
  // else then transfer the nft from the 'from' address to the 'to' address
  else{
    let fromUser = User.load(event.params.from.toHex())
    let toUser = User.load(event.params.to.toHex())
    let nftAddress = event.address.toHex()
    let tokenId = event.params.tokenId.toHex()
    let nft = Nft.load(tokenId+nftAddress)

    fromUser!.nftNum = fromUser!.nftNum.minus(BigInt.fromI32(1))
    fromUser!.save()
    if(!toUser){
      toUser = new User(event.params.to.toHex())
      toUser.allowance = BigInt.fromI32(0)
      toUser.balance = BigInt.fromI32(0)
      toUser.nftNum = BigInt.fromI32(0)
    }
    toUser.nftNum = toUser.nftNum.plus(BigInt.fromI32(1))
    toUser.save()

    nft!.owner = toUser.id
    nft!.price = BigInt.fromI32(0)
    nft!.save()

  }
}
