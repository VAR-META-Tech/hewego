import React from 'react';
import { useGetMetadataTokensQuery } from '@/api/metadata/queries';
import { TOKEN_TYPE } from '@/utils/constants';

export const useGetMetaToken = () => {
  const { data, ...rest } = useGetMetadataTokensQuery();

  const tokens = React.useMemo(() => {
    if (!data) return [];

    return data?.data;
  }, [data]);

  const borrowTokenData = React.useMemo(() => {
    if (!data) return [];

    return tokens
      ?.filter((token) => token.type === TOKEN_TYPE.LOAN)
      .map((token) => ({
        label: token.symbol,
        value: token.address,
      }));
  }, [data, tokens]);

  const collateralTokenData = React.useMemo(() => {
    if (!data) return [];

    return tokens
      ?.filter((token) => token.type === TOKEN_TYPE.COLLATERAL)
      .map((token) => ({
        label: token.symbol,
        value: token.address,
      }));
  }, [data, tokens]);

  const getLoanTokenLabel = React.useCallback(
    (address: string) => {
      if (!data || !borrowTokenData?.length) return '';

      return borrowTokenData.find((token) => token.value === address)?.label;
    },
    [borrowTokenData, data]
  );

  const getCollateralTokenLabel = React.useCallback(
    (address: string) => {
      if (!data || !collateralTokenData?.length) return '';

      return collateralTokenData.find((token) => token.value === address)?.label;
    },
    [collateralTokenData, data]
  );

  const tokenData = React.useMemo(() => {
    if (!data) return [];

    return tokens.map((token) => ({
      label: token.symbol,
      value: token.symbol,
    }));
  }, [data, tokens]);

  return {
    data,
    tokens,
    borrowTokenData,
    collateralTokenData,
    getLoanTokenLabel,
    getCollateralTokenLabel,
    tokenData,
    ...rest,
  };
};
