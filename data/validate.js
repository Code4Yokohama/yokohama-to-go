'use strict'
const Validator = require('jsonschema').Validator
const v = new Validator()
const schema = require('./schema.json')
const path = process.argv[2] ? process.argv[2] : './sample.json'
const data = require(path)
console.log(v.validate(data, schema).valid)
