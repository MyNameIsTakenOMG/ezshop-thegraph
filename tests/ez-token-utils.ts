import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  EZTokenApproval,
  EZTokenTransfer,
  withdrew
} from "../generated/EZToken/EZToken"

export function createEZTokenApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): EZTokenApproval {
  let ezTokenApprovalEvent = changetype<EZTokenApproval>(newMockEvent())

  ezTokenApprovalEvent.parameters = new Array()

  ezTokenApprovalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  ezTokenApprovalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  ezTokenApprovalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return ezTokenApprovalEvent
}

export function createEZTokenTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): EZTokenTransfer {
  let ezTokenTransferEvent = changetype<EZTokenTransfer>(newMockEvent())

  ezTokenTransferEvent.parameters = new Array()

  ezTokenTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ezTokenTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  ezTokenTransferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return ezTokenTransferEvent
}

export function createwithdrewEvent(
  owner: Address,
  totalEth: BigInt
): withdrew {
  let withdrewEvent = changetype<withdrew>(newMockEvent())

  withdrewEvent.parameters = new Array()

  withdrewEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  withdrewEvent.parameters.push(
    new ethereum.EventParam(
      "totalEth",
      ethereum.Value.fromUnsignedBigInt(totalEth)
    )
  )

  return withdrewEvent
}
