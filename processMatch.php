<?php

require_once 'bootstrap.php';

$matchId = $_GET['matchId'];
$stageId = $_GET['stageId'];

$matchData = load('match-centre2', array('id' => $matchId), 'json', 'raw_data/' . $stageId . '/' . $matchId . '/match-centre2.json');
//r($matchData->events);
//die();
$statBuilder = new StatBuilder($matchId, $stageId);
foreach ($matchData->events as $event) {
    $statBuilder->add($event);
}

$statBuilder->finalize();

r($statBuilder->getPlayerStats());