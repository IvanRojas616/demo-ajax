<?php
    include('database.php');
    if (isset($_POST['name'])) {
        $name = $_POST['name'];
        $desc = $_POST['description'];
        $query =  "INSERT INTO task(name, description) VALUES ('$name','$desc')";
        $result = mysqli_query($conn,$query);
        if (!$result) {
            die("Query Error" . $conn->error);
        }
        else
        {
            echo "Insert successfully";
        }
    }
?>