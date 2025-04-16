import dotenv from 'dotenv';
import Joi from 'joi';
dotenv.config();

// Schéma de validation des variables d'environnement
const envValidate = Joi.object()
    .keys({
        PORT: Joi.number().allow('').empty('').default(3002),
    })
    .unknown();

// Validation des variables d'environnement
const { value: env, error } = envValidate.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config env error: ${error.message}`);
}

// Exporter les configurations
export default {
    PORT: env.PORT,
};
