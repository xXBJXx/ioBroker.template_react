import theme from '@iobroker/adapter-react/Theme';
import { Button, Checkbox, FormControlLabel, Stack, TextField, ThemeProvider, Tooltip } from '@mui/material';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import React, { useState } from 'react';

interface SettingPageProps {
	changeSetting: (key: keyof ioBroker.AdapterConfig, value: any) => void;
	settings: ioBroker.AdapterConfig;
}

export const SettingPage: React.FC<SettingPageProps> = ({ changeSetting, settings }): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { translate: _ } = useI18n();
	const [themeName] = useIoBrokerTheme();

	return (
		<React.Fragment>
			<ThemeProvider theme={theme(themeName)}>
				<FormControlLabel
					label={_('Enable option 1')}
					control={
						<Checkbox
							checked={settings.option1}
							onChange={(event, checked) => changeSetting('option1', checked)}
						/>
					}
				/>
				<Tooltip title={_('tooltip')} arrow>
					<TextField
						label={_('textinput')}
						color="success"
						sx={{ width: '20%', textAlignLast: 'center' }}
						value={settings.testInput}
						placeholder="placeholder"
						onChange={(event) => {
							changeSetting('testInput', event.target.value);
						}}
					/>
				</Tooltip>
				<Stack spacing={2} direction="row" sx={{ paddingTop: 2 }}>
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
				<TextField
					label={_('textOutput')}
					color="secondary"
					disabled={true}
					sx={{ width: '20%', textAlignLast: 'center', marginTop: 3 }}
					value={settings.testOutput}
				/>
			</ThemeProvider>
		</React.Fragment>
	);
};
