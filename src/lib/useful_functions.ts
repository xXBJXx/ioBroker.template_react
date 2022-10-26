/**
 * function to decrypt a string
 */
export const decrypt = (key: string | any[], value: string): string => {
	let result = '';
	for (let i = 0; i < value.length; ++i) {
		result += String.fromCharCode(key[i % key.length].charCodeAt(0) ^ value.charCodeAt(i));
	}
	return result;
};
