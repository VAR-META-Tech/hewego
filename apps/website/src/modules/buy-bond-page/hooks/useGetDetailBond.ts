import React from 'react';
import { useParams } from 'next/navigation';
import { useGetDetailBondQuery } from '@/api/bonds/queries';

export const useGetBondDetail = () => {
  const params = useParams();
  const bondId = params?.bondId || '';

  const { data, ...rest } = useGetDetailBondQuery({
    variables: {
      id: Number(bondId),
    },
    enabled: !!bondId,
  });

  const maxBondValue = React.useMemo(() => {
    if (!data?.data) return 0;

    return Number(data?.data?.loanAmount) / 100;
  }, [data?.data]);

  const loanToken = React.useMemo(() => {
    if (!data?.data) return '';

    return data?.data?.loanToken;
  }, [data?.data]);

  const loanAmount = React.useMemo(() => {
    if (!data?.data) return 0;

    return Number(data?.data?.loanAmount);
  }, [data?.data]);

  const lenderInterestRate = React.useMemo(() => {
    if (!data?.data) return 0;

    return Number(data?.data?.interestRate);
  }, [data?.data]);

  return {
    data,
    bond: data?.data || null,
    loanToken,
    loanAmount,
    maxBondValue,
    lenderInterestRate,
    ...rest,
  };
};
