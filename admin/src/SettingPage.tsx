import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	Tab,
	Tabs,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { TreeColumnProps, TreeDataProps, TreeTable } from 'iobroker-react';
import { useI18n } from 'iobroker-react/hooks';
import React from 'react';
import { CustomTable } from './CustomTable';
import { PasswordInput } from './PasswordInput';
import { SelectID } from './SelectID';

interface SettingPageProps {
	changeSetting: (key: keyof ioBroker.AdapterConfig, value: any) => void;
	settings: ioBroker.AdapterConfig;
}
interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const columns: TreeColumnProps[] = [
	{
		title: 'Name',
		field: 'fieldIdInData',
		editable: true,
		subStyle: { color: '#00FF00' },
		subField: 'subFieldData',
	},
	{ title: 'Text', field: 'text', editable: true, type: 'string' },
	{ title: 'OID', field: 'oid', editable: true, type: 'oid' },
	{ title: 'Color', field: 'color', editable: true, type: 'color' },
	{ title: 'Numeric', field: 'numeric', editable: true, type: 'numeric' },
	{ title: 'Boolean', field: 'boolean', editable: true, type: 'boolean' },
	{
		title: 'Select',
		field: 'select',
		editable: true,
		type: 'string',
		lookup: { 1: 'one', 2: 'two', 3: 'three' },
	},
];

const newLine = {
	id: Math.random().toString(36).substr(2, 9), // create random id
	fieldIdInData: 'your data',
	oid: 'myOID',
	color: '#ff0000',
	numeric: 123,
	select: 'number',
	boolean: true,
	text: 'your data',
};

export const SettingPage: React.FC<SettingPageProps> = ({ changeSetting, settings }): JSX.Element => {
	const { translate: _ } = useI18n();
	const [value, setValue] = React.useState(0);
	const [treeData, setTreeData] = React.useState<TreeDataProps[]>([
		{
			id: '1',
			fieldIdInData: 'Test1',
			oid: 'test.0.test1',
			color: '#ff0000',
			numeric: 1,
			text: 'Text1',
			boolean: true,
			select: '1',
		},
		{
			id: '2',
			fieldIdInData: 'Test2',
			oid: 'test.0.test2',
			color: '#00ff00',
			numeric: 2,
			text: 'Text2',
			parentId: '1',
			subFieldData: 'Child',
			boolean: false,
			select: '2',
		},
		{
			id: '3',
			fieldIdInData: 'Test3',
			oid: 'test.0.test3',
			color: '#0000ff',
			numeric: 3,
			text: 'Text3',
			boolean: true,
			select: '3',
		},
	]);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<React.Fragment>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
					bgcolor: 'background.paper',
					marginTop: '-20px',
				}}
			>
				<Tabs
					value={value}
					indicatorColor="secondary"
					textColor="inherit"
					variant="scrollable"
					scrollButtons="auto"
					allowScrollButtonsMobile
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Checkbox" {...a11yProps(0)} />
					<Tab label="Text field" {...a11yProps(1)} />
					<Tab label="Buttons" {...a11yProps(2)} />
					<Tab label="SelectID" {...a11yProps(3)} />
					<Tab label="Table" {...a11yProps(4)} />
					<Tab label="Password" {...a11yProps(5)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'space-around' }}>
					{_('Checkbox')}
				</Typography>
				<FormControlLabel
					label={_('Enable option 1')}
					control={
						<Checkbox
							checked={settings.option1}
							onChange={(event, checked) => changeSetting('option1', checked)}
						/>
					}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'space-around' }}>
					{_('Text field')}
				</Typography>
				<Tooltip title={_('tooltip')} arrow>
					<TextField
						label={_('textinput')}
						sx={{ width: '20%', textAlignLast: 'center' }}
						value={settings.testInput}
						onChange={(event) => {
							changeSetting('testInput', event.target.value);
						}}
					/>
				</Tooltip>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'space-around' }}>
					{_('Buttons')}
				</Typography>
				<Stack
					spacing={2}
					direction="row"
					sx={{ paddingTop: 2, margin: 1, display: 'flex', justifyContent: 'space-around' }}
				>
					<Button
						variant="text"
						onClick={() => {
							changeSetting('testOutput', 'Text');
						}}
					>
						Text
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							changeSetting('testOutput', 'Contained');
						}}
					>
						Contained
					</Button>
					<Button
						variant="outlined"
						onClick={() => {
							changeSetting('testOutput', 'Outlined');
						}}
					>
						Outlined
					</Button>
				</Stack>
				<Box sx={{ margin: 2, display: 'flex', justifyContent: 'space-around' }}>
					<TextField
						label={_('buttonOutput')}
						color="secondary"
						disabled={true}
						sx={{
							width: '20%',
							textAlignLast: 'center',
							margin: 0,
						}}
						value={settings.testOutput}
					/>
				</Box>
			</TabPanel>
			<TabPanel index={3} value={value}>
				<Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'space-around' }}>
					{_('SelectID')}
				</Typography>
				<SelectID setting={settings} onChange={(id, value) => changeSetting(id, value)} />
			</TabPanel>
			<TabPanel index={4} value={value}>
				<CustomTable setting={settings} onChange={(id, value) => changeSetting(id, value)} />
				<br />
				TreeTable
				<TreeTable
					columns={columns}
					data={treeData}
					newLineData={newLine}
					newData={setTreeData}
					noAdd={false}
					noEdit={false}
					noDelete={false}
				/>
			</TabPanel>
			<TabPanel index={5} value={value}>
				<Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'space-around' }}>
					Password
				</Typography>
				<PasswordInput setting={settings} onChange={(id, value) => changeSetting(id, value)} />
			</TabPanel>
		</React.Fragment>
	);
};
