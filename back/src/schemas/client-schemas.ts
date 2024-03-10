import { createClientDto } from "@/interfaces/client-interfaces";
import Joi from "joi";


export const createClientSchema = Joi.object<createClientDto>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  zipcode: Joi.number().required().max(99999999),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  city: Joi.string().required(),
  state: Joi.string().length(2).required(),
  street: Joi.string().required(),
  number: Joi.number().required()
});




export const getClientRouteSchema = Joi.object<createClientDto>({

  state: Joi.string().required().length(2),

});


