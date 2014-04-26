<?php
    if($_FILES['file']['size'] > 0){
        
        if($_FILES['file']['size'] < 153600){
            
            if(move_uploaded_file($_FILES['file']['tmp_name'],"images/".$_FILES['file']["name"])){
                //uploads the file
                ?>
                //<script type="text/javascript">
                    parent.document.getElementById('message').innerHTML = "";
                    parent.document.getElementById('file').value = "";
                    window.parent.updatePicture("<?php echo 'images/'.$_FILES['file']["name"];?>")                    
                //</script>
                <?php
            }else{
                //upload failed
                ?>
                <script type="text/javascript">
                    parent.getElementById("message").innerHTML = "<font color='#ff0000'>There was an error uploading your message. Please try again.</font>"
                </script>
                <?php
            }
        } else{
            //the file is too big
            ?>
            <script type="text/javascript">
                parent.getElementById("message").innerHTML = "<font color='#ff0000'>Your picture is larger than 150kb. Please upload a different picture.</font>"
            </script>
            <?php
        }
    }
?>