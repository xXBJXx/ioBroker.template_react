/**
 * Created by alex-issi on 01.05.22
 */
import React, { useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

interface CustomTableProps {
	onChange: (
		id: keyof ioBroker.AdapterConfig,
		value: { name: string; ip: string; port: number; password: string }[],
	) => void;
	setting: ioBroker.AdapterConfig;
}

const dummyData = { name: 'test', ip: '11.1.1.1', port: 81, password: '12345' };

export const CustomTable: React.FC<CustomTableProps> = ({ setting, onChange }): JSX.Element => {
	const { translate: _ } = useI18n();
	const [rows, setRows] = useState(setting.tableValues);

	const handleDelete = (name: string) => {
		const newRows = rows.filter((row) => row.name !== name);
		setRows(newRows);
		onChange('tableValues', newRows);
	};

	const handleAdd = () => {
		const newRows = [...rows, dummyData];
		setRows(newRows);
		onChange('tableValues', newRows);
	};

	const random = (): number => Math.floor(Math.random() * 100);

	return (
		<React.Fragment>
			<Button aria-label="delete" sx={{ bgcolor: '#292828FF' }} onClick={() => handleAdd()}>
				<Add sx={{ color: 'green' }} />
			</Button>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">{_('Name')}</TableCell>
							<TableCell align="center">{_('IP')}</TableCell>
							<TableCell align="center">{_('Port')}</TableCell>
							<TableCell align="center">{_('Password')}</TableCell>
							<TableCell align="center">{_('Action')}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.name + random()}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align="center">{row.name}</TableCell>
								<TableCell align="center">{row.ip}</TableCell>
								<TableCell align="center">{row.port}</TableCell>
								<TableCell align="center">{row.password}</TableCell>
								<TableCell align={'center'}>
									<IconButton aria-label="delete" onClick={() => handleDelete(row.name)}>
										<Delete sx={{ color: 'red' }} />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
};
