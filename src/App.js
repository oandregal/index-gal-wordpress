import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import {useState} from 'react';

import '@wordpress/dataviews/build-style/style.css';
import '@wordpress/components/build-style/style.css';

const FULL_DATASET = [
	{
		id: 1,
		title: 'First',
		description: 'Description for the first item.',
		author: 'Author',
		date: "2012-01-23T18:25:43.511Z",
	},
	{
		id: 2,
		title: 'Second',
		description: 'Description for the second item.',
		author: 'Editor',
		date: "2012-02-23T18:25:43.511Z",
	},
	{
		id: 3,
		title: 'Third',
		description: 'Description for the third item.',
		author: 'Admin',
		date: "2012-03-23T18:25:43.511Z",
	},
	{
		id: 4,
		title: 'Fourth',
		description: 'Description for the fourth item.',
		author: 'Author',
		date: "2012-04-23T18:25:43.511Z",
	},
	{
		id: 5,
		title: 'Fifth',
		description: 'Description for the fifth item.',
		author: 'Editor',
		date: "2012-05-23T18:25:43.511Z",
	},
	{
		id: 6,
		title: 'Sixth',
		description: 'Description for the sixth item.',
		author: 'Admin',
		date: "2012-06-23T18:25:43.511Z",
	},
];

function App() {
	const [data, setData] = useState( FULL_DATASET );
	const [paginationInfo, setPaginationInfo] = useState({
		totalItems: 0,
		totalPages: 0,
	});
	const [view, setView] = useState({
		type: 'table',
		hiddenFields: [],
		layout: {},
		filters: [],
	});
	const fields = [
		{
			id: 'title',
			header: 'Title',
			enableGlobalSearch: true,
		},
		{
			id: 'description',
			header: 'Description',
			enableGlobalSearch: true,
		},
		{
			id: 'author',
			header: 'Author',
			enableGlobalSearch: true,
		},
		{
			id: 'date',
			header: 'Date'
		}
	];

	const onChangeView = (view) => {
		const { data: newData, paginationInfo: newPaginationInfo } = filterSortAndPaginate(FULL_DATASET, view, fields);
		setView(view);
		setData( newData );
		setPaginationInfo( newPaginationInfo );
	}

	return (
		<DataViews data={data} view={view} fields={fields} paginationInfo={paginationInfo} onChangeView={onChangeView} />
	);
}

export default App;
