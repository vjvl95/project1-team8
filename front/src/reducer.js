export function loginReducer(userState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('%c로그인!', 'color: #d93d1a;');
      return {
        ...userState,
        user: action.payload,
      };
    case 'LOGOUT':
      console.log('%c로그아웃!', 'color: #d93d1a;');
      return {
        ...userState,
        user: null,
      };
    default:
      return userState;
  }
}

export function searchReducer(searchState, action) {
  switch (action.type) {
    case 'DEFAULT':
      return {
        category: 'all',
        search: '',
      };
    case 'SEARCH':
      return {
        category: action.payload.categoryValue,
        search: action.payload.searchValue,
      };
    default:
      return searchState;
  }
}
