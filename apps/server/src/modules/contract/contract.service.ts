import { Injectable } from '@nestjs/common';
import {
  Client,
  ContractCallQuery,
  AccountId,
  PrivateKey,
  ContractFunctionParameters,
} from '@hashgraph/sdk';
import { ApiConfigService } from 'shared/services/api-config.service';
import { BigNumber } from '@hashgraph/sdk/lib/Transfer';
@Injectable()
export class ContractService {
  private _client: Client;
  private _bondIssuanceContractId: string;

  constructor(private readonly configService: ApiConfigService) {
    this._client = Client.forTestnet().setOperator(
      AccountId.fromString(this.configService.getHederaConfig.operatorId),
      PrivateKey.fromStringECDSA(
        this.configService.getHederaConfig.operatorKey,
      ),
    );
    this._bondIssuanceContractId =
      this.configService.getHederaConfig.bondIssuanceContractId;
  }

  async getCollateralAmount(
    loanToken: string,
    loanAmount: number,
    collateralToken: string,
  ): Promise<BigNumber> {
    try {
      const contractQuery = new ContractCallQuery()
        .setContractId(this._bondIssuanceContractId)
        .setGas(100000)
        .setFunction(
          'collateralAmountCalculation',
          new ContractFunctionParameters()
            .addAddress(loanToken)
            .addUint256(loanAmount)
            .addAddress(collateralToken),
        );
      const contractExec = await contractQuery.execute(this._client);
      return contractExec.getUint256(0);
    } catch (error) {
      throw error;
    }
  }
}
