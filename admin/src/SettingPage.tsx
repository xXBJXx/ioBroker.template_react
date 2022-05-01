import theme from '@iobroker/adapter-react/Theme';
import {
	Box,
	Button,
	Stack,
	TextField,
	ThemeProvider,
	Tooltip,
	Typography,
	Tabs,
	Tab,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import React from 'react';
import { SelectID } from './SelectID';
import { CustomTable } from './CustomTable';

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
export const SettingPage: React.FC<SettingPageProps> = ({ changeSetting, settings }): JSX.Element => {
	const { translate: _ } = useI18n();
	const [themeName] = useIoBrokerTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	return (
		<React.Fragment>
			<ThemeProvider theme={theme(themeName)}>
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
				</TabPanel>
			</ThemeProvider>
		</React.Fragment>
	);
};
