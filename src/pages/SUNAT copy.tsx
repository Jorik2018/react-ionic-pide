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
//import DataTable from "react-data-table-component";
//import DataTableExtensions from "react-data-table-component-extensions";
//https://www.smashingmagazine.com/2020/08/forms-validation-ionic-react/

interface ResetProps extends RouteComponentProps<{ id: string }> { }

const Create: React.FC<ResetProps> = ({ match }) => {
	const history = useHistory();
	const [users, setUsers] = useState<Array<any>>([]);
	const [o, setO] = useState({
		code: '10445645911',
		mail: '',
		description: '',
		getDatosPrincipales: {},
		getDomicilioLegal: {},
		getEstablecimientosAnexos: {},
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

	const columns = [
		{
			name: 'Fecha',
			cell: (row) => row.fechaVacunacion,
			width: 100,
		},
		{
			name: 'Fabricante',
			selector: (row) => row.fabricanteAbrev,
			wrap: true,
			width: 200,
		},
		{
			name: 'Diagnostico',
			wrap: true,
			selector: (row) => row.vacuna,
			width: 200,
		},
		{
			name: 'Dosis',
			wrap: true,
			cell: (row) => row.dosisAplicada,
			width: 100,
		},
		{
			name: 'Establecimiento',
			wrap: true,
			cell: (row) => row.establecimiento,
			width: 300,
		},
		{
			name: 'Grupo',
			cell: (row) => row.grupo,
			wrap: true,
			width: 100,
		}
	];

	const buscaRazonSocial = () => {
		console.log(o);
		http.post('/api/sunat/buscaRazonSocial', { numruc: o.code }, {})
			.then((data: any) => {
				console.log(data);
				//data.code = o.code;
				//console.log(o.code);
				//setO(data);

				//set('patient',data[0].paciente);
			})
			.catch((error: any) => {
				console.error(error.message);
			});
	};

	const getDatosPrincipales = () => {
		http.post('/api/sunat/getDatosPrincipales', { numruc: o.code }, {})
			.then((data: any) => {
				data = data['soapenv:Envelope']['soapenv:Body'].multiRef;
				data.code = o.code;
				data.data = [];
				set('getDatosPrincipales', data);
				console.log(data);
			}).catch((error: any) => {
				console.error(error.message);
			});
	};

	const getDomicilioLegal = () => {
		http.post('/api/sunat/getDomicilioLegal', { numruc: o.code }, {})
			.then((data: any) => {
				data = data['soapenv:Envelope']['soapenv:Body']['ns1:getDomicilioLegalResponse'];
				//console.log(data);
				set('getDomicilioLegal', data);
				//console.log(data);
			}).catch((error: any) => {
				console.error(error.message);
			});
	};


	const getEstablecimientosAnexos = () => {
		http.post('/api/sunat/getEstablecimientosAnexos', { numruc: o.code }, {})
			.then((data: any) => {
				data = data['soapenv:Envelope']['soapenv:Body']['ns1:getEstablecimientosAnexosResponse'];
				console.log(data);
				//data.code = o.code;
				//data.data = [];
				set('getEstablecimientosAnexos', data);
				//console.log(data);
			}).catch((error: any) => {
				console.error(error.message);
			});
	};

	return (
		<IonContent className="ion-padding">
			<label>Consulta RUC</label>
			<IonGrid>
				<IonRow>
					<IonCol>
						<label>RUC</label>
						<input value={o.code} onChange={(e) => set('code', e)} style={{ textAlign: 'center' }} />
					</IonCol>
					<IonCol>
						<div className="center-movil" style={{ marginTop: 10 }}>
							<IonButton onClick={buscaRazonSocial}>Razon Social</IonButton>
							<IonButton onClick={getDatosPrincipales}>Datos Principales</IonButton>
							<IonButton onClick={getDomicilioLegal}>Domicilio legal</IonButton>
							<IonButton onClick={getEstablecimientosAnexos}>Establecimientos Anexos</IonButton>
						</div>
					</IonCol>
				</IonRow>
			</IonGrid>
			{o.ddp_nombre ? <div>
				<IonGrid>
					<IonRow>
						<IonCol>
							<img src={'data:image/png;base64, ' + o.foto} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Ap. Paterno</label>
							<input readOnly="readonly" value={o.apPrimer} />
						</IonCol>
						<IonCol>
							<label>Ap. Materno</label>
							<input readOnly="readonly" value={o.apSegundo} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Nombres</label>
							<input readOnly="readonly" value={o.prenombres} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Estado Civil</label>
							<input readOnly="readonly" value={o.estadoCivil} />
						</IonCol>
						<IonCol>
							<label>Restriccion</label>
							<input readOnly="readonly" value={o.restriccion} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Dirección</label>
							<input readOnly="readonly" value={o.direccion} />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Ubigeo</label>
							<input readOnly="readonly" value={o.ubigeo} />
						</IonCol>
					</IonRow>


				</IonGrid>
			</div> : <div></div>
			}

			{o.getDatosPrincipales.ddp_nombre ? <div>
				{[o.getDatosPrincipales].map((item) =>
					<>
						<IonGrid>
							<IonRow>
								<IonCol>
									<label>Estado:</label>
									<input readOnly="readonly" value={item.desc_estado} />
								</IonCol>
								<IonCol>
									<label>Condición:</label>
									<input readOnly="readonly" value={item.desc_flag22} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Razon Social:</label>
									<input readOnly="readonly" value={item.desc_tipzon} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Tipo Empresa:</label>
									<input readOnly="readonly" value={item.desc_tpoemp} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Apellidos y Nombres:</label>
									<input readOnly="readonly" value={item.ddp_nombre} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Dirección</label>
									<input readOnly="readonly" value={item.desc_tipvia + '/ ' + item.ddp_nomvia + '/ ' + item.ddp_numer1} />
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<label>Referencia</label>
									<input readOnly="readonly" value={item.ddp_refer1} />
								</IonCol>

							</IonRow>
							<IonRow>
								<IonCol>
									<label>Descripción de actividad económica sunat:</label>
									<input readOnly="readonly" value={item.desc_ciiu} />
								</IonCol>

							</IonRow>
							<IonRow>
								<IonCol>
									<label>Ubigeo (Departamento/Provincia/Distrito)</label>
									<input readOnly="readonly" value={item.desc_dep + '/ ' + item.desc_prov + '/ ' + item.desc_dist} />
								</IonCol>
							</IonRow>
						</IonGrid></>
				)}

			</div> : <div></div>}


			{o.getDomicilioLegal.getDomicilioLegalReturn ? <div>
				{[o.getDomicilioLegal].map((itemn) =>
					<>
						<IonGrid>
							<IonRow>
								<label>Domicilio Legal:</label>
								<label>{itemn.getDomicilioLegalReturn}</label>
							</IonRow>
						</IonGrid></>

				)}

			</div> : <div></div>}


			{o.getEstablecimientosAnexos.getEstablecimientosAnexosReturn ? <div>
				{[o.getEstablecimientosAnexos].map((itemns) =>
					<>
						<IonGrid>
							<IonRow>
								<label>Establecimiento Anexos:</label>
								
								<label>{itemns.getEstablecimientosAnexosReturn}</label>
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
