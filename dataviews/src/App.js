import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import { useState } from 'react';

import '@wordpress/dataviews/build-style/style.css';
import '@wordpress/components/build-style/style.css';

/*
 * Estos datos de proba foron xerados usando ChatGPT 3.5 en Abril de 2024
 * e posteriormente editados.
 */
const MUNICIPIOS = [
	{
		"id": 15030,
		"nome": "A Coruña",
		"provincia": "A Coruña",
		"habitantes": 215227,
		"km_cadrados": 37.83,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/e/eb/A_coruna_torre_de_hercules_sunset_edit.jpg",
		"imaxe_url": "https://commons.wikimedia.org/wiki/File:A_coruna_torre_de_hercules_sunset_edit.jpg",
		"imaxe_autor": "Alessio Damato, CC BY-SA 3.0 <http://creativecommons.org/licenses/by-sa/3.0/>, via Wikimedia Commons",
	},
	{
		"id": 15056,
		"nome": "Oleiros",
		"provincia": "A Coruña",
		"habitantes": 34979,
		"km_cadrados": 48.1,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Praia_de_Portocovo_e_castelo_de_Santa_Cruz.JPG",
		"imaxe_url": "https://commons.wikimedia.org/wiki/File:Praia_de_Portocovo_e_castelo_de_Santa_Cruz.JPG",
		"imaxe_autor": "Vilachan, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons",
	},
	{
		"id": 15057,
		"nome": "Carballo",
		"provincia": "A Coruña",
		"habitantes": 31252,
		"km_cadrados": 208.8,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Praia-e-porto-razo-carballo.jpg",
		"imaxe_url": "https://commons.wikimedia.org/wiki/File:Praia-e-porto-razo-carballo.jpg",
		"imaxe_autor": "Chorima1, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons",
	},
	{
		"id": 15078,
		"nome": "Santiago de Compostela",
		"provincia": "A Coruña",
		"habitantes": 95092,
		"km_cadrados": 220.0,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/c/cf/2010-Catedral_de_Santiago_de_Compostela-Galicia_%28Spain%29_4.jpg",
		"imaxe_url": "https://commons.wikimedia.org/wiki/File:2010-Catedral_de_Santiago_de_Compostela-Galicia_(Spain)_4.jpg",
		"imaxe_autor": "Luis Miguel Bugallo Sánchez, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons",
	},
	{
		"id": 15054,
		"nome": "Ferrol",
		"provincia": "A Coruña",
		"habitantes": 66060,
		"km_cadrados": 82.0,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/9/93/Ferrol-021.jpg",
		"imaxe_url": "https://commons.wikimedia.org/wiki/File:Ferrol-021.jpg",
		"imaxe_autor": "Basilio, CC BY-SA 3.0 <http://creativecommons.org/licenses/by-sa/3.0/>, via Wikimedia Commons",
	},
	{
		"id": 15055,
		"nome": "Narón",
		"provincia": "A Coruña",
		"habitantes": 39624,
		"km_cadrados": 73.3,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/2/27/Casa_do_Concello_de_Naron.jpg",
		"imaxe_url": "https://commons.wikimedia.org/wiki/File:Casa_do_Concello_de_Naron.jpg",
		"imaxe_author": "The original uploader was PepedoCouto at Galician Wikipedia.(Original text: PepedoCouto), CC BY-SA 3.0 <http://creativecommons.org/licenses/by-sa/3.0/>, via Wikimedia Commons",
	},
	{
		"id": 15020,
		"nome": "Culleredo",
		"provincia": "A Coruña",
		"habitantes": 30310,
		"km_cadrados": 37.4,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/0/08/Culleredo-Iglesia_del_Burgo_03.jpg",
		"imaxe_url": "https://commons.wikimedia.org/wiki/File:Culleredo-Iglesia_del_Burgo_03.jpg",
		"imaxe_autor": "Oilisab, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons",
	},
	{
		"id": 15025,
		"nome": "Fene",
		"provincia": "A Coruña",
		"habitantes": 15412,
		"km_cadrados": 48.1,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Orgullo_Petrolero_Pemex_BAP_Navantia_Ferrol.jpg",
		"imaxe_url": "https://commons.wikimedia.org/wiki/File:Orgullo_Petrolero_Pemex_BAP_Navantia_Ferrol.jpg",
		"imaxe_autor": "Nemigo, CC0, via Wikimedia Commons",
	},
	{
		"id": 15015,
		"nome": "Arteixo",
		"provincia": "A Coruña",
		"habitantes": 31786,
		"km_cadrados": 93.7,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Vista_xeral_de_Arteixo.JPG/800px-Vista_xeral_de_Arteixo.JPG"
	},
	{
		"id": 15032,
		"nome": "Abegondo",
		"provincia": "A Coruña",
		"habitantes": 7166,
		"km_cadrados": 77.7,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/As_Arretas_-_Castro_de_Abegondo_-_Galiza_-_Galicia_-_Spain.jpg/800px-As_Arretas_-_Castro_de_Abegondo_-_Galiza_-_Galicia_-_Spain.jpg"
	},
	{
		"id": 36038,
		"nome": "Pontevedra",
		"provincia": "Pontevedra",
		"habitantes": 82872,
		"km_cadrados": 118.3,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Pontevedra02.jpg/800px-Pontevedra02.jpg"
	},
	{
		"id": 36057,
		"nome": "Vigo",
		"provincia": "Pontevedra",
		"habitantes": 294997,
		"km_cadrados": 109.06,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Vigo_montage.png/800px-Vigo_montage.png"
	},
	{
		"id": 36016,
		"nome": "Marín",
		"provincia": "Pontevedra",
		"habitantes": 25025,
		"km_cadrados": 23.2,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Porto_de_Mar%C3%ADn.jpg/800px-Porto_de_Mar%C3%ADn.jpg"
	},
	{
		"id": 36039,
		"nome": "Ponteareas",
		"provincia": "Pontevedra",
		"habitantes": 22978,
		"km_cadrados": 67.5,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Vila_de_Ponteareas.jpg/800px-Vila_de_Ponteareas.jpg"
	},
	{
		"id": 36916,
		"nome": "Sanxenxo",
		"provincia": "Pontevedra",
		"habitantes": 17541,
		"km_cadrados": 44.8,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Praia_de_Silgar_%28Sanxenxo%29_04.jpg/800px-Praia_de_Silgar_%28Sanxenxo%29_04.jpg"
	},
	{
		"id": 36020,
		"nome": "Vilagarcía de Arousa",
		"provincia": "Pontevedra",
		"habitantes": 37247,
		"km_cadrados": 37.2,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Vilagarcia_de_Arousa_vista_a%C3%A9rea.jpg/800px-Vilagarcia_de_Arousa_vista_a%C3%A9rea.jpg"
	},
	{
		"id": 36055,
		"nome": "Redondela",
		"provincia": "Pontevedra",
		"habitantes": 29889,
		"km_cadrados": 52.9,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Vista_a%C3%A9rea_de_Redondela.jpg/800px-Vista_a%C3%A9rea_de_Redondela.jpg"
	},
	{
		"id": 36017,
		"nome": "Moaña",
		"provincia": "Pontevedra",
		"habitantes": 17109,
		"km_cadrados": 21.3,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Moa%C3%B1a_Igrexa_de_San_Mart%C3%ADn.jpg/800px-Moa%C3%B1a_Igrexa_de_San_Mart%C3%ADn.jpg"
	},
	{
		"id": 36043,
		"nome": "A Estrada",
		"provincia": "Pontevedra",
		"habitantes": 21168,
		"km_cadrados": 175.1,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Pazo_de_Oca_001.jpg/800px-Pazo_de_Oca_001.jpg"
	},
	{
		"id": 36019,
		"nome": "Cangas",
		"provincia": "Pontevedra",
		"habitantes": 25708,
		"km_cadrados": 38.1,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Cangas_-_Galiza_-_Galicia_-_Spain.jpg/800px-Cangas_-_Galiza_-_Galicia_-_Spain.jpg"
	},

	{
		"id": 32054,
		"nome": "Ourense",
		"provincia": "Ourense",
		"habitantes": 105233,
		"km_cadrados": 85.0,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Praza_Maior_Ourense_2.jpg/800px-Praza_Maior_Ourense_2.jpg"
	},
	{
		"id": 32008,
		"nome": "Barbadás",
		"provincia": "Ourense",
		"habitantes": 14681,
		"km_cadrados": 34.9,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/CasarBarbadas.jpg/800px-CasarBarbadas.jpg"
	},
	{
		"id": 32013,
		"nome": "O Carballiño",
		"provincia": "Ourense",
		"habitantes": 14201,
		"km_cadrados": 50.4,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Panor%C3%A1mica_de_O_Carballi%C3%B1o.jpg/800px-Panor%C3%A1mica_de_O_Carballi%C3%B1o.jpg"
	},
	{
		"id": 32024,
		"nome": "O Barco de Valdeorras",
		"provincia": "Ourense",
		"habitantes": 13294,
		"km_cadrados": 200.0,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/O_Barco_de_Valdeorras_%28Ourense%29%2C_Mirador_da_Pena_do_Sol_1.jpg/800px-O_Barco_de_Valdeorras_%28Ourense%29%2C_Mirador_da_Pena_do_Sol_1.jpg"
	},
	{
		"id": 32003,
		"nome": "Allariz",
		"provincia": "Ourense",
		"habitantes": 6083,
		"km_cadrados": 66.8,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Vista_de_Allariz.jpg/800px-Vista_de_Allariz.jpg"
	},
	{
		"id": 27028,
		"nome": "Lugo",
		"provincia": "Lugo",
		"habitantes": 98007,
		"km_cadrados": 332.2,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Muralla_Romana_Lugo_1.jpg/800px-Muralla_Romana_Lugo_1.jpg"
	},
	{
		"id": 27052,
		"nome": "Monforte de Lemos",
		"provincia": "Lugo",
		"habitantes": 18210,
		"km_cadrados": 199.9,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Monforte_de_Lemos_-_Fot%C3%B3grafo_-_Tamara_v%C3%A1zquez.jpg/800px-Monforte_de_Lemos_-_Fot%C3%B3grafo_-_Tamara_v%C3%A1zquez.jpg"
	},
	{
		"id": 27058,
		"nome": "Sarria",
		"provincia": "Lugo",
		"habitantes": 12619,
		"km_cadrados": 194.7,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sarria_S%C3%A9culo_XIX.jpg/800px-Sarria_S%C3%A9culo_XIX.jpg"
	},
	{
		"id": 27056,
		"nome": "Ribadeo",
		"provincia": "Lugo",
		"habitantes": 9990,
		"km_cadrados": 107.6,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Ribadeo_desde_Pancha_-_Fot%C3%B3grafo_-_Tamara_V%C3%A1zquez.jpg/800px-Ribadeo_desde_Pancha_-_Fot%C3%B3grafo_-_Tamara_V%C3%A1zquez.jpg"
	},
	{
		"id": 27016,
		"nome": "Chantada",
		"provincia": "Lugo",
		"habitantes": 10928,
		"km_cadrados": 294.4,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Chantada-IMG_0303.jpg/800px-Chantada-IMG_0303.jpg"
	},
	{
		"id": 27029,
		"nome": "Láncara",
		"provincia": "Lugo",
		"habitantes": 7175,
		"km_cadrados": 214.4,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Castelo_de_Lemos_Lugo_1.jpg/800px-Castelo_de_Lemos_Lugo_1.jpg"
	},
	{
		"id": 27036,
		"nome": "Lourenzá",
		"provincia": "Lugo",
		"habitantes": 2900,
		"km_cadrados": 154.5,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Monasterio_de_Lourenz%C3%A1_01.jpg/800px-Monasterio_de_Lourenz%C3%A1_01.jpg"
	},
	{
		"id": 27041,
		"nome": "Mondoñedo",
		"provincia": "Lugo",
		"habitantes": 4648,
		"km_cadrados": 178.9,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mondo%C3%B1edo-Ria_1900.jpg/800px-Mondo%C3%B1edo-Ria_1900.jpg"
	},
	{
		"id": 27046,
		"nome": "Pantón",
		"provincia": "Lugo",
		"habitantes": 4474,
		"km_cadrados": 167.7,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Panton_Igrexa_de_San_Xo%C3%A1n.jpg/800px-Panton_Igrexa_de_San_Xo%C3%A1n.jpg"
	},
	{
		"id": 27059,
		"nome": "Sober",
		"provincia": "Lugo",
		"habitantes": 3061,
		"km_cadrados": 149.0,
		"imaxe_src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Sober_Galicia_Spain.jpg/800px-Sober_Galicia_Spain.jpg"
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
		hiddenFields: [ 'imaxe_src' ],
		perPage: 10,
		layout: {
			primaryField: 'nome',
			mediaField: 'imaxe_src',
			badgeFields: ['provincia'], // TODO: feature unreleased.
			columnFields: ['km_cadrados'], // TODO: feature unreleased.
		},
		filters: [],
	});
	const fields = [
		{
			id: "imaxe_src",
			header: "Imaxe",
			render: ({ item }) => <a title={item.imaxe_autor} href={item.imaxe_url}><img width="512" alt="Praia de Silgar, Sanxenxo, Galiza" src={item.imaxe_src} /></a>,
			enableSorting: false,
		},
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
