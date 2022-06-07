import { 
	IonButtons,
	IonContent, 
	IonHeader, 
	IonMenuButton, 
	IonPage, 
	IonTitle, 
	IonToolbar,
	IonRouterOutlet
} from '@ionic/react';
import { useParams,Route } from 'react-router';
import RENIEC from '../pages/RENIEC';
import SUNAT from './SUNAT';
import AntecendentesJudiciales from '../pages/AntecendentesJudiciales';
import AntecendentesPenales from '../pages/AntecendentesPenales';
import AntecendentesPoliciales from '../pages/AntecendentesPoliciales';
import servir from '../pages/servir';
import './Page.css';
import VaccineSearch from './vaccine/Search';
import { RouteComponentProps,Redirect } from "react-router-dom";
import logo from '../assets/logancash.png';

const Page: React.FC<RouteComponentProps> = ({ match }) => {
				/*	<Route exact path={match.url} component={VaccineSearch} /><Route render={() => <Redirect to={match.url} />} />*/
	const { name } = useParams<{ name: string; }>();
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle><img height="40px" src={logo}/></IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonRouterOutlet>
					<Route path={`${match.url}/reniec`} component={RENIEC} />
					<Route path={`${match.url}/sunat`} component={SUNAT} />
					<Route path={`${match.url}/antecendentes-policiales`} component={AntecendentesPoliciales} />
					<Route path={`${match.url}/antecendentes-penales`} component={AntecendentesPenales} />
					<Route path={`${match.url}/antecendentes-judiciales`} component={AntecendentesJudiciales} />
					<Route path={`${match.url}/servir`} component={servir} />
				</IonRouterOutlet>
			</IonContent>
		</IonPage>
	);
};
export default Page;