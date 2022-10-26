// This file extends the AdapterConfig type from "@types/iobroker"

// Augment the globally declared type ioBroker.AdapterConfig
declare global {
	namespace ioBroker {
		interface Devices {
			name: string;
			ip: string;
			port: number;
			topic: string;
			enabled: boolean;
			mqttEnabled: boolean;
		}
		interface AdapterConfig {
			option1: boolean;
			password: string;
			devices: Devices[];
			testInput: string;
			testOutput: string;
			stateID: string;
			tableValues: {
				name: string;
				ip: string;
				port: number;
				password: string;
			}[];
		}
	}
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};
