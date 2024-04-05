import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import { useState } from 'react';

import '@wordpress/dataviews/build-style/style.css';
import '@wordpress/components/build-style/style.css';

/*
 * Estos datos de proba foron xerados usando ChatGPT 3.5 en Abril de 2024.
 */
const MUNICIPIOS = [
	{
		"id": 15030,
		"nome": "A Coruña",
		"provincia": "A Coruña",
		"habitantes": 215227,
		"km_cadrados": 37.83
	},
	{
		"id": 15056,
		"nome": "Oleiros",
		"provincia": "A Coruña",
		"habitantes": 34979,
		"km_cadrados": 48.1
	},
	{
		"id": 15057,
		"nome": "Carballo",
		"provincia": "A Coruña",
		"habitantes": 31252,
		"km_cadrados": 208.8
	},
	{
		"id": 15078,
		"nome": "Santiago de Compostela",
		"provincia": "A Coruña",
		"habitantes": 95092,
		"km_cadrados": 220.0
	},
	{
		"id": 15054,
		"nome": "Ferrol",
		"provincia": "A Coruña",
		"habitantes": 66060,
		"km_cadrados": 82.0
	},
	{
		"id": 15055,
		"nome": "Narón",
		"provincia": "A Coruña",
		"habitantes": 39624,
		"km_cadrados": 73.3
	},
	{
		"id": 15020,
		"nome": "Culleredo",
		"provincia": "A Coruña",
		"habitantes": 30310,
		"km_cadrados": 37.4
	},
	{
		"id": 15025,
		"nome": "Fene",
		"provincia": "A Coruña",
		"habitantes": 15412,
		"km_cadrados": 48.1
	},
	{
		"id": 15015,
		"nome": "Arteixo",
		"provincia": "A Coruña",
		"habitantes": 31786,
		"km_cadrados": 93.7
	},
	{
		"id": 15032,
		"nome": "Abegondo",
		"provincia": "A Coruña",
		"habitantes": 7166,
		"km_cadrados": 77.7
	},
	{
		"id": 36038,
		"nome": "Pontevedra",
		"provincia": "Pontevedra",
		"habitantes": 82872,
		"km_cadrados": 118.3
	},
	{
		"id": 36057,
		"nome": "Vigo",
		"provincia": "Pontevedra",
		"habitantes": 294997,
		"km_cadrados": 109.06
	},
	{
		"id": 36900,
		"nome": "Marín",
		"provincia": "Pontevedra",
		"habitantes": 25025,
		"km_cadrados": 23.2
	},
	{
		"id": 36039,
		"nome": "Ponteareas",
		"provincia": "Pontevedra",
		"habitantes": 22978,
		"km_cadrados": 67.5
	},
	{
		"id": 36960,
		"nome": "Sanxenxo",
		"provincia": "Pontevedra",
		"habitantes": 17541,
		"km_cadrados": 44.8
	},
	{
		"id": 36020,
		"nome": "Vilagarcía de Arousa",
		"provincia": "Pontevedra",
		"habitantes": 37247,
		"km_cadrados": 37.2
	},
	{
		"id": 36055,
		"nome": "Redondela",
		"provincia": "Pontevedra",
		"habitantes": 29889,
		"km_cadrados": 52.9
	},
	{
		"id": 36017,
		"nome": "Moaña",
		"provincia": "Pontevedra",
		"habitantes": 17109,
		"km_cadrados": 21.3
	},
	{
		"id": 36043,
		"nome": "A Estrada",
		"provincia": "Pontevedra",
		"habitantes": 21168,
		"km_cadrados": 175.1
	},
	{
		"id": 36019,
		"nome": "Cangas",
		"provincia": "Pontevedra",
		"habitantes": 25708,
		"km_cadrados": 38.1
	},
	{
		"id": 32054,
		"nome": "Ourense",
		"provincia": "Ourense",
		"habitantes": 105233,
		"km_cadrados": 85.0
	},
	{
		"id": 32008,
		"nome": "Barbadás",
		"provincia": "Ourense",
		"habitantes": 14681,
		"km_cadrados": 34.9
	},
	{
		"id": 32013,
		"nome": "O Carballiño",
		"provincia": "Ourense",
		"habitantes": 14201,
		"km_cadrados": 50.4
	},
	{
		"id": 32003,
		"nome": "Allariz",
		"provincia": "Ourense",
		"habitantes": 6083,
		"km_cadrados": 66.8
	},
	{
		"id": 32009,
		"nome": "O Barco de Valdeorras",
		"provincia": "Ourense",
		"habitantes": 13314,
		"km_cadrados": 199.9
	},
	{
		"id": 32017,
		"nome": "Cartelle",
		"provincia": "Ourense",
		"habitantes": 1835,
		"km_cadrados": 43.2
	},
	{
		"id": 32020,
		"nome": "Castrelo de Miño",
		"provincia": "Ourense",
		"habitantes": 4357,
		"km_cadrados": 63.7
	},
	{
		"id": 32030,
		"nome": "Celanova",
		"provincia": "Ourense",
		"habitantes": 5978,
		"km_cadrados": 200.8
	},
	{
		"id": 27028,
		"nome": "Lugo",
		"provincia": "Lugo",
		"habitantes": 98007,
		"km_cadrados": 332.2
	},
	{
		"id": 27052,
		"nome": "Monforte de Lemos",
		"provincia": "Lugo",
		"habitantes": 18210,
		"km_cadrados": 199.9
	},
	{
		"id": 27058,
		"nome": "Sarria",
		"provincia": "Lugo",
		"habitantes": 12619,
		"km_cadrados": 194.7
	},
	{
		"id": 27056,
		"nome": "Ribadeo",
		"provincia": "Lugo",
		"habitantes": 9990,
		"km_cadrados": 107.6
	},
	{
		"id": 27016,
		"nome": "Chantada",
		"provincia": "Lugo",
		"habitantes": 10928,
		"km_cadrados": 294.4
	},
	{
		"id": 27029,
		"nome": "Láncara",
		"provincia": "Lugo",
		"habitantes": 7175,
		"km_cadrados": 214.4
	},
	{
		"id": 27036,
		"nome": "Lourenzá",
		"provincia": "Lugo",
		"habitantes": 2900,
		"km_cadrados": 154.5
	},
	{
		"id": 27041,
		"nome": "Mondoñedo",
		"provincia": "Lugo",
		"habitantes": 4648,
		"km_cadrados": 178.9
	},
	{
		"id": 27046,
		"nome": "Pantón",
		"provincia": "Lugo",
		"habitantes": 4474,
		"km_cadrados": 167.7
	},
	{
		"id": 27059,
		"nome": "Sober",
		"provincia": "Lugo",
		"habitantes": 3061,
		"km_cadrados": 149.0
	},

];

