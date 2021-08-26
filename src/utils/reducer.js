export const reducer = (state, action) => {
    switch (action.type) {
      case 'fetchDataStart':
        return {
          ...state,
          loading: true,
          data: null,
          error: null,
          na:false
        }
      case 'fetchDataSuccess':
        return {
          ...state,
          loading: false,
          data: action.data,
          error: null,
          na:false
        }
      case 'fetchDataFail':
        return {
          ...state,
          loading: false,
          data: null,
          error: 'whoops =/',
          na:false
        }
      case 'specsNotSet':
          return{
              ...state,
              loading:false,
              data:null,
              error:null,
              na:true
          }
      default: return state
     }
  }