import { combineReducers } from 'redux';
import AccountsReducer from './AccountsReducer';
import PlaylistReducer from './PlaylistReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
  AccountsReducer,
  songsReducer: PlaylistReducer,
  searchReducer: SearchReducer
});
