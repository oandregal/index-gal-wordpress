import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import { useState } from 'react';

import '@wordpress/dataviews/build-style/style.css';
import '@wordpress/components/build-style/style.css';

import { MUNICIPIOS, PROVINCIAS } from './data';

/*
 * The pt-PT format use spaces as thousands separator,
 * as recommended by BIPM and SI.
 * https://en.wikipedia.org/wiki/Decimal_separator#Digit_grouping
 *
 * See also https://wikidog.xunta.gal/index.php/Escrita_dos_n%C3%BAmeros
 */
const formatNumber = (number) => new Intl.NumberFormat('pt-PT').format(number);

function App() {
	const [data, setData] = useState(MUNICIPIOS);

	const [paginationInfo, setPaginationInfo] = useState({
		totalItems: 0,
		totalPages: 0,
	});
	const [view, setView] = useState({
		type: 'table',
		hiddenFields: ['imaxe_src'],
		perPage: 10,
		layout: {
			primaryField: 'nome',
			mediaField: 'imaxe_src',
			badgeFields: ['provincia'],
			columnFields: [],
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
			enableGlobalSearch: true,
			elements: PROVINCIAS,
			filterBy: {
				isPrimary: true,
				operators: ['is'],
			}
		},
		{
			id: 'habitantes',
			header: 'Nro hab.',
			render: ({ item }) => formatNumber(item.habitantes),
			enableSorting: false, // filterSortAndPaginate cannot sort by number types yet.
		},
		{
			id: 'km_cadrados',
			header: 'Extensión (km2)',
			render: ({ item }) => formatNumber(item.km_cadrados),
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
		<DataViews
			data={data}
			fields={fields}
			view={view}
			onChangeView={onChangeView}
			paginationInfo={paginationInfo}
		/>
	);
}

export default App;
