<?php

require_once 'bootstrap.php';

//$stage = $entityManager->getRepository('Stage')->findOneByWsId($_GET['stageId']);

$url = Url::get('stagefixtures', array('stageId' => $_GET['stageId'], 'd' => $_GET['date'], 'isAggregate' => false));
$request = new Request($url);
if ( $request->execute() == 200 ) {
    $result = $request->process('array');
    unset($request);
} else {
    $errors = $request->getErrors();
    unset($request);
    die($errors['errno'] . ' - ' . $errors['error'] . ' (' . $errors['status_code'] . ')');
}

foreach ( $result as $fixture ) {
    $matchId = $fixture[0];

    if ( is_dir('raw_data/9155/' . $matchId)) {
        continue;
    }
    $url = URL::get('match-live-update', array('id' => $matchId));
    $request = new Request($url);

    if ( $request->execute() == 200 ) {
        $result = $request->process();
        unset($request);
    } else {
        $errors = $request->getErrors();
        unset($request);
        die($errors['errno'] . ' - ' . $errors['error'] . ' (' . $errors['status_code'] . ')');
    }

    file_force_contents('raw_data/' . $_GET['stageId'] . '/' . $matchId . '/match_incidents.array', $result);

    $url = URL::get('live-player-stats', array('id' => $matchId));
    $request = new Request($url);

    if ( $request->execute() == 200 ) {
        $result = $request->process();
        unset($request);
    } else {
        $errors = $request->getErrors();
        unset($request);
        die($errors['errno'] . ' - ' . $errors['error'] . ' (' . $errors['status_code'] . ')');
    }

    file_force_contents('raw_data/' . $_GET['stageId'] . '/' . $matchId . '/stats.array', $result);

    $url = URL::get('match-centre2', array('id' => $matchId));
    $request = new Request($url);

    if ( $request->execute() == 200 ) {
        $result = $request->process();
        unset($request);
    } else {
        $errors = $request->getErrors();
        unset($request);
        die($errors['errno'] . ' - ' . $errors['error'] . ' (' . $errors['status_code'] . ')');
    }

    file_force_contents('raw_data/' . $_GET['stageId'] . '/' . $matchId . '/match-centre2.json', $result);

    echo $matchId . "\n";
    sleep(3);
}

echo "Success!\n";
