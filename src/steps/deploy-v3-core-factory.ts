import TartzFactory from '@uniswap/v3-core/artifacts/contracts/TartzFactory.sol/TartzFactory.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V3_CORE_FACTORY = createDeployContractStep({
  key: 'v3CoreFactoryAddress',
  artifact: TartzFactory,
})
