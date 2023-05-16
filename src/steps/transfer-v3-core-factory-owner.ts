import TartzFactory from '@uniswap/v3-core/artifacts/contracts/TartzFactory.sol/TartzFactory.json'
import { Contract } from '@ethersproject/contracts'
import { MigrationStep } from '../migrations'

export const TRANSFER_V3_CORE_FACTORY_OWNER: MigrationStep = async (state, { signer, gasPrice, ownerAddress }) => {
  if (state.v3CoreFactoryAddress === undefined) {
    throw new Error('Missing TartzFactory')
  }

  const v3CoreFactory = new Contract(state.v3CoreFactoryAddress, TartzFactory.abi, signer)

  const owner = await v3CoreFactory.owner()
  if (owner === ownerAddress)
    return [
      {
        message: `TartzFactory owned by ${ownerAddress} already`,
      },
    ]

  if (owner !== (await signer.getAddress())) {
    throw new Error('TartzFactory.owner is not signer')
  }

  const tx = await v3CoreFactory.setOwner(ownerAddress, { gasPrice })

  return [
    {
      message: `TartzFactory ownership set to ${ownerAddress}`,
      hash: tx.hash,
    },
  ]
}
