import { combineReducers } from "redux";
import auth from './loginReducer';
import branches from './branchReducer';
import merchantBranch from './MerchantBranchReducer';
import orders from './orderReducer';
import categories from './categoryReducer';
import accepted from './acceptTransactionReducer';
import canceled from './cancelTransactionReducer';
import transactions from './transactionHistoryReducer';
import transactionsAccepted from './transactionAcceptedReducer';
import transactionsCancelled from './transactionCancelledReducer';
import updateBalance from './updateBranchBalanceReducer';

import account from './accountReducer';

export default combineReducers({
    auth,
    branches,
    merchantBranch,
    orders,
    categories,
    accepted,
    canceled,
    transactions,
    transactionsAccepted,
    updateBalance,
    transactionsCancelled,
    account
});