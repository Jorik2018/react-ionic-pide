import {
	IonContent,
	IonLoading,
	IonButton,
	IonGrid,
	IonRow,
	IonText,
	IonCol,
	IonCard,
	IonCardContent
} from '@ionic/react';
import React, { useState, createRef } from 'react';
import { http } from '../utils/fetch-wrapper.js';
import { RouteComponentProps } from 'react-router-dom';

interface ResetProps extends RouteComponentProps<{ id: string }> { }

const btn: any = createRef();

const Create: React.FC<ResetProps> = ({ }) => {

	const [o, setO] = useState({
		code: '',
		getDatosPrincipales: { ddp_nombre: '' },
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

	const getDatosPrincipales = () => {
		http.post('/api/sunat/getDatosPrincipales', { numruc: o.code }, {})
			.then((data: any) => {
				data = data['soapenv:Envelope']['soapenv:Body'].multiRef;
				set('getDatosPrincipales', data);
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
						<h1><u>CONSULTA RUC:</u></h1>
					</IonText>
					<IonRow style={{ padding: '0px 10px 20px' }}>
						<IonCol>
							<input placeholder='INGRESE RUC' value={o.code}
								onKeyPress={(event) => { if (event.key === "Enter") btn.current.click(); }}
								onChange={(e) => set('code', e)} />
						</IonCol>
						<IonCol>
							<div className="center-movil" >
								<IonButton onClick={getDatosPrincipales} ref={btn}>CONSULTAR</IonButton>
							</div>
						</IonCol>
					</IonRow>
				</IonCardContent>
			</IonCard>
			{o.getDatosPrincipales.ddp_nombre ? <div>
				{[o.getDatosPrincipales].map((item: any) =>
					<>
						<IonCard style={{ background: '#e5ffe8' }}>
							<IonCardContent>
								<IonGrid>
									<IonRow>
										<IonCol>
											<label>Estado:</label>
											<input readOnly={true} value={item.desc_estado} />
										</IonCol>
										<IonCol>
											<label>Condición:</label>
											<input readOnly={true} value={item.desc_flag22} />
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol>
											<label>Razon Social:</label>
											<input readOnly={true} value={item.desc_tipzon} />
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol>
											<label>Tipo Empresa:</label>
											<input readOnly={true} value={item.desc_tpoemp} />
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol>
											<label>Apellidos y Nombres:</label>
											<input readOnly={true} value={item.ddp_nombre} />
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol>
											<label>Dirección</label>
											<input readOnly={true} value={item.desc_tipvia + '/ ' + item.ddp_nomvia + '/ ' + item.ddp_numer1} />
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol>
											<label>Referencia</label>
											<input readOnly={true} value={item.ddp_refer1 + ' / ' + item.ddp_nomzon} />
										</IonCol>

									</IonRow>
									<IonRow>
										<IonCol>
											<label>Descripción de actividad económica sunat:</label>
											<input readOnly={true} value={item.desc_ciiu} />
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol>
											<label>Ubigeo (Departamento/Provincia/Distrito)</label>
											<input readOnly={true} value={item.desc_dep + '/ ' + item.desc_prov + '/ ' + item.desc_dist} />
										</IonCol>
									</IonRow>
								</IonGrid>
							</IonCardContent>
						</IonCard>
					</>
				)}
			</div> : <div> {o.getDatosPrincipales.ddp_nombre == "" ?
				<IonCard color="danger">
					<IonCardContent>
						<IonText >
							<h1>INCORRECTO, VERIFIQUE EL NUMERO RUC..!!</h1>
						</IonText>
					</IonCardContent>
				</IonCard>
				: <div></div>}</div>}
			<IonLoading
				isOpen={showLoading}
				message={'Please wait...'}
			/>
		</IonContent>
	);
};

export default Create;
