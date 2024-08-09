import {HotWalletType, SortBy, SortType} from '../enums';

export interface SearchOptions {
    page?: number;

    limit?: number;

    currency?: string;

    startDate?: number;

    endDate?: number;

    status?: string;

    address?: string;

    sortBy?: SortBy;

    sortType?: SortType;

    hotWalletType?: HotWalletType;

    withdrawalColdWallet?: boolean;
}
