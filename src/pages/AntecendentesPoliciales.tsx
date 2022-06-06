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
		http.post('/api/pnp/PnpAntPolicialconsultarPersonaNroDoc', { nroDoc: o.ndoc }, {})
			.then((data: any) => {
				data = data['RespuestaPersona'];
				data.data = [];
				set('getDatosPrincipales', data);
				getDatosper(data.codigoPersona);
			}).catch((error: any) => {
				console.error(error.message);
			});
	};

	const getDatosper = (valor1) => {
		http.post('/api/pnp/PnpAntPolicialconsultarAntecedenteCodPer', { codigoPersona: valor1 }, {})
			.then((data: any) => {
				data = data['S:Envelope']['S:Body']['ns0:consultarAntecedenteCodPerResponse'].RespuestaAntecedente;
				data.data = [];
				set('getDatosper', data);
			}).catch((error: any) => {
				console.error(error.message);
			});

	}
	return (
		<IonContent className="ion-padding">
			<label>Antecedentes Policiales:</label>
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

			{o.getDatosPrincipales.nombrecompleto ? <div>
				{[o.getDatosPrincipales].map((item) =>
					<>
						<IonGrid>
							<IonRow>
								<IonCol size='3'>
									<label>Codigo Persona: </label>
									<input readOnly="readonly" value={item.codigoPersona} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Nombre Completo:</label>
									<input readOnly="readonly" value={item.nombrecompleto} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Fch. Nacimiento:</label>
									<input readOnly="readonly" value={item.fechaNacimiento} />
								</IonCol>
								<IonCol>
									<label>Sexo:</label>
									<input readOnly="readonly" value={item.sexo} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Homonimia:</label>
									<input readOnly="readonly" value={item.homonimia} />
								</IonCol>
								<IonCol>
									<label>Doble Identidad:</label>
									<input readOnly="readonly" value={item.dobleIdentidad} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Dirección</label>
									<input readOnly="readonly" value={item.nombrecompleto} />
								</IonCol>
							</IonRow>




						</IonGrid></>
				)}


			</div> : <div></div>}

			{o.getDatosper.antecedente ? <div>
				{[o.getDatosper].map((item) =>
					<IonGrid>
						<IonRow>
							{
								item.antecedente == 0 ?
									<IonCol size='12'>
										<label>{item.descripcionMensaje}</label>
									</IonCol>
									:
									<IonCol size='12'>
										<label>Se encontro {item.antecedente} registro(s):</label>
										<input readOnly="readonly" value={item.descripcionMensaje} />
									</IonCol>
							}
						</IonRow>
					</IonGrid>
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
