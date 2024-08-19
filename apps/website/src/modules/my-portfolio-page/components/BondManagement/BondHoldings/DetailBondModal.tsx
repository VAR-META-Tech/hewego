/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IGetBondHoldingsData } from '@/api/portfolio/type';
import { SupplyProgress } from '@/modules/home-page/components/BuyBondModal/SupplyProgress';
import { useBondHoldingsStore } from '@/modules/my-portfolio-page/store/useBondHoldingsStore';
import { TAB_VALUE } from '@/modules/my-portfolio-page/utils/const';
import { roundNumber } from '@/utils/common';
import { DATE_FORMAT, TOKEN_UNIT } from '@/utils/constants';
import { Button, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import { format } from 'date-fns';
import { formatUnits } from 'viem';

import { useGetMetaToken } from '@/hooks/useGetMetaToken';
import PreviewRow from '@/components/PreviewRow';
import { HStack, VStack } from '@/components/Utilities';

interface Props {
  bond: IGetBondHoldingsData;
  setTabContainer: React.Dispatch<React.SetStateAction<string>>;
}

const DetailBondModal: React.FC<Props> = ({ bond, setTabContainer }) => {
  const bondDetailId = useBondHoldingsStore.use.bondDetailId();
  const setBondDetailId = useBondHoldingsStore.use.setBondDetailId();

  const { getLoanTokenLabel } = useGetMetaToken();

  const loanTokenLabel = React.useMemo(() => {
    if (!bond?.bondInfo?.loanToken) return '';

    return getLoanTokenLabel(bond?.bondInfo?.loanToken);
  }, [bond?.bondInfo?.loanToken, getLoanTokenLabel]);

  const handleClear = () => {
    setBondDetailId('');
  };

  const loanAmount = React.useMemo(() => {
    if (!bond?.purchasedAmount) return 0;

    return Number(formatUnits(BigInt(bond?.purchasedAmount || 0), Number(TOKEN_UNIT)));
  }, [bond?.purchasedAmount]);

  const totalInterest = React.useMemo(() => {
    if (!loanAmount || !bond?.bondInfo?.interestRate || !bond?.bondInfo?.loanTerm) return 0;

    const weekRate = Number(bond?.bondInfo?.loanTerm) / 52;

    return Number((loanAmount * Number(bond?.bondInfo?.interestRate) * Number(weekRate)) / 100);
  }, [bond?.bondInfo?.interestRate, bond?.bondInfo?.loanTerm, loanAmount]);

  const handleViewTransaction = () => {
    handleClear();
    setTabContainer(TAB_VALUE.HISTORY);
  };

  return (
    <Modal
      size="xl"
      backdrop={'blur'}
      isOpen={Number(bond?.bondInfo?.bondId) === Number(bondDetailId)}
      placement={'auto'}
      onOpenChange={handleClear}
    >
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <VStack className="shadow-lg p-8 rounded-md w-full">
                <VStack align={'center'}>
                  <SupplyProgress
                    progress={Number(bond?.bondInfo?.totalSold ?? 0)}
                    total={bond?.bondInfo?.volumeBond ?? 0}
                  />

                  <span className="text-center font-bold">{bond?.bondInfo?.name}</span>
                </VStack>

                <VStack>
                  <PreviewRow label="Quantity" value={bond?.bondAmount || ''} />

                  <PreviewRow
                    label="Purchase Date"
                    value={bond?.purchaseDate ? format(new Date(bond?.purchaseDate), DATE_FORMAT.DD_MM_YYYY) : ''}
                  />

                  <PreviewRow
                    label="Issuance Date"
                    value={
                      bond?.bondInfo?.issuanceDate
                        ? format(new Date(Number(bond?.bondInfo?.issuanceDate) * 1000), DATE_FORMAT.DD_MM_YYYY)
                        : ''
                    }
                  />

                  <PreviewRow
                    label="Maturity Date"
                    value={
                      bond?.bondInfo?.maturityDate
                        ? format(new Date(Number(bond?.bondInfo?.maturityDate) * 1000), DATE_FORMAT.DD_MM_YYYY)
                        : ''
                    }
                  />

                  <PreviewRow label="Total Value" value={`${loanAmount} ${loanTokenLabel}`} />

                  <PreviewRow label="Interest Rate" value={`${Number(bond?.bondInfo?.interestRate || 0)}%`} />

                  <PreviewRow label="Duration" value={`${bond?.bondInfo?.loanTerm || 0} weeks`} />

                  <PreviewRow
                    label="Total Interest Earned"
                    value={`${Number(roundNumber(totalInterest))} ${loanTokenLabel}`}
                  />

                  <PreviewRow
                    label="Total Received Amount"
                    value={`${Number(loanAmount) + Number(roundNumber(totalInterest))} ${loanTokenLabel}`}
                  />
                </VStack>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <HStack>
                <Button variant="ghost" onPress={handleClear}>
                  Close
                </Button>

                <Button className="bg-primary-700 text-white" onPress={handleViewTransaction}>
                  View Transaction History
                </Button>
              </HStack>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DetailBondModal;
