import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App';
import { createStore } from 'redux'
import { Provider } from "react-redux";
//@ts-ignore
import { http } from 'gra-react-utils';

http.baseURL = import.meta.env.VITE_APP_BASE_URL;

function counterReducer(state:any = {title:'',networkStatus:{},drawer:false, url:null,load: false, snack: null, cb: null, dialog: null, result: null }, action:any) {

  switch (action.type) {
    case 'alert':
    case 'error':
    case 'confirm':
      return {...state,...{ dialog: action.msg ? action : null }}
    case 'appUrlOpen':
      return {...state,...{ url: action.url }}
    case 'networkStatus':
        return {...state,...{ networkStatus: action.status }}
    case 'snack':
      return {...state,...{ snack: action.msg ? action : null }}
    case 'load':
      return {...state,...{ load: !!action.show }}
    case 'drawer':
        return {...state,...{ drawer:'drawer' in action?!!action.drawer:!state.drawer }}
    case 'title':
        return {...state,...{ title: action.title }}
    default:
      /*if(action.fn){
        action.fn(db);
      }*/
      return state
  }
}

let store = createStore(counterReducer);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);