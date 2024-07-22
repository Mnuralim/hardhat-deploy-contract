// Import Hardhat and SwisstronikJS functions
import hre from 'hardhat'
import { encryptDataField, decryptNodeResponse } from '@swisstronik/utils'
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider'
import { JsonRpcProvider } from 'ethers'

const sendShieldedQuery = async (
  provider: HardhatEthersProvider | JsonRpcProvider,
  destination: string,
  data: string
) => {
  // Get the RPC link from the network configuration
  //@ts-ignore
  const rpclink = hre.network.config.url

  // Encrypt the call data using the SwisstronikJS function
  const [encryptedData, usedEncryptedKey] = await encryptDataField(rpclink, data)

  // Execute the call/query using the provider
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  })

  // Decrypt the call result using SwisstronikJS function
  return await decryptNodeResponse(rpclink, response, usedEncryptedKey)
}

async function main() {
  // Address of the deployed contract
  const contractAddress = '0xf1f0C7Bf19ee4E196C0213cEE1002e9a5fadff62'

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners()

  // Construct a contract instance
  const contractFactory = await hre.ethers.getContractFactory('Swisstronik')
  const contract = contractFactory.attach(contractAddress)

  // Send a shielded query to retrieve data from the contract
  const functionName = 'getMessage'
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName)
  )

  // Decode the Uint8Array response into a readable string
  console.log('Decoded response:', contract.interface.decodeFunctionResult(functionName, responseMessage)[0])
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
