import mongoose from 'mongoose'

const StudentSchema = mongoose.Schema(
	{
		first_name: {
			type: String,
			default: ''
		},
		last_name: {
			type: String,
			default: ''
		},
		section: {
			type: String,
			default: ''
		},
		gender: {
			type: String,
			default: ''
		},
		created: {
			type: String,
			default: ''
		},
		updated: {
			type: String,
			default: ''
		}
	},
	{ timestamps: true }
)

const Students = mongoose.models.Students || mongoose.model('Students', StudentSchema)

export default Students
