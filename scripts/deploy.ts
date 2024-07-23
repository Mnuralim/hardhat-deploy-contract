import hre from 'hardhat'
import fs from 'fs'
import path from 'path'

async function main() {
  const contract = await hre.ethers.deployContract('Swisstronik', ['Hello Swisstronik!!'])

  await contract.waitForDeployment()
  const contractAddress = await contract.getAddress()

  console.log(`Swisstronik contract deployed to ${contractAddress}`)

  const deployedAddressPath = path.join(__dirname, '..', 'utils', 'deployed-address.ts')
  const fileContent = `const deployedAddress = '${contractAddress}'\n\nexport default deployedAddress\n`
  fs.writeFileSync(deployedAddressPath, fileContent, { encoding: 'utf8' })
  console.log('Address written to deployedAddress.ts')
}

//DEFAULT BY HARDHAT:
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
