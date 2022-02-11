import { extend } from 'vee-validate'
/* eslint-disable camelcase */
import {
  required,
  min,
  max,
  email,
  min_value,
  max_value,
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('min', {
  ...min,
  params: ['length'],
  message: 'This field must contain minimum {length} characters',
})

extend('max', {
  ...max,
  params: ['length'],
  message: 'This field must contain maximum {length} characters',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

extend('min_value', {
  ...min_value,
  message: 'Must be higher than {min}',
})

extend('max_value', {
  ...max_value,
  message: 'Must be less than {max}',
})
