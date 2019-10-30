export default {
    API_ENDPOINT: process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_LOCAL_API_KEY 
      : process.env.REACT_APP_PROD_API_KEY
  }