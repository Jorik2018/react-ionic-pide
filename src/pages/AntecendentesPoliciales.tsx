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
		getDatos: {},
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

	const getDatos = () => {
		http.post('/api/pnp/PnpAntPolicialconsultarPersonaNroDoc', { nroDoc: o.ndoc }, {})
			.then((data: any) => {
				data = data['RespuestaPersona'];
				console.log(data);
				data.codigoMensaje == "00" ?
					getDatosPrincipales(data.nroDocumento)
					: data.result = "";
				data = data.result;
				set('getDatos', data);
				console.log(data);
			}).catch((error: any) => {
				console.error(error.message);
			});
	};


	const getDatosPrincipales = (valor) => {
		http.post('/api/pnp/PnpAntPolicialconsultarPersonaNroDoc', { nroDoc: valor }, {})
			.then((data: any) => {
				data = data['RespuestaPersona'];
				data.data = [];
				set('getDatosPrincipales', data);
				getDatosper(data.codigoPersona);
				//console.log(data);
			}).catch((error: any) => {
				console.error(error.message);
			});
	};

	const getDatosper = (valor1) => {
		http.post('/api/pnp/PnpAntPolicialconsultarAntecedenteCodPer', { codigoPersona: valor1 }, {})
			.then((data: any) => {
				data = data['S:Envelope']['S:Body']['ns0:consultarAntecedenteCodPerResponse'].RespuestaAntecedente;
				set('getDatosper', data);
				console.log(data);
			}).catch((error: any) => {
				console.error(error.message);
			});

	}
	return (
		<IonContent className="ion-padding">
			<IonCard>
				<IonCardContent>
					<IonText style={{ textAlign: 'center', padding: '0px 10px 20px', color: '#1062ac' }}>
						<h1><u>CONSULTAS POLICIALES</u></h1>
					</IonText>
					<IonGrid>
						<IonRow>
							<IonCol >
								<label>N° Documento</label>
								<input value={o.ndoc} onChange={(e) => set('ndoc', e)} style={{ textAlign: 'center' }} />
							</IonCol>
							<IonCol>
								<div className="center-movil" style={{ marginTop: 10 }}>
									<IonButton onClick={getDatos}>Consultar</IonButton>
								</div>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonCardContent>
			</IonCard>

			{o.getDatos != "" ? <div>

				{o.getDatosPrincipales.nombrecompleto ? <div>
					{[o.getDatosPrincipales].map((item) =>
						<>
							<IonCard style={{ background: '#e5ffe8' }}>
								<IonCardContent>
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




									</IonGrid>
								</IonCardContent>
							</IonCard>
						</>
					)}
				</div> : <div></div>}
				{o.getDatosper.antecedente ? <div>
					{[o.getDatosper].map((item) =>
						<IonCard  color='danger'>
							<IonCardContent>
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
							</IonCardContent>
						</IonCard>
					)}
				</div> : <div></div>}
			</div> : <div>
				<IonCard color='success'>
					<IonCardContent>
						<IonText style={{ color: '#fff' }}>
							<h1>NO SE ENCONTRO REGISTRO..!!</h1>
						</IonText>
					</IonCardContent>
				</IonCard>
			</div>}
			<IonLoading
				isOpen={showLoading}
				message={'Please wait...'}
			/>
		</IonContent>
	);
};

export default Create;
