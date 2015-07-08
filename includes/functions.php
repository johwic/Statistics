<?php

function getStatValue($stats, $type) {
    if (!$stats) {
        return 0;
    }
    foreach ( $stats as $stat ) {
        if ( $stat[0] == $type ) {
            return $stat[1][0];
        }
    }
    return 0;
}

function file_force_contents($dir, $contents){
    $parts = explode('/', $dir);
    $file = array_pop($parts);
    $dir = '';
    foreach($parts as $part)
        if(!is_dir($dir .= "$part/")) mkdir($dir);
    file_put_contents("$dir/$file", $contents);
}

function load($key, $attributes, $type, $path) {

    if ( !file_exists($path) ) {
        $url = URL::get($key, $attributes);
        $request = new Request($url);

        if ($request->execute() == 200) {
            $result = $request->process();
            unset($request);
        } else {
            $errors = $request->getErrors();
            unset($request);
            die($errors['errno'] . ' - ' . $errors['error'] . ' (' . $errors['status_code'] . ')');
        }

        file_force_contents($path, $result);
        sleep(1);
    } else {
        $result = file_get_contents($path);
    }

    if ( $type == 'array' ) {
        $array = eval('return ' . str_replace(array(',,', ',,'), array(',null,', ',null,'), $result) . ';');

        return $array;
    }
    else if ( $type == 'json' ) {
        return json_decode($result);
    }
    else {
        return $result;
    }
}