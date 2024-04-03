import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import {useState} from 'react';

function App() {
	const [data, setData] = useState( [
		{
			id: 1,
			title: 'First',
			description: 'Description for first item.',
			author: 'Author',
			date: "2012-01-23T18:25:43.511Z",
		},
		{
			id: 2,
			title: 'Second',
			description: 'Description for second item.',
			author: 'Editor',
			date: "2012-02-23T18:25:43.511Z",
		},
		{
			id: 3,
			title: 'Third',
			description: 'Description for third item.',
			author: 'Admin',
			date: "2012-03-23T18:25:43.511Z",
		},
	] );
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
			header: 'Title'
		},
		{
			id: 'description',
			header: 'Description'
		},
		{
			id: 'author',
			header: 'Author'
		},
		{
			id: 'date',
			header: 'Date'
		}
	];

	const onChangeView = (view) => {
		const { data: newData, paginationInfo: newPaginationInfo } = filterSortAndPaginate(data, view, fields);
		setView(view);
		setData( newData );
		setPaginationInfo( newPaginationInfo );
	}

	return (
		<DataViews data={data} view={view} fields={fields} paginationInfo={paginationInfo} onChangeView={onChangeView} />
	);
}

export default App;
