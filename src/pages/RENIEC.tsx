import {
	IonContent,
	IonLoading,
	IonButton,
	IonGrid,
	IonRow,
	IonCol,
	IonCard,
	IonCardContent,
	IonText,
} from '@ionic/react';
import React, { useState, createRef } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { http } from '../utils/fetch-wrapper.js';
//import DataTable from "react-data-table-component";
//import DataTableExtensions from "react-data-table-component-extensions";
//https://www.smashingmagazine.com/2020/08/forms-validation-ionic-react/

interface ResetProps extends RouteComponentProps<{ id: string }> { }

const btn = createRef();

const Create: React.FC<ResetProps> = () => {

	const [o, setO] = useState({
		code: '',
		coResultado: '',
		mail: '',
		description: '',
		datosPersona: {},
		deResultado: '',
		name: '',
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

	const getDatosMSG = () => {
		http.post('/api/reniec/', { dni: o.code }, {})
			.then((data: any) => {
				setO({ ...o, ...data });
			}).catch((error: any) => {
				console.error(error.message);
			});
	};

	return (
		<IonContent className="ion-padding">
			<IonCard>
				<IonCardContent>
					<IonText style={{ textAlign: 'center', padding: '0px 10px 20px', color: '#1062ac' }}>
						<h1><u>CONSULTA RENIEC</u></h1>
					</IonText>
					<IonRow>
						<IonCol>
							<label>Ingrese Numero</label>
							<input value={o.code}
								onKeyPress={(event) => { if (event.key === "Enter") btn.current.click(); }}
								onChange={(e) => set('code', e)} style={{ textAlign: 'center' }} />
						</IonCol>
						<IonCol>
							<div className="center-movil" style={{ marginTop: 10 }}>
								<IonButton onClick={getDatosMSG} ref={btn}>Buscar</IonButton>
							</div>
						</IonCol>
					</IonRow>
				</IonCardContent>
			</IonCard>
			{
				o.coResultado == "0000" ? <div>
					{[o.datosPersona].map((item, i) =>
						<IonCard key={i}>
							<IonCardContent style={{ background: '#e5ffe8' }}>
								<IonGrid>
									<IonRow>
										<IonCol size='4'>
											<img width={'100%'} src={'data:image/png;base64, ' + item.foto} />
										</IonCol>
										<IonCol size='1'></IonCol>
										<IonCol size='7' >
											<IonText color="danger">
												<h1><u>DATOS PERSONALES</u><br></br><br></br></h1>
											</IonText>
											<label>Ap. Paterno</label>
											<p>{item.apPrimer}</p>
											<label>Ap. Materno</label>
											<p>{item.apSegundo}</p>
											<label>Nombres</label>
											<p>{item.prenombres}</p>

											<label>Estado Civil</label>
											<p>{item.estadoCivil}</p>
										</IonCol>
										<IonCol>
											<label>Restriccion</label>
											<p>{item.restriccion}</p>
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol>
											<label>Dirección</label>
											<p>{item.direccion}</p>
										</IonCol>
									</IonRow>
									<IonRow>
										<IonCol>
											<label>Ubigeo</label>
											<p>{item.ubigeo}</p>
										</IonCol>
									</IonRow>
								</IonGrid>
							</IonCardContent>
						</IonCard>
					)}
				</div> : (o.coResultado == "" ? <div></div> : <div>
					<IonCard color="danger">
						<IonCardContent>
							<IonText >
								<h1>{o.deResultado}</h1>
							</IonText>
						</IonCardContent>
					</IonCard>
				</div>)
			}
			<IonLoading
				isOpen={showLoading}
				message={'Please wait...'}
			/>
		</IonContent>
	);
};

export default Create;