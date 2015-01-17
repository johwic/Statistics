<?php

require_once 'bootstrap.php';

$url = Url::get('regionteams', array('id' => $_GET['regionId']));
$request = new Request($url);
if ( $request->execute() == 200 ) {
    $result = $request->process('array');
    unset($request);
} else {
    $errors = $request->getErrors();
    unset($request);
    die($errors['errno'] . ' - ' . $errors['error'] . ' (' . $errors['status_code'] . ')');
}

foreach ( $result as $team ) {
    $ret = new Team();
    $ret->setWsId($team[0]);
    $ret->setName($team[1]);
    $entityManager->persist($ret);
    unset($ret);
}

$entityManager->flush();

echo 'Success! \n';