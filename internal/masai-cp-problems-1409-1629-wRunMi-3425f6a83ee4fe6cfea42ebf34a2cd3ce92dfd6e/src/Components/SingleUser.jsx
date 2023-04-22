export const SingleUser = () => {
	return (
		<div>
			<button data-cy="back-to-home-btn"></button>

			<table>
				<thead>
					<tr>
						<th>sl.no</th>
						<th>name</th>
						<th>email</th>
						<th>phone</th>
						<th>address</th>
						<th>city</th>
						<th>state</th>
						<th>zip</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td data-cy="singleUser-name"></td>
						<td data-cy="singleUser-email"></td>
						<td data-cy="singleUser-phone"></td>
						<td data-cy="singleUser-address"></td>
						<td data-cy="singleUser-city"></td>
						<td data-cy="singleUser-state"></td>
						<td data-cy="singleUser-zip"></td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
