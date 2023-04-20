import {
	IonContent,
	IonLoading,
	IonButton,
	IonGrid,
	IonRow,
	IonCol,
	IonCard,
	IonCardContent,
	IonText
} from '@ionic/react';
import React, { useState, createRef } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { http } from 'gra-react-utils';

interface ResetProps extends RouteComponentProps<{ id: string }> { }

const btn: any = createRef();

const Create: React.FC<ResetProps> = ({ }) => {

	const [o, setO] = useState({
		ndoc: '',
		getDatosPrincipales: { nombrecompleto: '' },
		getDatosper: { antecedente: '' },
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

	http.loadingMask = function (v: any) { setShowLoading(v) };

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

	const getDatosPrincipales = (valor: any) => {
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

	const getDatosper = (valor1: any) => {
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
								<input value={o.ndoc} onChange={(e) => set('ndoc', e)}
									onKeyPress={(event) => { if (event.key === "Enter") btn.current.click(); }}
									style={{ textAlign: 'center' }} />
							</IonCol>
							<IonCol>
								<div className="center-movil" style={{ marginTop: 10 }}>
									<IonButton onClick={getDatos} ref={btn}>Consultar</IonButton>
								</div>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonCardContent>
			</IonCard>

			{o.getDatos != "" ? <div>

				{o.getDatosPrincipales.nombrecompleto ? <div>
					{[o.getDatosPrincipales].map((item: any) =>
						<>
							<IonCard style={{ background: '#e5ffe8' }}>
								<IonCardContent>
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
									</IonGrid>
								</IonCardContent>
							</IonCard>
						</>
					)}
				</div> : <div></div>}
				{o.getDatosper.antecedente ? <div>
					{[o.getDatosper].map((item: any) =>
						<IonCard color='danger'>
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
													<input readOnly={true} value={item.descripcionMensaje} />
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
