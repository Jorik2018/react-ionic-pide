import { IonButtons,IonSplitPane, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar ,IonRouterOutlet} from '@ionic/react';
import { useParams,Route } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import VaccineSearch from './vaccine/Search';
import { RouteComponentProps,Redirect } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { http } from '../utils/fetch-wrapper.js';
import logo from '../assets/red-salud-huaylas-sur.jpeg'; // with import

const Page: React.FC<RouteComponentProps> = ({ match }) => {
	const { name } = useParams<{ name: string; }>();
	return (
		<IonContent className="ion-padding">
			
		<label>Antecedentes policiales</label>
		</IonContent>
	);
};

export default Page;
