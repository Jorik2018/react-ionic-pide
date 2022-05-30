import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Login from './pages/Login';
import { accountService } from './services/accountService.js';
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
import { http } from './utils/fetch-wrapper.js';

setupIonicReact();
/*
 <Route path="/" exact={true}>
              <Redirect to="/page/Inbox" />
            </Route>
*/
const App: React.FC = () => {
	let menu:any;
	var url = new URL(window.location);
	var location = window.location;
	var token = url.searchParams.get("token");
	if(token){
		//localStorage.setItem('token',token);
		accountService.setUserValue({token:token});
		window.location=location.protocol + '//' + location.host + location.pathname
	}
	if(accountService.getUserValue())
		menu=<Menu />;
	else{
		window.location.href = "http://web.regionancash.gob.pe/auth?destiny="+window.location.href;
	}
	return (
		<IonApp>
			<IonReactRouter basename={'/'}>
				<IonSplitPane style={{'--side-width':200}} contentId="main">
					{menu}
					<IonRouterOutlet id="main">
						<Route path="/admin/pide" 
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
