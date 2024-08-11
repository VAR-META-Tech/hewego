import { Injectable } from '@nestjs/common';
import {
  Client,
  ContractCallQuery,
  AccountId,
  PrivateKey,
  ContractFunctionParameters,
} from '@hashgraph/sdk';
import { ApiConfigService } from 'shared/services/api-config.service';
@Injectable()
export class ContractService {
  private _client: Client;
  private _priceFeedContractId: string;

  constructor(private readonly configService: ApiConfigService) {
    this._client = Client.forTestnet().setOperator(
      AccountId.fromString(this.configService.getHederaConfig.operatorId),
      PrivateKey.fromStringECDSA(
        this.configService.getHederaConfig.operatorKey,
      ),
    );
    this._priceFeedContractId =
      this.configService.getHederaConfig.priceFeedContractId;
  }

  async getLatestPrice(tokenA: string, tokenB: string) {
    try {
      const contractQuery = new ContractCallQuery()
        .setContractId(this._priceFeedContractId)
        .setGas(100000)
        .setFunction(
          'getLatestPrice',
          new ContractFunctionParameters()
            .addAddress(tokenA)
            .addAddress(tokenB),
        );

      const contractExec = await contractQuery.execute(this._client);
      return contractExec;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
