<?php
    include('database.php');

    $query = "SELECT * FROM task";
    $result = mysqli_query($conn,$query);

    if (!$result) {
        die('Error');
    }
    else
    {
        $json = array();
        while ($row = mysqli_fetch_array($result)) {
            $json[] = array(
                'id'=>$row['id'],
                'name'=>$row['name'],
                'description'=>$row['description']
            );
        }

        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>