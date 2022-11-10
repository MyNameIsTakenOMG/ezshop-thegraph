import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  EZTokenApproval as EZTokenApprovalEvent,
  EZTokenTransfer as EZTokenTransferEvent,
  withdrew as withdrewEvent
} from "../generated/EZToken/EZToken"
import { User } from "../generated/schema"

export function handleEZTokenApproval(event: EZTokenApprovalEvent): void {
  let theUser = User.load(event.params.owner.toHex())
  theUser!.allowance = event.params.value
  theUser!.save()
}

export function handleEZTokenTransfer(event: EZTokenTransferEvent): void {

  // if 'from' address is 0, meaning user bought some tokens, then create a new User if there is not one
  if(event.params.from == Address.zero()){
    let theUser = User.load(event.params.to.toHex())
    if(theUser == null){
      theUser = new User(event.params.to.toHex())
      theUser.balance = BigInt.fromI32(0)
      theUser.allowance = BigInt.fromI32(0)
      theUser.nftNum = BigInt.fromI32(0)
    }
    theUser.balance = event.params.value
    theUser.save()
  }
  // else transfer tokens from 'from' address to 'to' address
  else{
    let fromUser = User.load(event.params.from.toHex())
    let toUser = User.load(event.params.to.toHex())
    if(fromUser && toUser){
      toUser.balance = event.params.value.plus(toUser.balance)
      toUser.save()
      fromUser.balance = fromUser.balance.minus(event.params.value)
      fromUser.save()
    }
  }
}

export function handlewithdrew(event: withdrewEvent): void {}
