var uploader = document.getElementById('uploader');
fileButton.addEventListener('change', function(e){

    for(let i =0;i<e.target.files.length;i++){
        let pdffile = e.target.files[i];
        

        let storageRef = firebase.storage().ref("pdf_lists/"+pdffile.name);
        
        let task = storageRef.put(pdffile);

        task.on('state_changed',function progress(snapshot){
            let percentage =snapshot.bytesTransferred / snapshot.totalBytes *100;
            uploader.value = percentage;
            console.log("upload is "+ percentage +"% done");
            switch(snapshot.state){
                case firebase.storage.TaskState.PAUSED:
                    console.log("upload is Paused");
                    break;
                
                case firebase.storage.TaskState.RUNNING:
                    console.log("upload is running");
                    break;
            }
        })
    }
});