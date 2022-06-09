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
	const history = useHistory();
	const [users, setUsers] = useState<Array<any>>([]);
	const [o, setO] = useState({
		ndoc: '',
		getDatosPrincipales: {},
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
	http.loadingMask = function (v) { setShowLoading(v) };

	const getDatosPrincipales = () => {
		http.post('/api/pj/verificarAntecedentesPenales', { xDni: o.ndoc }, {})
			.then((data: any) => {
				data = data['ns2:verificarAntecedentesPenalesResponse'];
				//data.data = [];

				set('getDatosPrincipales', data);
				//getDatosper(data.codigoPersona);
				console.log(data);
			}).catch((error: any) => {
				console.error(error.message);
			});
	};

	//const getDatosper = (valor1) => {
	//	http.post('/api/pnp/PnpAntPolicialconsultarAntecedenteCodPer', { codigoPersona: valor1 }, {})
	//		.then((data: any) => {
	//			data = data['S:Envelope']['S:Body']['ns0:consultarAntecedenteCodPerResponse'].RespuestaAntecedente;
	//			data.data = [];
	//			set('getDatosper', data);
	//		}).catch((error: any) => {
	//			console.error(error.message);
	//		});

	//};
	return (
		<IonContent className="ion-padding">
			<IonCard>
				<IonCardContent>
					<IonText style={{ textAlign: 'center', padding: '0px 10px 20px', color: '#1062ac' }}>
						<h1><u>ANTECEDENTES JUDICIALES</u></h1>
					</IonText>
					<IonGrid>
						<IonRow>
							<IonCol >
								<label>N° Documento</label>
								<input value={o.ndoc} onChange={(e) => set('ndoc', e)} style={{ textAlign: 'center' }} />
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

			{o.getDatosPrincipales.xCodigoRespuesta ? <div>
				{[o.getDatosPrincipales].map((item) =>
					<>
						{o.getDatosPrincipales.xCodigoRespuesta=="0000" ? <div>
							<IonCard color='danger'>
								<IonCardContent>
									<IonText style={{ color: '#fff' }}>
										<h1>{item.xMensajeRespuesta}</h1>
									</IonText>
								</IonCardContent>
							</IonCard>
						</div> : <div>
							
						<IonCard color='danger'>
								<IonCardContent>
									<IonText style={{ color: '#fff' }}>
										<h1>{item.xMensajeRespuesta}</h1>
									</IonText>
								</IonCardContent>
							</IonCard>
							
							</div>}
					</>
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
