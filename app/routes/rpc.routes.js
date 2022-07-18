const Router = require('express');
const router = new Router();

const TypeFieldsService = require('../services/type-fields.service');
const FormFieldService = require('../services/form-field.service');
const FormService = require('../services/form.service');

const rpcApi = {
    type_fields: TypeFieldsService,
    form_fields: FormFieldService,
    form: FormService,
}

router.post("", (req, res) => {
    if(req.body.method.split('.')[0] === 'type_fields') {
        try {
            rpcApi.type_fields[req.body.method.split('.')[1]](req.body.params, function (err, result) {
                if(err) throw new Error(err);
                res.json({jsonrpc: '2.0', result: result, id:req.body.id});
            })
        } catch(error) {
            res.json({
                error: {
                code: -32601,
                message:`Not found method:${req.body.method}`,
            },
            name:'Method not found', 
            id:req.body.id 
            })
        }
    } else if(req.body.method.split('.')[0] === 'form_fields') {
        try {
            rpcApi.form_fields[req.body.method.split('.')[1]](req.body.params, req.body.id, function (err, result) {
                if(err) throw new Error(err);
                res.json({jsonrpc: '2.0', result: result, id:req.body.id});
            })
        } catch(error) {
            res.json({
                error: {
                code: -32601,
                message:`Not found method:${req.body.method}`,
            },
            name:'Method not found', 
            id:req.body.id 
            })
        }
    } else if(req.body.method.split('.')[0] === 'form') {
        try {
            rpcApi.form[req.body.method.split('.')[1]](req.body.params, function (err, result) {
                if(err) throw new Error(err);
                res.json({jsonrpc: '2.0', result: result, id:req.body.id});
            })
        } catch(error) {
            res.json({
                error: {
                code: -32601,
                message:`Not found method:${req.body.method}`,
            },
            name:'Method not found', 
            id:req.body.id 
            })
        }
    } else {
        res.json({
            error: {
                code: -32601,
                message:`Not found method:${req.body.method}`,
            },
            name:'Method not found', 
            id:req.body.id 
        });
    }
})

module.exports = router;