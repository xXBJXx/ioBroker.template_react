import React, { useEffect } from 'react';
import { useDialogs, useI18n, useIoBrokerObject } from 'iobroker-react/hooks';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { ListAlt } from '@mui/icons-material';

interface SelectIDProps {
	onChange: (id: keyof ioBroker.AdapterConfig, value: string) => void;
	setting: ioBroker.AdapterConfig;
}
export const SelectID: React.FC<SelectIDProps> = ({ onChange, setting }) => {
	const { showSelectId } = useDialogs();
	const { translate: _ } = useI18n();
	const [objectId, setObjectId] = React.useState<string>();
	const [valid, setValid] = React.useState<boolean>(false);
	const [myObject] = useIoBrokerObject(objectId ?? '_none', {
		subscribe: false,
	});
	const [stateId, setStateId] = React.useState<string>(() => {
		setObjectId(setting.stateID);
		return setting.stateID || '';
	});

	// This will be called when the button is clicked and ask the user if they want to do this

	const handleChange = (value) => {
		if (typeof value !== 'undefined') {
			setStateId(value);
			setObjectId(value);
			setValid(false);
		}
	};

	useEffect(() => {
		if (myObject) {
			setValid(true);
			onChange('stateID', stateId);
		} else {
			setValid(false);
		}
	}, [myObject]);

	// console.log('SelectID', objectId);
	const askUser = React.useCallback(async () => {
		const selected = await showSelectId({
			title: 'Select an ID',
		});
		handleChange(selected);
	}, [showSelectId]);

	return (
		<React.Fragment>
			<TextField
				required
				id="State"
				label={_('datapoint')}
				error={!valid}
				value={stateId || ''}
				sx={{ width: '35ch' }}
				onChange={(e) => handleChange(e.target.value)}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton aria-label="addStateID" onClick={askUser} edge="end">
								<ListAlt />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</React.Fragment>
	);
};
