const formMain = document.getElementById('form-main');
const formAddFields = document.getElementById('form_add_fields');

const form_fields = [];

window.onload = function () {
    const addFieldBtn = document.getElementById('add-field-btn');
    const addFormBtn = document.getElementById('add-form-btn');

    addFieldBtn.addEventListener('click', function(e) {
        addFormBtn.removeAttribute('disabled');
    })
}

async function saveFormHandler(event) {
    try {
        event.preventDefault();
        const name = document.querySelector('[name="form_name"]').value;
        const uid = document.querySelector('[name="form_uid"]').value;
        
        const checkValidUuid = await getFormByUuid(uid);
        
        if(checkValidUuid.data.result) {
            document.body.insertAdjacentHTML("beforeend", `<div class="form-field" id="form_uid-error">
                <h3>Form_uid - должен быть уникальным!</h3>
            </div>`);
        } else {
            document.getElementById('form_uid-error').remove();
            await savedForm({form_uid: uid, form_name: name});
            await savedFields(uid);
        }
    } catch(error) {
        console.error(`saveFormHandler: ${error}`);
    }
}

async function saveFieldsHandler(event) {
    try {
        event.preventDefault();
        const field_name = document.querySelector('[name="field_name"]').value;
        const field_desc = document.querySelector('[name="description"]').value;
        const field_type = document.querySelector('[name="type_field"]').value;
        const type_field_id = await checkTypeField(field_type);
    
        form_fields.push({
            name: field_name,
            type: field_type,
            desc: field_desc,
            type_field_id: type_field_id
        });
    
        addFieldsInForm({name: field_name, type: field_type, desc: field_desc});
    } catch(error) {
        console.error(`saveFieldsHandler: ${error}`);
    }
}

async function getFormByUuid(uuid) {
    try {   
        return await axios.post(api.route, {
            "jsonrpc": "2.0",
            "method": "form.getFormByUuid",
            "params": {
                "form_uid": uuid
            }
        })
    } catch(error) {
        console.error(`getFormByUuid: ${error}`);
        return new Error(error);
    }
}

async function savedForm(parameters = {}) {
    try {
        const savedForm = await axios.post(api.route, {
            "jsonrpc": "2.0",
            "method": "form.saveForm",
            "params": {
                "form_uid": parameters.form_uid,
                "form_name": parameters.form_name
            }
        });
        return savedForm;
    } catch(error) {
        console.error(`savedForm: ${error}`);
        return new Error(error);
    }
}   

async function checkTypeField(type) {
    try {
        const typesFields = await axios.post(api.route, {
            "jsonrpc": "2.0",
            "method": "type_fields.getTypesFields",
            "params": {
                
            }
        })
    
        for(let i = 0; i < typesFields.data.result.length; i++) {
            if(typesFields.data.result[i].type_field === type) {
                return typesFields.data.result[i].id;
            }
        }
    
        return null;
    } catch(error) {
        console.error(`checkTypeField: ${error}`);
        return new Error(error);
    }
}

async function savedFields(form_uid) {
    try {
        for(let i = 0; i < form_fields.length; i++) {
            await axios.post(api.route, {
                "jsonrpc": "2.0",
                "method": "form_fields.saveFormFields",
                "params": {
                    "form_uid": form_uid,
                    "name_field": form_fields[i].name,
                    "description": form_fields[i].desc ? form_fields[i].desc : '',
                    "type_field_id": form_fields[i].type_field_id,
                }
            });
        }
    } catch(error) {
        console.error(`savedFields: ${error}`);
    }
}

function addFieldsInForm(field) {
    try {
        if(field.type === 'input') {
            document.body.insertAdjacentHTML("beforeend", `<div class="form-field">
                <p>${field.name}</p>
                <p>${field.desc}</p>
                <input type="text"/>
                <button onclick=deleteField(this)>Delete</button>
            </div>`);
        } else if(field.type === 'textarea') {
            document.body.insertAdjacentHTML("beforeend", `<div class="form-field">
                <p>${field.name}</p>
                <p>${field.desc}</p>
                <textarea></textarea>
                <button onclick=deleteField(this)>Delete</button>
            </div>`);
        } else if(field.type === 'select') {
            document.body.insertAdjacentHTML("beforeend", `<div class="form-field">
                <p>${field.name}</p>
                <p>${field.desc}</p>
                <select autofocus required></select>
                <button onclick=deleteField(this)>Delete</button>
            </div>`);
        }
    } catch(error) {
        console.error(`addFieldsInForm: ${error}`);
    }
}

function deleteField(el) {
    el.parentNode.remove();
}