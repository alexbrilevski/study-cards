import { combineReducers, createStore } from 'redux';
import { testReducer } from '../../features/test/testReducer';


export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  test: testReducer,
});

export const store = createStore(rootReducer);
