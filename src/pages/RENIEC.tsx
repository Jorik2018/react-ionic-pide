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
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCardContent,
	IonListHeader
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory, RouteComponentProps } from "react-router-dom";
import { http } from '../utils/fetch-wrapper.js';
//import DataTable from "react-data-table-component";
//import DataTableExtensions from "react-data-table-component-extensions";
//https://www.smashingmagazine.com/2020/08/forms-validation-ionic-react/

interface ResetProps extends RouteComponentProps<{ id: string }> { }

const Create: React.FC<ResetProps> = ({ match }) => {
	const history = useHistory();
	const [users, setUsers] = useState<Array<any>>([]);

	const [o, setO] = useState({
		code: '',
		mail: '',
		description: '',
		getDatosPrincipales: {},
		getDatosMSG: {},
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

	const getDatosPrincipales = (valoe) => {
		http.post('/api/reniec/', { dni: valoe }, {})
			.then((data: any) => {
				data = data.return.datosPersona;
				set('getDatosPrincipales', data);
				console.log(data);
			}).catch((error: any) => {
				console.error(error.message);
			});
	};
	/////////////////////////////////////////
	const getDatosMSG = () => {
		http.post('/api/reniec/', { dni: o.code }, {})
			.then((data: any) => {
				data = data.return.coResultado;
				data == "0000" ?
					getDatosPrincipales(o.code)
					: data = ""
				set('getDatosMSG', data);
			}).catch((error: any) => {
				console.error(error.message);
			});
	};
	return (
		<IonContent className="ion-padding">

			<IonCard>
<IonCardContent>
				<ion-text style={{ textAlign: 'center', padding: '0px 10px 20px', color: '#1062ac' }}>
					<h1><u>CONSULTA RENIEC</u></h1>
				</ion-text>
					<IonRow>
						<IonCol>
							<label>Ingrese Numero</label>
							<input value={o.code} onChange={(e) => set('code', e)} style={{ textAlign: 'center' }} />
						</IonCol>
						<IonCol>
							<div className="center-movil" style={{ marginTop: 10 }}>
								<IonButton onClick={getDatosMSG}>Buscar</IonButton>
							</div>
						</IonCol>
					</IonRow>

				</IonCardContent>
			</IonCard>
			{
				o.getDatosMSG != "" ? <div>
					{o.getDatosPrincipales.apPrimer ? <div>
						{[o.getDatosPrincipales].map((item) =>
							<IonCard >
								<IonCardContent style={{background: 'floralwhite'}}>
									<IonGrid>
										<IonRow>
											<IonCol size='4'>
												<img width={'100%'} src={'data:image/png;base64, ' + item.foto} />
											</IonCol>
											<IonCol size='1'>
											</IonCol>
											<IonCol size='7' >
												
												<ion-text color="danger">
													<h1><u>DATOS PERSONALES</u><br></br><br></br></h1>
												</ion-text>

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
					</div> : <div></div>}
				</div> : <div>
					<IonCard>
						<IonCardContent>
							<ion-text color="danger">
								<h1>NUMERO INCORRECTO, VERIFIQUE EL NUMERO DE DNI..!!</h1>
							</ion-text>
						</IonCardContent>
					</IonCard>
				</div>
			}
			<IonLoading
				isOpen={showLoading}
				message={'Please wait...'}
			/>
		</IonContent>
	);
};

export default Create;
