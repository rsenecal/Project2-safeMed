const { json } = require("body-parser");

function edit_patient(event){
    event.preventDefault();
    let response = await fetch('/api/patient/1', {
        method: 'PUT',
        body: JSON.stringify({}),
        headers: {'Content-Type':'application/json'}
    })
if (response.ok){
document.location('/dashboard')
}else {
alert('failed to delete patient')
}
}


aysnc function delete_patient(event){
    event.preventDefault();
    let response = await fetch('/api/patients/1',{
                                method: 'DELETE',
                                headers: {'Content-Type':'application/json'}
                            })
    if (response.ok){
        document.location('/dashboard')
    }else {
        alert('failed to delete patient')
    }

}
function reassign_patient(event){
    event.preventDefault();

}