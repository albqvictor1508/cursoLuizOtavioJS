import Sequelize, { Model } from "sequelize";
import appConfig from "../config/appConfig";

export class Photo extends Model {
	static init(sequelize) {
		super.init(
			{
				originalname: {
					type: Sequelize.STRING,
					defaultValue: "",
					validate: {
						notEmpty: {
							msg: "invalid original name",
						},
					},
				},

				filename: {
					type: Sequelize.STRING,
					defaultValue: "",
					validate: {
						notEmpty: {
							msg: "invalid file name",
						},
					},
				},
				url: {
					type: Sequelize.VIRTUAL,
					get() {
						return `${appConfig.url}/images/${this.getDataValue("filename")}`;
					},
				},
			},
			{ sequelize, tableName: "photos" },
		);

		return this;
	}

	static associate(models) {
		this.belongsTo(models.Aluno, { foreignKey: "student_id" });
	}
}