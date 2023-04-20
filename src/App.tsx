import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Menu from './components/Menu';
import Page from './pages/Page';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
//@ts-ignore
import { http, useToken, OAuth } from 'gra-react-utils';

setupIonicReact();
/*
 <Route path="/" exact={true}>
              <Redirect to="/page/Inbox" />
            </Route>
*/
const App: React.FC = () => {

	const { token, setToken, logOut } = useToken();

	const dispatch = useDispatch();

	const url = useSelector((state:any) => state.url);

	http.onError = (request:any) => {
		dispatch({ type: 'error', msg: ('<b>' + request.url + '</b><br/>' + request.error + '->' + request.message) });
	};




	if (!token) {
		return <><OAuth oauth_url={import.meta.env.VITE_APP_OAUTH_URL} 
			client_id={import.meta.env.VITE_APP_OAUTH_CLIENT_ID}
			setToken={setToken} url={url} redirect={(url:any)=>{
		  dispatch({ type: 'appUrlOpen', url: url });
		}}/></>
	}


	return (
		<IonApp>
			<IonReactRouter basename={'/'}>
				<IonSplitPane style={{'--side-width':200}} contentId="main">
					<Menu />
					<IonRouterOutlet id="main">
						<Route path={import.meta.env.VITE_BASE}
							render={(props) => {
								return <Page {...props}/>;
							}}
						>
						</Route>
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;