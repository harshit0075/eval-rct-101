export const UsersDashboard = ({id}) => {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>sl.no</th>
						<th>name</th>
						<th>email</th>
						<th>phone</th>
					</tr>
				</thead>
				<tbody data-cy="user-list">
					{/* in tr tag in the palce of e.id enter that id here e.g- if you  use element as parameter then it should element.id */}
					<tr data-cy={`singleUser-${id}`}>
						<td></td>
						<td data-cy="user-name"></td>
						<td data-cy="user-email"></td>
						<td data-cy="user-phone"></td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
