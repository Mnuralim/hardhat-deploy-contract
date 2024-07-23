import hre from 'hardhat'
import { encryptDataField } from '@swisstronik/utils'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/src/signers'
import { HttpNetworkConfig } from 'hardhat/types'
import deployedAddress from '../utils/deployed-address'

const sendShieldedTransaction = async (
  signer: HardhatEthersSigner,
  destination: string,
  data: string,
  value: number
) => {
  // Get the RPC link from the network configuration
  const rpclink = (hre.network.config as HttpNetworkConfig).url

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpclink, data)

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  })
}

async function main() {
  // Address of the deployed contract
  const contractAddress = deployedAddress

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners()

  // Construct a contract instance
  const contractFactory = await hre.ethers.getContractFactory('Swisstronik')
  const contract = contractFactory.attach(contractAddress)

  // Send a shielded transaction to set a message in the contract
  const functionName = 'setMessage'
  const messageToSet = 'Hello Swisstronik!!'
  const setMessageTx = await sendShieldedTransaction(
    //@ts-ignore
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, [messageToSet]),
    0
  )
  await setMessageTx.wait()

  //It should return a TransactionResponse object
  console.log('Transaction Receipt: ', setMessageTx)
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
