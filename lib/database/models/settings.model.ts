import { Schema, model, models } from "mongoose";

const SettingsSchema = new Schema({
	owner:  {type: Schema.Types.ObjectId, ref: 'Settings'},
	options: {
		SMS: {
			text: {
				type: String,
				default: false
			  },
			  position: {
				type: Number,
				default: false
			  },
			  buttonValue: {
				type: String,
				default: false
			  },
			  defaultButtons: {
				type: Array,
				default: false
			  },
			  inlineButtons: {
				type: Array,
				default: false
			  }
			},
			VK: {
				text: {
					type: String,
					default: false
				  },
				  position: {
					type: Number,
					default: false
				  },
				  buttonValue: {
					type: String,
					default: false
				  },
				  defaultButtons: {
					type: Array,
					default: false
				  },
				  inlineButtons: {
					type: Array,
					default: false
				  }
			},
			Telegram: {
				text: {
					type: String,
					default: false
				  },
				  position: {
					type: Number,
					default: false
				  },
				  buttonValue: {
					type: String,
					default: false
				  },
				  defaultButtons: {
					type: Array,
					default: false
				  },
				  inlineButtons: {
					type: Array,
					default: false
				  }
			},
			WhatsApp: {
				text: {
					type: String,
					default: false
				  },
				  position: {
					type: Number,
					default: false
				  },
				  buttonValue: {
					type: String,
					default: false
				  },
				  defaultButtons: {
					type: Array,
					default: false
				  },
				  inlineButtons: {
					type: Array,
					default: false
				  }
			},
	}
}
)

const Settings = models.Settings || model('Settings', SettingsSchema);

export default Settings;