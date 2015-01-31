<?php

require_once 'bootstrap.php';


//$params = array(
//    'field'         => 2,
//    'isAscending'   => 'false',
//    'orderBy'       => 'Rating',
//    'playerId'      => 28191,
//    'teamId'        => 15,
//    'stageId'       => -1
//);
//$url = URL::get('stage-player-stat', $params);

//$params = array(
//    'category'         => 'summary',
//    'subcategory'   => 'all',
//    'statsAccumulationType'       => 0,
//    'includeZeroValues'     => 'true',
//    'isCurrent'             => 'true',
//    'playerId'      => 33404,
//    'stageId'       => 9155,
//    'id'       => 829695,
//    'teamIds'       => 15
//);
//$url = URL::get('match-centre2', $params);
//$request = new Request($url);
//
//if ($request->execute() == 200) {
//    $result = $request->process('json');
//    unset($request);
//} else {
//    $errors = $request->getErrors();
//    unset($request);
//    die($errors['errno'] . ' - ' . $errors['error'] . ' (' . $errors['status_code'] . ')');
//}



$result = json_decode(file_get_contents('raw_data/9155/829695/match-centre2.json'));
r($result);

//$results = json_decode(file_get_contents('eventTypes.json'), true);
//ksort($results);
//r($results);
//$url = URL::get('stage-player-stat', array('playerId' => 82475, 'category' => 'summary', 'field' => 'Overall', 'subcategory' => 'all', 'statsAccumulationType' => 0, 'includeZeroValues' => 'true', 'isCurrent' => 'false'));
