# Welcome to EZshop (subgraph part)!

## Introduction

This is the subgraph part of the project **EZshop**.  

**EZshop** is a personal project under development that mimics some functionalities of the website **OpenSea**, from which users can create their own **NFT**s (non fungible tokens) as well as sell and buy them by using the native token **EZ** tokens (EZT)

## Subgraph

This part of the project is taking advantage of `TheGraph` to build a Graphql API ('Subgraph'), so that we can efficiently query data coming from the blockchains. 

In the `src` folder, we have three files `ez-marketplace.ts`, `ez-token.ts`, and `ez-nft.ts` used to handle events emitted from contracts `EZToken.sol` , `EZNft.sol` and `EZMarketplace.sol` respectively .

In the file `schema.graphql`, we define our `@entities` so that we can query later.


# Technologies

 - Graphql
 - TheGraph subgraph studio
 - Typescript

## Get Started

This is the part showing how to get a local copy up and running. Please follow the steps:

**Prerequisites**

Please make sure **Node.js** has been downloaded and installed globally. The download link:  [Node.js](https://nodejs.org/en/download/)

Also, since the project is using **yarn** instead of **npm**, so please make sure yarn installed globally.
Using the command to install yarn :
```
npm install --global yarn 
```
**Create a subgraph**

First, go to `subgraph studio` to create a new subgraph, [Subgraph Studio]([https://thegraph.com/studio/](https://thegraph.com/studio/))

**Install the graph cli**

`yarn global add @graphprotocol/graph-cli`

**Initialize your subgraph**

`graph init --studio <SUBGRAPH_SLUG>` , the `<SUBGRAPH_SLUG>` is the one you used when created your subgraph on `Subgraph Studio`

Note:  remember to add `startBlock` property under the property `source` in your subgraph manifest file `subgraph.yaml` 


**Deploy your subgraph**

Before deploying your subgraph, make sure run the following commands `graph codegen`, `graph build`
,then go to your subgraph studio page, obtain the `deploy key` and run the command:
`graph auth --studio <DEPLOY KEY>` ,
lastly, run the command `graph deploy --studio <SUBGRAPH_SLUG>` to deploy your subgraph

**Test your subgraph (Goerli testnet)**

Back in your `ezshop-contracts` project, run the command:
`yarn hardhat run scripts/mint-and-list.js`,
then go to `playground` of your subgraph and run the query:
```
{
	nfts(where:{price_gt:0}){
		owner{
			id
		}
		nftAddress
		tokenId
		price
	}
}
```

## Challenge

Since we have mutiple contracts to handle here, and one is `erc20` contract and another is `erc721`, and both of them have events named `Approval` and `Transfer` , hence `graph client` would solve this naming conflicts by adding a prefix `{contractName}` to event name, for example, an event name `Approval` will be changed to `MyTokenApproval` .  However, by doing that, theGraph would not be able to listen to the events it is supposed to, because there is no event named `MyTokenApproval` from the contract, which could lead to inconsistency of data store in the theGraph network.
- **Possible solution** : add extra events to the contract which has the events with the same names, but it could mean we have to emit our events in multiple places or functions.



