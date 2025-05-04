

function validateuser (data) {
 
    const mendatoryFields = ['name', 'email', 'password'];
    const isvalied = mendatoryFields.every((field) => {
        return data[field] !== undefined && data[field] !== null && data[field] !== '';
    })
    // const isvalied = mendatoryFields.every( (field) => Object.keys(data).includes(field) )
    if(!isvalied){
        throw new Error('missing mendatory fields');
        
    }
}

module.exports = validateuser;