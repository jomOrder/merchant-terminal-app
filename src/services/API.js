import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const API = axios.create();

API.defaults.baseURL = 'https://api-core.jomorder.com.my/api'
API.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = "Bearer " + token
    }
    return config
  },
  error => {
    console.log(error)
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
    return API.get(`/transaction/merchant/branch/history?branchID=${branchID}&page=${0}`);
  },

  viewBranchOrdersTransactionAccepted: async (branchID, page = 0) => {
    return API.get(`/transaction/merchant/branch/accepted?branchID=${branchID}&page=${page}`);
  },

  viewBranchOrdersTransactionCancelled: async (branchID, page = 0) => {
    return API.get(`/transaction/merchant/branch/cancelled?branchID=${branchID}&page=${page}`);
  },

  acceptTransaction: async (branch_key, transactionID) => {
    try {
      return API.post(`/transaction/merchant/branch/status?status=1&branchID=${branch_key}&transactionID=${transactionID}`);
    } catch (e) {
      console.log(e.message)
    }
  },

  cancelTransaction: async (branch_key, transactionID) => {
    try {
      return API.post(`/transaction/merchant/branch/status?status=2&branchID=${branch_key}&transactionID=${transactionID}`);

    } catch (e) {
      console.log(e.message)
    }
  },

  viewMerchant: async branchID => {
    return API.get(`/merchant/single?branchID=${branchID}`)
  },

  getMerchantBranches: async pageNo => {
    return API.get(`/merchant/branches?page=${pageNo}`);
  },

  viewSingleBranch: async branchKey => {
    return API.get(`/merchant/branches/single?branchKey=${branchKey}`);
  },

  /**
   * 
   */
  viewBranchCategoryAndItems: async branchKey => {
    return API.get(`/merchant/branch/view/mobile/categoryAndItem?branchKey=${branchKey}`);
  },

  updateMerchantStatus: async (branchKey, status) => {
    return API.post(`/merchant/branch/update/status?branchID=${branchKey}&status=${status}`);
  },
};  