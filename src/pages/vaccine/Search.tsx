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
import { http } from '../../utils/fetch-wrapper.js';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
//https://www.smashingmagazine.com/2020/08/forms-validation-ionic-react/

interface ResetProps extends RouteComponentProps<{id: string}> {}

const Create: React.FC<ResetProps> = ({ match }) => {
	const history = useHistory();
	const [users, setUsers] = useState<Array<any>>([]);
	
	const [o, setO] = useState({
		mail:'',
		description:'',
		name:'',
		data: [] as any[]
	});
	const set = (name:any,v:any) => {
		var vv=v&&v.target?v.target.value:v;
		setO(o => ({
			...o,[name]: vv
		}));
	};
	
	const [showLoading, setShowLoading] = useState();
	http.loadingMask=function(v){setShowLoading(v)};
	
	const columns = [
		{
			name: 'Fecha',
			cell: (row)=>row.fechaVacunacion,
			width: 100,
		},
		{
			name: 'Fabricante',
			selector: (row)=>row.fabricanteAbrev,
			wrap: true,
			width: 200,
		},
		{
			name: 'Diagnostico',
			wrap: true,
			selector: (row)=>row.vacuna,
			width: 200,
		},
		{
			name: 'Dosis',
			wrap: true,
			cell: (row)=>row.dosisAplicada,
			width: 100,
		},
		{
			name: 'Establecimiento',
			wrap: true,
			cell: (row)=>row.establecimiento,
			width: 300,
		},
		{
			name: 'Grupo',
			cell: (row)=>row.grupo,
			wrap: true,
			width: 100,
		}
	];
	/*
	apPrimer: "MURRIETA"
apSegundo: "SANANCIMA"
direccion: "CASERIO SANTA ELENA"
estadoCivil: "SOLTERO"
foto: "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"
prenombres: "JONAS"
restriccion: "NINGUNA"
ubigeo: "SAN MARTIN/EL DORADO/SANTA ROSA"
	*/

	const loginForm=()=>{
		console.log(o);
		http.post('/api/reniec/'
		,{dni:o.code},{})
			.then((data:any) =>{ 
				data.code=o.code;
				setO(data);
				//set('patient',data[0].paciente);
			})
			.catch((error:any) => {
				console.error(error.message);
			});
	};
	
	return (
			<IonContent className="ion-padding">
			
				<IonGrid>
					<div style={{textAlign:'center',padding:'0px 10px 20px'}}>
						<label>Consulta RENIEC</label>
					</div>
					<IonRow>
						<IonCol>
							<label>Tipo Doc.</label>
							<select>
								<option value="DNI">DNI</option>
								<option value="LM">LIBRETA MILITAR</option>
								<option value="CE">CARNET EXTRANJERIA</option>
							</select>
						</IonCol>
						<IonCol>
							<label>Ingrese Numero</label>
							<input value={o.code} onChange={(e) => set('code',e)} style={{textAlign:'center'}} />
						</IonCol>
						<IonCol>
							<div className="center-movil" style={{marginTop:10}}>
							<IonButton onClick={loginForm}>Buscar</IonButton>
							</div>
						</IonCol>
					</IonRow>
				</IonGrid>
				{o.apPrimer?<div>
				<IonGrid>
					<IonRow>
						<IonCol>
							<img src={'data:image/png;base64, '+o.foto}/>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Ap. Paterno</label>
							<input readOnly="readonly" value={o.apPrimer}/>
						</IonCol>
						<IonCol>
							<label>Ap. Materno</label>
							<input readOnly="readonly" value={o.apSegundo}/>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Nombres</label>
							<input readOnly="readonly" value={o.prenombres}/>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Estado Civil</label>
							<input readOnly="readonly" value={o.estadoCivil}/>
						</IonCol>
						<IonCol>
							<label>Restriccion</label>
							<input readOnly="readonly" value={o.restriccion}/>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Dirección</label>
							<input readOnly="readonly" value={o.direccion}/>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<label>Ubigeo</label>
							<input readOnly="readonly" value={o.ubigeo}/>
						</IonCol>
					</IonRow>
				</IonGrid>
				<hr/>
				<DataTable columns={columns} data={o.data}></DataTable>
				</div>:<div></div>
			}
			<IonLoading
				isOpen={showLoading}
				message={'Please wait...'}
				/>
			</IonContent>
	);
};

export default Create;
