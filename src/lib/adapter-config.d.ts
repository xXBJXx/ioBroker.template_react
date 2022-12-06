// This file extends the AdapterConfig type from "@types/iobroker"

// Augment the globally declared type ioBroker.AdapterConfig
declare global {
	namespace ioBroker {
		interface Devices {
			room: string;
			ip: string;
		}
		interface AdapterConfig {
			devices: Devices[];
		}
	}
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};
