import { Box, TextField } from '@mui/material';
import { IpAddressInput, PasswordInput } from 'iobroker-react';

import React from 'react';

interface SettingPageProps {
	onChange: (key: keyof ioBroker.AdapterConfig, value: any) => void;
	settings: ioBroker.AdapterConfig;
}
export const SettingPage: React.FC<SettingPageProps> = ({ onChange, settings }): JSX.Element => {
	// const { translate: _ } = useI18n();

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
		attr: string,
		index: number,
	) => {
		const val = typeof event === 'string' ? event : event.target.value;
		const newSettings = { ...settings };
		newSettings.devices[index][attr] = val;
		onChange('devices', newSettings.devices); //TODO: prüfen warum das nicht funktioniert
		console.log(newSettings);
	};

	return (
		<React.Fragment>
			<Box
				component="form"
				sx={{
					mt: 4,
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
			>
				{settings.devices.map((device, index) => (
					<React.Fragment key={index}>
						<TextField
							id="outlined-basic"
							label="Name"
							placeholder={'Wohnzimmer'}
							variant="outlined"
							required
							value={device.room || ''}
							onChange={(value) => handleChange(value, 'room', index)}
						/>
						<IpAddressInput
							value={device.ip || ''}
							onChange={(value) => handleChange(value, 'ip', index)}
							required={true}
							label={'Ip Address'}
						/>
					</React.Fragment>
				))}
				<br />
				Native:
				<br />
				{JSON.stringify(settings)}
			</Box>
		</React.Fragment>
	);
};
