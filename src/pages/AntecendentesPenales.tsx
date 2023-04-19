//import { IonButtons,IonSplitPane, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar ,IonRouterOutlet} from '@ionic/react';
//import { useParams,Route } from 'react-router';
//import { IonReactRouter } from '@ionic/react-router';
//import ExploreContainer from '../components/ExploreContainer';
//import './Page.css';
//import VaccineSearch from './vaccine/Search';
//import { RouteComponentProps,Redirect } from "react-router-dom";
//import { useLocation } from 'react-router-dom';
//import { http } from '../utils/fetch-wrapper.js';
//import logo from '../assets/red-salud-huaylas-sur.jpeg'; // with import

//const Page: React.FC<RouteComponentProps> = ({ match }) => {
//	const { name } = useParams<{ name: string; }>();
//	return (
//		<IonContent className="ion-padding">
//			
//		<label>Antecedentes penales</label>
//		</IonContent>
//	);
//};

//export default Page;
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonTextarea,
	IonToolbar,
	IonItemDivider,
	IonIcon,
	IonItem,
	IonLoading,
	IonButton,
	IonInput,
	IonLabel,
	IonAvatar,
	IonList,
	IonGrid,
	IonRow,
	IonCol,
	IonCard,
	IonCardContent,
	IonText,
	IonListHeader
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory, RouteComponentProps } from "react-router-dom";
import { http } from '../utils/fetch-wrapper.js';

interface ResetProps extends RouteComponentProps<{ id: string }> { }

const Create: React.FC<ResetProps> = ({ match }) => {
	
	const [o, setO] = useState({
		ndoc: '',
		getDatosPrincipales: {nombrecompleto:''},
		getDatosper: {},
		data: [] as any[]
	});

	const set = (name: any, v: any) => {
		var vv = v && v.target ? v.target.value : v;
		setO(o => ({
			...o, [name]: vv
		}));
	};

	const [showLoading, setShowLoading] = useState();
	http.loadingMask = function (v:any) { setShowLoading(v) };

	const getDatosPrincipales = () => {
		http.post('/api/inpe/AJudiciales', { primerApellido: o.ndoc }, {})
			.then((data: any) => {
				console.log(data);
			}).catch((error: any) => {
				console.error(error.message);
			});
	};
	return (
		<IonContent className="ion-padding">
			<IonCard>
				<IonCardContent>
					<IonText style={{ textAlign: 'center', padding: '0px 10px 20px', color: '#1062ac' }}>
						<h1><u>ANTECEDENTES PENALES</u></h1>
					</IonText>
					<IonGrid>
						<IonRow>
							<IonCol >
								<label>N° Documento</label>
								<input  value={o.ndoc} onChange={(e) => set('ndoc', e)} style={{ textAlign: 'center' }} />
							</IonCol>
							<IonCol>
								<div className="center-movil" style={{ marginTop: 10 }}>
									<IonButton onClick={getDatosPrincipales}>Consultar</IonButton>
								</div>
							</IonCol>
						</IonRow>

					</IonGrid>

				</IonCardContent>
			</IonCard>

			{o.getDatosPrincipales.nombrecompleto ? <div>
				{[o.getDatosPrincipales].map((item:any) =>
					<>
						<IonGrid>
							<IonRow>
								<IonCol size='3'>
									<label>Codigo Persona: </label>
									<input readOnly={true} value={item.codigoPersona} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Nombre Completo:</label>
									<input readOnly={true} value={item.nombrecompleto} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Fch. Nacimiento:</label>
									<input readOnly={true} value={item.fechaNacimiento} />
								</IonCol>
								<IonCol>
									<label>Sexo:</label>
									<input readOnly={true} value={item.sexo} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Homonimia:</label>
									<input readOnly={true} value={item.homonimia} />
								</IonCol>
								<IonCol>
									<label>Doble Identidad:</label>
									<input readOnly={true} value={item.dobleIdentidad} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Dirección</label>
									<input readOnly={true} value={item.nombrecompleto} />
								</IonCol>
							</IonRow>




						</IonGrid></>
				)}


			</div> : <div></div>}



			<IonLoading
				isOpen={showLoading}
				message={'Please wait...'}
			/>
		</IonContent>
	);
};

export default Create;
