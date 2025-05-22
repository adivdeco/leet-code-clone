

function validateuser (data) {
 
    const mendatoryFields = ['name', 'email', 'password'];
    const isvalied = mendatoryFields.every((field) => {
        return data[field] !== undefined && data[field] !== null && data[field] !== ''; // check if the field is not undefined, null or empty string
    })
    // const isvalied = mendatoryFields.every( (field) => Object.keys(data).includes(field) )
    if(!isvalied){
        throw new Error('missing mendatory fields');
        
    }
}

module.exports = validateuser;
const arr = ['name', 'email', 'password'];

if(arr.includes('name')){
    console.log('yes');
}
//here we are checking if the data object has all the mendatory fields