export const SET_MOBILE = 'SET_MOBILE';
export const SET_USER = 'SET_USER';

export type TUserState = {
  id: number;
  mobile: string;
  firstName: string;
  lastName: string;
  email: string | null;
  nationalCode: string | null;
};

const INITIAL_STATE: TUserState = {
  id: 0,
  mobile: '',
  firstName: '',
  lastName: '',
  email: null,
  nationalCode: null,
};

export default (
  state = INITIAL_STATE,
  action: {type: string; payload: any},
): TUserState => {
  switch (action.type) {
    case SET_MOBILE:
      return {
        ...state,
        mobile: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
