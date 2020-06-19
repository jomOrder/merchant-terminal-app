import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native'
const API = axios.create();

API.defaults.baseURL = 'http://13.250.39.193/api'
API.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = "Bearer " + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);

export default {

  loginUser: async credentials => {
    return API.post(
      "/user/auth/mobile/login",
      credentials
    );
  },

  viewBranchOrdersTransaction: async (branchID, transactionStatus) => {
    return API.get(`/transaction/merchant/branch/order?branchID=${branchID}&status=${transactionStatus}`);
  },

  viewBranchOrdersTransactionHistoy: async (branchID) => {
    return API.get(`/transaction/merchant/branch/history?branchID=${branchID}`);
  },

  viewBranchOrdersTransactionAccepted: async (branchID) => {
    return API.get(`/transaction/merchant/branch/accepted?branchID=${branchID}`);
  },

  viewBranchOrdersTransactionCancelled: async (branchID) => {
    return API.get(`/transaction/merchant/branch/cancelled?branchID=${branchID}`);
  },

  acceptTransaction: async (branchID, transactionID) => {
    return API.post(`/transaction/merchant/branch/status?branchID${branchID}&transactionID=${transactionID}`, { status: 1 });
  },

  updateBranchBalance: async (branchID, transactionID) => {
    return API.post(`/transaction/merchant/branch/balance?branchID${branchID}&transactionID=${transactionID}`);
  },

  cancelTransaction: async (branchID, transactionID) => {
    try {
      console.log("Hello")
      return API.post(`/transaction/merchant/branch/status?branchID${branchID}&transactionID=${transactionID}`, { status: 2 });

    } catch (e) {
      console.log("Hello1")
      console.log(e.message)
    }
  },

  viewMerchant: async => {
    return API.get('/merchant/single')
  },

  getMerchantBranches: async pageNo => {
    return API.get(`/merchant/branches?page=${pageNo}`);
  },

  viewSingleBranch: async branchKey => {
    return API.get(`/merchant/branches/single?branch_key=${branchKey}`);
  },

  viewBranchCategoryAndItems: async branchKey => {
    return API.get(`merchant/branch/view/mobile/categoryAndItem?branch_key=${branchKey}`);
  },
};  