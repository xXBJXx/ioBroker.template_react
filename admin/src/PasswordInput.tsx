// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
// import React, { useState } from 'react';
//
// interface PasswordInputProps {
// 	onChange: (
// 		id: keyof ioBroker.AdapterConfig,
// 		value: { name: string; ip: string; port: number; password: string }[],
// 	) => void;
// 	setting: ioBroker.AdapterConfig;
// }
// interface valuesProps {
// 	password: string;
// 	showPassword: boolean;
// }
// export const PasswordInput: React.FC<PasswordInputProps> = ({ setting, onChange }) => {
// 	const [values, setValues] = useState<valuesProps>({
// 		password: setting.password !== '' ? setting.password : '',
// 		showPassword: false,
// 	});
// 	const handleClickShowPassword = (): void => {
// 		setValues({ ...values, showPassword: !values.showPassword });
// 	};
// 	const handleChangePW =
// 		(attr: string) =>
// 		(event: { target: { value: any } }): void => {
// 			setValues({ ...values, [attr]: event.target.value });
// 			onChange('password', event.target.value);
// 		};
//
// 	return (
// 		<React.Fragment>
// 			<FormControl sx={{ m: 1, width: '20ch' }} variant="outlined">
// 				<InputLabel htmlFor="outlined-adornment-password">{'Password'}</InputLabel>
// 				<OutlinedInput
// 					id="outlined-adornment-password"
// 					type={values.showPassword ? 'text' : 'password'}
// 					value={values.password}
// 					onChange={handleChangePW('password')}
// 					endAdornment={
// 						<InputAdornment position="end">
// 							<IconButton
// 								aria-label="toggle password visibility"
// 								onClick={handleClickShowPassword}
// 								edge="end"
// 							>
// 								{values.showPassword ? <VisibilityOff /> : <Visibility />}
// 							</IconButton>
// 						</InputAdornment>
// 					}
// 					label={'Password'}
// 				/>
// 			</FormControl>
// 		</React.Fragment>
// 	);
// };