const PROVINCIAS = [
	{ value: 'A Coruña', label: 'A Coruña' },
	{ value: 'Lugo', label: 'Lugo' },
	{ value: 'Ourense', label: 'Ourense' },
	{ value: 'Pontevedra', label: 'Pontevedra' },
];

function App() {
	const [data, setData] = useState(MUNICIPIOS);
	const [paginationInfo, setPaginationInfo] = useState({
		totalItems: 0,
		totalPages: 0,
	});
	const [view, setView] = useState({
		type: 'table',
		hiddenFields: [],
		layout: {
			primaryField: 'nome',
		},
		filters: [],
	});
	const fields = [
		{
			id: 'nome',
			header: 'Nome',
			enableGlobalSearch: true,
		},
		{
			id: 'provincia',
			header: 'Provincia',
			render: ({ item }) => item.provincia,
			enableGlobalSearch: true,
			elements: PROVINCIAS,
		},
		{
			id: 'habitantes',
			header: 'Nro hab.',
			enableSorting: false, // filterSortAndPaginate cannot sort by number types yet.
		},
		{
			id: 'km_cadrados',
			header: 'Extensión (km2)',
			enableSorting: false, // filterSortAndPaginate cannot sort by number types yet.
		}
	];

	const onChangeView = (view) => {
		const { data: newData, paginationInfo: newPaginationInfo } = filterSortAndPaginate(MUNICIPIOS, view, fields);
		setView(view);
		setData(newData);
		setPaginationInfo(newPaginationInfo);
	}

	return (
		<DataViews data={data} view={view} fields={fields} paginationInfo={paginationInfo} onChangeView={onChangeView} />
	);
}

export default App;
