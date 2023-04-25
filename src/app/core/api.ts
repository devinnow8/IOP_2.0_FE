export const API = {
  invoice: {
    list: '/invoice/list',
    getById: (id: number) => `/invoice/${id}`,
    update: (id: number) => `/invoice/${id}`,
    save: '/invoice/save',
    saveAndPay: '/invoice/save/create-order'
  },

  user: {
    signIn: '/user/sign-in',
    signUp: '/user/sign-up',
    resetPassword: (id: number) => `/user/${id}/reset-password`
  }
}