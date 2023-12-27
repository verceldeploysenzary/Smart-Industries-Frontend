const CardDashboard = ({ name, id, groups, createdDate }) => {
	const renderGroups = () => {
		return groups.map((group) => (
			<div key={group.id.id}>
				<h1>{group.name} : </h1>
				<h1>id: {group.id.id}</h1>
			</div>
		));
	};

	return (
		<tr key={id} className="text-left pt-">
			<td className="text-[13px] w-[15%]">{createdDate}</td>
			<td className="w-[40%]">{name}</td>
			<td className="flex flex-wrap">
				{groups.map((group) => (
					<div className="flex flex-wrap px-tr text-[12px]">
						<div key={group.id.id} className="bg-[#e2e0e0] flex rounded-full px-btn">
							{group.name}
						</div>
					</div>
				))}
			</td>
		</tr>
	);
};

export default CardDashboard;
