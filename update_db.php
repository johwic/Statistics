<?php

require_once 'bootstrap.php';

//$matchId = $_GET['matchId'];
$stageId = $_GET['stageId'];

$matches = array_diff(scandir('raw_data/' . $stageId . '/'), array('..', '.'));

$stage = $entityManager->getRepository('Stage')->findOneByWsId($stageId);

foreach ( $matches as $matchId ) {

    $stats = load('live-player-stats', array('id' => $matchId), 'array', 'raw_data/' . $stageId . '/' . $matchId . '/stats.array');
    $incidents = load('match-live-update', array('id' => $matchId), 'array', 'raw_data/' . $stageId . '/' . $matchId . '/match_incidents.array');
    $corners = load('match-centre2', array('id' => $matchId), 'json', 'raw_data/' . $stageId . '/' . $matchId . '/match-centre2.json');

    $homeTeam = $entityManager->getRepository('Team')->findOneByWsId($corners->home->teamId);
    $awayTeam = $entityManager->getRepository('Team')->findOneByWsId($corners->away->teamId);

    $match = new Match();
    $match->setStage($stage);
    $match->setWsId($matchId);
    $time = DateTime::createFromFormat('m/d/Y H:i:s', $corners->startTime, new DateTimeZone('UTC'))->getTimestamp();
    $match->setTime($time);
    $match->setHomeTeam($homeTeam);
    $match->setAwayTeam($awayTeam);

    if ($time > time()) {
        $match->setStatus(0);
        $entityManager->persist($match);
        $entityManager->flush();

        echo 'Done.';
    } else {
        $match->setStatus(1);
        $players = array_merge($stats[0][1][0][4], $stats[0][1][1][4]);
        $events = $incidents[0][1][0];
        $homeTeamStats = $stats[0][1][0][3][0];
        $awayTeamStats = $stats[0][1][1][3][0];

        echo "Adding player statistics...";

        foreach ($players as $player) {
            $p = $entityManager->getRepository('Player')->findOneByWsId($player[0]);
            if ($p == null) {
                $params = array('playerId' => $player[0],
                    'category' => 'summary',
                    'field' => 'Overall',
                    'subcategory' => 'all',
                    'statsAccumulationType' => 0,
                    'includeZeroValues' => 'true',
                    'isCurrent' => 'false');

                $playerData = load('player-stats', $params, 'json', 'raw_data/players/' . $player[0] . '.json');
                $p = new Player();
                if ( isset($playerData->playerTableStats[0]) ) {
                    $p->setFirstName($playerData->playerTableStats[0]->firstName);
                    $p->setLastName($playerData->playerTableStats[0]->lastName);
                    $p->setKnownName($playerData->playerTableStats[0]->name);
                    $p->setAge($playerData->playerTableStats[0]->age);
                    $p->setWsId($player[0]);
                } else {
                    $p->setFirstName($player[1]);
                    $p->setLastName($player[1]);
                    $p->setKnownName($player[1]);
                    $p->setAge(0);
                    $p->setWsId($player[0]);
                }
                $entityManager->persist($p);
                unset($playerData);
            }

            $pStats = $player[3][0];

            $mps = new MatchPlayerStatistics();
            $mps->setAccurateCrosses(getStatValue($pStats, 'accurate_cross'));
            $mps->setAccurateLongBalls(getStatValue($pStats, 'accurate_long_ball'));
            $mps->setAccuratePasses(getStatValue($pStats, 'accurate_pass'));
            $mps->setAccurateThroughBalls(getStatValue($pStats, 'accurate_through_ball'));
            $mps->setAerialLost(getStatValue($pStats, 'aerial_lost'));
            $mps->setAerialWon(getStatValue($pStats, 'aerial_won'));
            $mps->setAssists(getStatValue($pStats, 'goals_assist'));
            $mps->setDefensiveRating(getStatValue($pStats, 'rating_defensive'));
            $mps->setDispossessed(getStatValue($pStats, 'dispossessed'));
            $mps->setDuelLost(getStatValue($pStats, 'duel_lost'));
            $mps->setDuelWon(getStatValue($pStats, 'duel_won'));
            $mps->setEffectiveClearances(getStatValue($pStats, 'effective_clearance'));
            $mps->setFormationPlace(getStatValue($pStats, 'formation_place'));
            $mps->setFouls(getStatValue($pStats, 'fouls'));
            $mps->setGameStarted(getStatValue($pStats, 'game_started'));
            $mps->setGoalsScored(getStatValue($pStats, 'goals'));
            $mps->setInterceptions(getStatValue($pStats, 'interception'));
            $mps->setKeyPasses(getStatValue($pStats, 'total_att_assist'));
            $mps->setManOfTheMatch(getStatValue($pStats, 'man_of_the_match'));
            $mps->setMatch($match);
            $mps->setMinsPlayed(getStatValue($pStats, 'mins_played'));
            $mps->setOffensiveRating(getStatValue($pStats, 'rating_offensive'));
            $mps->setOffsides(getStatValue($pStats, 'total_offside'));
            $mps->setOffsidesProvoked(getStatValue($pStats, 'offside_provoked'));
            $mps->setOverallRating(getStatValue($pStats, 'rating'));
            $mps->setPlayer($p);
            $mps->setPositionText($player[5]);
            $mps->setSaves(getStatValue($pStats, 'saves'));
            $mps->setShirtNo($player[6]);
            $mps->setShotsBlocked(getStatValue($pStats, 'outfielder_block'));
            $mps->setShotsOnTarget(getStatValue($pStats, 'ontarget_scoring_att'));
            $mps->setSubstitutionMinute($player[8]);
            $mps->setSubstitutionType($player[7]);
            $mps->setTotalClearances(getStatValue($pStats, 'total_clearance'));
            $mps->setTotalCrosses(getStatValue($pStats, 'total_cross'));
            $mps->setTotalLongBalls(getStatValue($pStats, 'total_long_balls'));
            $mps->setTotalPasses(getStatValue($pStats, 'total_pass'));
            $mps->setTotalShots(getStatValue($pStats, 'total_scoring_att'));
            $mps->setTotalTackles(getStatValue($pStats, 'total_tackle'));
            $mps->setTotalThroughBalls(getStatValue($pStats, 'total_through_ball'));
            $mps->setTouches(getStatValue($pStats, 'touches'));
            $mps->setTurnovers(getStatValue($pStats, 'turnover'));
            $mps->setWasFouled(getStatValue($pStats, 'was_fouled'));
            $mps->setWonContests(getStatValue($pStats, 'won_contest'));

            $entityManager->persist($mps);
        }

        $entityManager->persist($match);
        $entityManager->flush();

        echo "Done.\n Adding match statistics...";

        $hts = new MatchTeamStatistics();
        $hts->setAccurateCornersIntoBox(getStatValue($homeTeamStats, 'accurate_corners_into_box'));
        $hts->setAccuratePasses(getStatValue($homeTeamStats, 'accurate_pass'));
        $hts->setAerialLost(getStatValue($homeTeamStats, 'aerial_lost'));
        $hts->setAerialWon(getStatValue($homeTeamStats, 'aerial_won'));
        $hts->setCornersLost(getStatValue($homeTeamStats, 'lost_corners'));
        $hts->setCornersWon(getStatValue($homeTeamStats, 'won_corners'));
        $hts->setDefensiveRating(0);
        $hts->setDispossessed(getStatValue($homeTeamStats, 'dispossessed'));
        $hts->setDribbles(getStatValue($homeTeamStats, 'won_contest'));
        $hts->setFouls(getStatValue($homeTeamStats, 'fk_foul_lost'));
        $hts->setGoalsConceded(getStatValue($homeTeamStats, 'goals_conceded'));
        $hts->setGoalsScored(getStatValue($homeTeamStats, 'goals'));
        $hts->setInterceptions(getStatValue($homeTeamStats, 'interception'));
        $hts->setMatch($match);
        $hts->setOffensiveRating(0);
        $hts->setOffsides(getStatValue($homeTeamStats, 'total_offside'));
        $hts->setOverallRating($stats[0][1][0][2]);
        $hts->setPossession(getStatValue($homeTeamStats, 'possession_percentage'));
        $hts->setShotsBlocked(getStatValue($homeTeamStats, 'blocked_scoring_att'));
        $hts->setShotsConcededInBox(getStatValue($homeTeamStats, 'attempts_conceded_ibox'));
        $hts->setShotsConcededOutBox(getStatValue($homeTeamStats, 'attempts_conceded_obox'));
        $hts->setShotsOnTarget(getStatValue($homeTeamStats, 'ontarget_scoring_att'));
        $hts->setTeam($homeTeam);
        $hts->setThrows(getStatValue($homeTeamStats, 'total_throws'));
        $hts->setTotalClearances(getStatValue($homeTeamStats, 'total_clearance'));
        $hts->setTotalCornersIntoBox(getStatValue($homeTeamStats, 'total_corners_intobox'));
        $hts->setTotalPasses(getStatValue($homeTeamStats, 'total_pass'));
        $hts->setTotalShots(getStatValue($homeTeamStats, 'total_scoring_att'));
        $hts->setTotalTackles(getStatValue($homeTeamStats, 'total_tackle'));
        $hts->setWasFouled(getStatValue($homeTeamStats, 'fk_foul_won'));

        $q = $entityManager->createQuery('SELECT s FROM s \StageTeamStatistics WHERE s.stage_id = ' . $stageId . ' AND s.team_id = ' . $corners->home->teamId);
        $stageHome = $q->getFirstResult();
        if ($stageHome == null) {
            $stageHome = new StageTeamStatistics();
            $stageHome->setStage($stage);
            $stageHome->setTeam($homeTeam);
        }
        $stageHome->setAccurateCornersIntoBox($stageHome->getAccurateCornersIntoBox() + getStatValue($homeTeamStats, 'accurate_corners_into_box'));
        $stageHome->setAccuratePasses($stageHome->getAccuratePasses() + getStatValue($homeTeamStats, 'accurate_pass'));
        $stageHome->setAerialLost($stageHome->getAerialLost() + getStatValue($homeTeamStats, 'aerial_lost'));
        $stageHome->setAerialWon($stageHome->getAerialWon() + getStatValue($homeTeamStats, 'aerial_won'));
        $stageHome->setCornersLost($stageHome->getCornersLost() + getStatValue($homeTeamStats, 'lost_corners'));
        $stageHome->setCornersWon($stageHome->getCornersWon() + getStatValue($homeTeamStats, 'won_corners'));
        $stageHome->setDefensiveRating($stageHome->getDefensiveRating() + 0);
        $stageHome->setDispossessed($stageHome->getDispossessed() + getStatValue($homeTeamStats, 'dispossessed'));
        $stageHome->setDribbles($stageHome->getDribbles() + getStatValue($homeTeamStats, 'won_contest'));
        $stageHome->setFouls($stageHome->getFouls() + getStatValue($homeTeamStats, 'fk_foul_lost'));
        $stageHome->setGoalsConceded($stageHome->getGoalsConceded() + getStatValue($homeTeamStats, 'goals_conceded'));
        $stageHome->setGoalsScored($stageHome->getGoalsScored() + getStatValue($homeTeamStats, 'goals'));
        $stageHome->setInterceptions($stageHome->getInterceptions() + getStatValue($homeTeamStats, 'interception'));
        $stageHome->setMatchesPlayed($stageHome->getMatchesPlayed() + 1);
        $stageHome->setOffensiveRating($stageHome->getOffensiveRating() + 0);
        $stageHome->setOffsides($stageHome->getOffsides() + getStatValue($homeTeamStats, 'total_offside'));
        $stageHome->setOverallRating($stageHome->getOverallRating() + 0);
        $stageHome->setPossession($stageHome->getPossession() + getStatValue($homeTeamStats, 'possession_percentage'));
        $stageHome->setRedCards($stageHome->getRedCards() + 0);
        $stageHome->setSecondYellow($stageHome->getSecondYellow() + 0);
        $stageHome->setShotsBlocked($stageHome->getShotsBlocked() + getStatValue($homeTeamStats, 'blocked_scoring_att'));
        $stageHome->setShotsConcededInBox($stageHome->getShotsConcededInBox() + getStatValue($homeTeamStats, 'attempts_conceded_ibox'));
        $stageHome->setShotsConcededOutBox($stageHome->getShotsConcededOutBox() + getStatValue($homeTeamStats, 'attempts_conceded_obox'));
        $stageHome->setShotsOnTarget($stageHome->getShotsOnTarget() + getStatValue($homeTeamStats, 'ontarget_scoring_att'));
        $stageHome->setThrows($stageHome->getThrows() + getStatValue($homeTeamStats, 'total_throws'));
        $stageHome->setTotalClearances($stageHome->getTotalClearances() + getStatValue($homeTeamStats, 'total_clearance'));
        $stageHome->setTotalCornersIntoBox($stageHome->getTotalCornersIntoBox() + getStatValue($homeTeamStats, 'total_corners_intobox'));
        $stageHome->setTotalPasses($stageHome->getTotalPasses() + getStatValue($homeTeamStats, 'total_pass'));
        $stageHome->setTotalShots($stageHome->getTotalShots() + getStatValue($homeTeamStats, 'total_scoring_att'));
        $stageHome->setTotalTackles($stageHome->getTotalTackles() + getStatValue($homeTeamStats, 'total_tackle'));
        $stageHome->setWasFouled($stageHome->getWasFouled() + getStatValue($homeTeamStats, 'fk_foul_won'));
        $stageHome->setYellowCards($stageHome->getYellowCards() + 0);

        $ats = new MatchTeamStatistics();
        $ats->setAccurateCornersIntoBox(getStatValue($awayTeamStats, 'accurate_corners_into_box'));
        $ats->setAccuratePasses(getStatValue($awayTeamStats, 'accurate_pass'));
        $ats->setAerialLost(getStatValue($awayTeamStats, 'aerial_lost'));
        $ats->setAerialWon(getStatValue($awayTeamStats, 'aerial_won'));
        $ats->setCornersLost(getStatValue($awayTeamStats, 'lost_corners'));
        $ats->setCornersWon(getStatValue($awayTeamStats, 'won_corners'));
        $ats->setDefensiveRating(0);
        $ats->setDispossessed(getStatValue($awayTeamStats, 'dispossessed'));
        $ats->setDribbles(getStatValue($awayTeamStats, 'won_contest'));
        $ats->setFouls(getStatValue($awayTeamStats, 'fk_foul_lost'));
        $ats->setGoalsConceded(getStatValue($awayTeamStats, 'goals_conceded'));
        $ats->setGoalsScored(getStatValue($awayTeamStats, 'goals'));
        $ats->setInterceptions(getStatValue($awayTeamStats, 'interception'));
        $ats->setMatch($match);
        $ats->setOffensiveRating(0);
        $ats->setOffsides(getStatValue($awayTeamStats, 'total_offside'));
        $ats->setOverallRating($stats[0][1][0][2]);
        $ats->setPossession(getStatValue($awayTeamStats, 'possession_percentage'));
        $ats->setShotsBlocked(getStatValue($awayTeamStats, 'blocked_scoring_att'));
        $ats->setShotsConcededInBox(getStatValue($awayTeamStats, 'attempts_conceded_ibox'));
        $ats->setShotsConcededOutBox(getStatValue($awayTeamStats, 'attempts_conceded_obox'));
        $ats->setShotsOnTarget(getStatValue($awayTeamStats, 'ontarget_scoring_att'));
        $ats->setTeam($awayTeam);
        $ats->setThrows(getStatValue($awayTeamStats, 'total_throws'));
        $ats->setTotalClearances(getStatValue($awayTeamStats, 'total_clearance'));
        $ats->setTotalCornersIntoBox(getStatValue($awayTeamStats, 'total_corners_intobox'));
        $ats->setTotalPasses(getStatValue($awayTeamStats, 'total_pass'));
        $ats->setTotalShots(getStatValue($awayTeamStats, 'total_scoring_att'));
        $ats->setTotalTackles(getStatValue($awayTeamStats, 'total_tackle'));
        $ats->setWasFouled(getStatValue($awayTeamStats, 'fk_foul_won'));

        $q = $entityManager->createQuery('SELECT s FROM s \StageTeamStatistics WHERE s.stage_id = ' . $stageId . ' AND s.team_id = ' . $corners->away->teamId);
        $stageAway = $q->getFirstResult();
        if ($stageAway == null) {
            $stageAway = new StageTeamStatistics();
            $stageAway->setStage($stage);
            $stageAway->setTeam($awayTeam);
        }
        $stageAway->setAccurateCornersIntoBox($stageAway->getAccurateCornersIntoBox() + getStatValue($awayTeamStats, 'accurate_corners_into_box'));
        $stageAway->setAccuratePasses($stageAway->getAccuratePasses() + getStatValue($awayTeamStats, 'accurate_pass'));
        $stageAway->setAerialLost($stageAway->getAerialLost() + getStatValue($awayTeamStats, 'aerial_lost'));
        $stageAway->setAerialWon($stageAway->getAerialWon() + getStatValue($awayTeamStats, 'aerial_won'));
        $stageAway->setCornersLost($stageAway->getCornersLost() + getStatValue($awayTeamStats, 'lost_corners'));
        $stageAway->setCornersWon($stageAway->getCornersWon() + getStatValue($awayTeamStats, 'won_corners'));
        $stageAway->setDefensiveRating($stageAway->getDefensiveRating() + 0);
        $stageAway->setDispossessed($stageAway->getDispossessed() + getStatValue($awayTeamStats, 'dispossessed'));
        $stageAway->setDribbles($stageAway->getDribbles() + getStatValue($awayTeamStats, 'won_contest'));
        $stageAway->setFouls($stageAway->getFouls() + getStatValue($awayTeamStats, 'fk_foul_lost'));
        $stageAway->setGoalsConceded($stageAway->getGoalsConceded() + getStatValue($awayTeamStats, 'goals_conceded'));
        $stageAway->setGoalsScored($stageAway->getGoalsScored() + getStatValue($awayTeamStats, 'goals'));
        $stageAway->setInterceptions($stageAway->getInterceptions() + getStatValue($awayTeamStats, 'interception'));
        $stageAway->setMatchesPlayed($stageAway->getMatchesPlayed() + 1);
        $stageAway->setOffensiveRating($stageAway->getOffensiveRating() + 0);
        $stageAway->setOffsides($stageAway->getOffsides() + getStatValue($awayTeamStats, 'total_offside'));
        $stageAway->setOverallRating($stageAway->getOverallRating() + 0);
        $stageAway->setPossession($stageAway->getPossession() + getStatValue($awayTeamStats, 'possession_percentage'));
        $stageAway->setRedCards($stageAway->getRedCards() + 0);
        $stageAway->setSecondYellow($stageAway->getSecondYellow() + 0);
        $stageAway->setShotsBlocked($stageAway->getShotsBlocked() + getStatValue($awayTeamStats, 'blocked_scoring_att'));
        $stageAway->setShotsConcededInBox($stageAway->getShotsConcededInBox() + getStatValue($awayTeamStats, 'attempts_conceded_ibox'));
        $stageAway->setShotsConcededOutBox($stageAway->getShotsConcededOutBox() + getStatValue($awayTeamStats, 'attempts_conceded_obox'));
        $stageAway->setShotsOnTarget($stageAway->getShotsOnTarget() + getStatValue($awayTeamStats, 'ontarget_scoring_att'));
        $stageAway->setThrows($stageAway->getThrows() + getStatValue($awayTeamStats, 'total_throws'));
        $stageAway->setTotalClearances($stageAway->getTotalClearances() + getStatValue($awayTeamStats, 'total_clearance'));
        $stageAway->setTotalCornersIntoBox($stageAway->getTotalCornersIntoBox() + getStatValue($awayTeamStats, 'total_corners_intobox'));
        $stageAway->setTotalPasses($stageAway->getTotalPasses() + getStatValue($awayTeamStats, 'total_pass'));
        $stageAway->setTotalShots($stageAway->getTotalShots() + getStatValue($awayTeamStats, 'total_scoring_att'));
        $stageAway->setTotalTackles($stageAway->getTotalTackles() + getStatValue($awayTeamStats, 'total_tackle'));
        $stageAway->setWasFouled($stageAway->getWasFouled() + getStatValue($awayTeamStats, 'fk_foul_won'));
        $stageAway->setYellowCards($stageAway->getYellowCards() + 0);

        $entityManager->persist($hts);
        $entityManager->persist($stageHome);
        $entityManager->persist($ats);
        $entityManager->persist($stageAway);


        echo "Done.\n Adding match incidents...";

        foreach ($events AS $event) {
            if ($event[3]) {
                foreach ($event[1] AS $incident) {
                    $incidentType = $incident[2];
                    $info = ($incident[4]) ? $incident[4] : '';
                    $minute = $incident[5];
                    $player = $entityManager->getRepository('Player')->findOneByWsId($incident[6]);
                    $runningScore = ($incident[3]) ? $incident[3] : '';
                    if ($incident[7]) {
                        $participatingPlayer = $entityManager->getRepository('Player')->findOneByWsId($incident[7]);
                    } else {
                        $participatingPlayer = null;
                    }
                    $side = 1;

                    $matchIncident = new MatchEvent();
                    $matchIncident->setPlayer($player);
                    $matchIncident->setInfo($info);
                    $matchIncident->setEventType($incidentType);
                    $matchIncident->setMatch($match);
                    $matchIncident->setParticipatingPlayer($participatingPlayer);
                    $matchIncident->setSide($side);
                    $matchIncident->setMinute($minute);
                    $matchIncident->setRunningScore($runningScore);

                    $entityManager->persist($matchIncident);
                }
            }

            if ($event[4]) {
                foreach ($event[2] AS $incident) {
                    $incidentType = $incident[2];
                    $info = ($incident[4]) ? $incident[4] : '';
                    $minute = $incident[5];
                    $player = $entityManager->getRepository('player')->findOneByWsId($incident[6]);
                    $runningScore = ($incident[3]) ? $incident[3] : '';
                    if ($incident[7]) {
                        $participatingPlayer = $entityManager->getRepository('player')->findOneByWsId($incident[7]);
                    } else {
                        $participatingPlayer = NULL;
                    }
                    $side = 2;

                    $matchIncident = new MatchEvent();
                    $matchIncident->setPlayer($player);
                    $matchIncident->setInfo($info);
                    $matchIncident->setEventType($incidentType);
                    $matchIncident->setMatch($match);
                    $matchIncident->setParticipatingPlayer($participatingPlayer);
                    $matchIncident->setSide($side);
                    $matchIncident->setMinute($minute);
                    $matchIncident->setRunningScore($runningScore);

                    $entityManager->persist($matchIncident);
                }
            }
        }

        echo "Done.\n Adding corners...";

        foreach ($corners->events as $event) {
            if ($event->type->displayName == 'CornerAwarded' && $event->outcomeType->displayName == 'Successful') {
                $matchEvent = new MatchEvent();
                $player = $entityManager->getRepository('Player')->findOneByWsId($event->playerId);
                $side = ($event->teamId == $corners->home->teamId) ? 1 : 2;

                $matchIncident = new MatchEvent();
                $matchIncident->setPlayer($player);
                $matchIncident->setInfo($event->period->displayName);
                $matchIncident->setEventType('CornerAwarded');
                $matchIncident->setMatch($match);
                $matchIncident->setParticipatingPlayer(null);
                $matchIncident->setSide($side);
                $matchIncident->setMinute($event->minute + 1);
                $matchIncident->setRunningScore('');

                $entityManager->persist($matchIncident);
            }
        }

        $entityManager->flush();

        echo "Done. \n";
    }
}