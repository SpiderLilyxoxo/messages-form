export const Networks = ["VK", "Telegram", "WhatsApp", "SMS"]

export const FilterOptions = {
	"SMS": {
		"maxSymbols": null,
		"defaultButtons": false,
		"defaultButtonsValue": null,
		"defaultButtonsLength": null,
		"defaultButtonsUrl": false,
		"defaultButtonsUrlValue": null,
		"inlineButtons": true,
		"inlineButtonsValue": null,
		"inlineButtonsLength": null,
		"inlineButtonsUrl": false,
		"inlineButtonsUrlValue": null
	},
	"VK": {
		"maxSymbols": 4096,
		"defaultButtons": true,
		"defaultButtonsValue": 40,
		"defaultButtonsLength": null,
		"defaultButtonsUrl": true,
		"defaultButtonsUrlValue": null,
		"inlineButtons": true,
		"inlineButtonsValue": 10,
		"inlineButtonsLength": null,
		"inlineButtonsUrl": true,
		"inlineButtonsUrlValue": null
	},
	"Telegram": {
		"maxSymbols": 4096,
		"defaultButtons": true,
		"defaultButtonsValue": null,
		"defaultButtonsLength": null,
		"defaultButtonsUrl": false,
		"defaultButtonsUrlValue": null,
		"inlineButtons": true,
		"inlineButtonsValue": null,
		"inlineButtonsLength": 64,
		"inlineButtonsUrl": true,
		"inlineButtonsUrlValue": null
	},
	"WhatsApp": {
		"maxSymbols": 1000,
		"defaultButtons": true,
		"defaultButtonsValue": 10,
		"defaultButtonsLength": 20,
		"defaultButtonsUrl": false,
		"defaultButtonsUrlValue": null,
		"inlineButtons": true,
		"inlineButtonsValue": 3,
		"inlineButtonsLength": 20,
		"inlineButtonsUrl": true,
		"inlineButtonsUrlValue": 1
	},
}

export interface Filter {
	"SMS": {
		  "maxSymbols": null,
		  "defaultButtons": false,
		  "defaultButtonsValue": null,
		  "defaultButtonsLength": null,
		  "defaultButtonsUrl": false,
		  "defaultButtonsUrlValue": null
		  "inlineButtons": true,
		  "inlineButtonsValue": null,
		  "inlineButtonsLength": null,
		  "inlineButtonsUrl": false,
		  "inlineButtonsUrlValue": null
	  },
	  "VK": {
		  "maxSymbols": 4096,
		  "defaultButtons": true,
		  "defaultButtonsValue": 40,
		  "defaultButtonsLength": null,
		  "defaultButtonsUrl": true,
		  "defaultButtonsUrlValue": null
		  "inlineButtons": true,
		  "inlineButtonsValue": 10,
		  "inlineButtonsLength": null,
		  "inlineButtonsUrl": true,
		  "inlineButtonsUrlValue": null
	  },
	  "Telegram": {
		  "maxSymbols": 4096,
		  "defaultButtons": true,
		  "defaultButtonsValue": null,
		  "defaultButtonsLength": null,
		  "defaultButtonsUrl": false,
		  "defaultButtonsUrlValue": null
		  "inlineButtons": true,
		  "inlineButtonsValue": null,
		  "inlineButtonsLength": 64,
		  "inlineButtonsUrl": true,
		  "inlineButtonsUrlValue": null
	  },
	  "WhatsApp": {
		  "maxSymbols": 1000,
		  "defaultButtons": true,
		  "defaultButtonsValue": 10,
		  "defaultButtonsLength": 20,
		  "defaultButtonsUrl": false,
		  "defaultButtonsUrlValue": null
		  "inlineButtons": true,
		  "inlineButtonsValue": 3,
		  "inlineButtonsLength": 20,
		  "inlineButtonsUrl": true,
		  "inlineButtonsUrlValue": 1
	  },
  }