<?php

/**
 * @Entity
 * @Table(name="match_player_statistics", uniqueConstraints={@UniqueConstraint(columns={"player_id", "match_id"})})
 */
class MatchPlayerStatistics
{
    /**
     * @Id
     * @Column(type="integer", options={"unsigned"=true})
     * @GeneratedValue
     * @var int
     */
    protected $id;
    
    /**
     * @ManyToOne(targetEntity="Player")
     * @var Player
     */
    protected $player;
    
    /**
     * @ManyToOne(targetEntity="Match")
     * @var Match
     */
    protected $match;
    
    /**
     * @Column(type="string", length=32, name="position_text")
     * @var string
     */
    protected $positionText;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="shirt_no")
     * @var int
     */
    protected $shirtNo;
    
    /**
     * @Column(type="boolean", name="game_started")
     * @var boolean
     */
    protected $gameStarted;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="mins_played")
     * @var int
     */
    protected $minsPlayed;
    
    /**
     * @Column(type="boolean", name="man_of_the_match")
     * @var boolean
     */
    protected $manOfTheMatch;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="substitution_type")
     * @var int
     */
    protected $substitutionType;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="substitution_minute")
     * @var int
     */
    protected $substitutionMinute;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="formation_place")
     * @var int
     */
    protected $formationPlace;
    
    /**
     * @Column(type="decimal", precision=4, scale=2, name="overall_rating")
     * @var float
     */
    protected $overall_rating;
    
    /**
     * @Column(type="decimal", precision=4, scale=2, name="offensive_rating")
     * @var float
     */
    protected $offensive_rating;
    
    /**
     * @Column(type="decimal", precision=4, scale=2, name="defensive_rating")
     * @var float
     */
    protected $defensive_rating;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="goals_scored")
     * @var int
     */
    protected $goalsScored;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="assists")
     * @var int
     */
    protected $assists;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="total_shots")
     * @var int
     */
    protected $totalShots;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="shots_on_target")
     * @var int
     */
    protected $shotsOnTarget;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="total_passes")
     * @var int
     */
    protected $totalPasses;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="accurate_passes")
     * @var int
     */
    protected $accuratePasses;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="duel_won")
     * @var int
     */
    protected $duelWon;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="duel_lost")
     * @var int
     */
    protected $duelLost;

    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="aerial_won")
     * @var int
     */
    protected $aerialWon;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="aerial_lost")
     * @var int
     */
    protected $aerialLost;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="touches")
     * @var int
     */
    protected $touches;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="total_tackles")
     * @var int
     */
    protected $totalTackles;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="key_passes")
     * @var int
     */
    protected $keyPasses;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="interceptions")
     * @var int
     */
    protected $interceptions;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="total_clearances")
     * @var int
     */
    protected $totalClearances;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="effective_clearances")
     * @var int
     */
    protected $effectiveClearances;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="shots_blocked")
     * @var int
     */
    protected $shotsBlocked;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="offsides_provoked")
     * @var int
     */
    protected $offsidesProvoked;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="fouls")
     * @var int
     */
    protected $fouls;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="won_contests")
     * @var int
     */
    protected $wonContests;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="was_fouled")
     * @var int
     */
    protected $wasFouled;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="dispossessed")
     * @var int
     */
    protected $dispossessed;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="turnovers")
     * @var int
     */
    protected $turnovers;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="offsides")
     * @var int
     */
    protected $offsides;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="total_crosses")
     * @var int
     */
    protected $totalCrosses;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="accurate_crosses")
     * @var int
     */
    protected $accurateCrosses;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="total_long_balls")
     * @var int
     */
    protected $totalLongBalls;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="accurate_long_balls")
     * @var int
     */
    protected $accurateLongBalls;
    
/**
     * @Column(type="smallint", options={"unsigned"=true}, name="total_through_balls")
     * @var int
     */
    protected $totalThroughBalls;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="accurate_through_balls")
     * @var int
     */
    protected $accurateThroughBalls;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="saves")
     * @var int
     */
    protected $saves;

    /**
     * Get id
     *
     * @return int 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set positionText
     *
     * @param string $positionText
     * @return MatchPlayerStatistics
     */
    public function setPositionText($positionText)
    {
        $this->positionText = $positionText;
    
        return $this;
    }

    /**
     * Get positionText
     *
     * @return string 
     */
    public function getPositionText()
    {
        return $this->positionText;
    }

    /**
     * Set shirtNo
     *
     * @param int $shirtNo
     * @return MatchPlayerStatistics
     */
    public function setShirtNo($shirtNo)
    {
        $this->shirtNo = $shirtNo;
    
        return $this;
    }

    /**
     * Get shirtNo
     *
     * @return int 
     */
    public function getShirtNo()
    {
        return $this->shirtNo;
    }

    /**
     * Set gameStarted
     *
     * @param boolean $gameStarted
     * @return MatchPlayerStatistics
     */
    public function setGameStarted($gameStarted)
    {
        $this->gameStarted = $gameStarted;
    
        return $this;
    }

    /**
     * Get gameStarted
     *
     * @return boolean 
     */
    public function getGameStarted()
    {
        return $this->gameStarted;
    }

    /**
     * Set minsPlayed
     *
     * @param int $minsPlayed
     * @return MatchPlayerStatistics
     */
    public function setMinsPlayed($minsPlayed)
    {
        $this->minsPlayed = $minsPlayed;
    
        return $this;
    }

    /**
     * Get minsPlayed
     *
     * @return int 
     */
    public function getMinsPlayed()
    {
        return $this->minsPlayed;
    }

    /**
     * Set manOfTheMatch
     *
     * @param boolean $manOfTheMatch
     * @return MatchPlayerStatistics
     */
    public function setManOfTheMatch($manOfTheMatch)
    {
        $this->manOfTheMatch = $manOfTheMatch;
    
        return $this;
    }

    /**
     * Get manOfTheMatch
     *
     * @return boolean 
     */
    public function getManOfTheMatch()
    {
        return $this->manOfTheMatch;
    }

    /**
     * Set substitutionType
     *
     * @param int $substitutionType
     * @return MatchPlayerStatistics
     */
    public function setSubstitutionType($substitutionType)
    {
        $this->substitutionType = $substitutionType;
    
        return $this;
    }

    /**
     * Get substitutionType
     *
     * @return int 
     */
    public function getSubstitutionType()
    {
        return $this->substitutionType;
    }

    /**
     * Set substitutionMinute
     *
     * @param int $substitutionMinute
     * @return MatchPlayerStatistics
     */
    public function setSubstitutionMinute($substitutionMinute)
    {
        $this->substitutionMinute = $substitutionMinute;
    
        return $this;
    }

    /**
     * Get substitutionMinute
     *
     * @return int 
     */
    public function getSubstitutionMinute()
    {
        return $this->substitutionMinute;
    }

    /**
     * Set formationPlace
     *
     * @param int $formationPlace
     * @return MatchPlayerStatistics
     */
    public function setFormationPlace($formationPlace)
    {
        $this->formationPlace = $formationPlace;
    
        return $this;
    }

    /**
     * Get formationPlace
     *
     * @return int 
     */
    public function getFormationPlace()
    {
        return $this->formationPlace;
    }

    /**
     * Set overall_rating
     *
     * @param float $overallRating
     * @return MatchPlayerStatistics
     */
    public function setOverallRating($overallRating)
    {
        $this->overall_rating = $overallRating;
    
        return $this;
    }

    /**
     * Get overall_rating
     *
     * @return float 
     */
    public function getOverallRating()
    {
        return $this->overall_rating;
    }

    /**
     * Set offensive_rating
     *
     * @param float $offensiveRating
     * @return MatchPlayerStatistics
     */
    public function setOffensiveRating($offensiveRating)
    {
        $this->offensive_rating = $offensiveRating;
    
        return $this;
    }

    /**
     * Get offensive_rating
     *
     * @return float 
     */
    public function getOffensiveRating()
    {
        return $this->offensive_rating;
    }

    /**
     * Set defensive_rating
     *
     * @param float $defensiveRating
     * @return MatchPlayerStatistics
     */
    public function setDefensiveRating($defensiveRating)
    {
        $this->defensive_rating = $defensiveRating;
    
        return $this;
    }

    /**
     * Get defensive_rating
     *
     * @return float 
     */
    public function getDefensiveRating()
    {
        return $this->defensive_rating;
    }

    /**
     * Set goalsScored
     *
     * @param int $goalsScored
     * @return MatchPlayerStatistics
     */
    public function setGoalsScored($goalsScored)
    {
        $this->goalsScored = $goalsScored;
    
        return $this;
    }

    /**
     * Get goalsScored
     *
     * @return int 
     */
    public function getGoalsScored()
    {
        return $this->goalsScored;
    }

    /**
     * Set assists
     *
     * @param int $assists
     * @return MatchPlayerStatistics
     */
    public function setAssists($assists)
    {
        $this->assists = $assists;
    
        return $this;
    }

    /**
     * Get assists
     *
     * @return int 
     */
    public function getAssists()
    {
        return $this->assists;
    }

    /**
     * Set totalShots
     *
     * @param int $totalShots
     * @return MatchPlayerStatistics
     */
    public function setTotalShots($totalShots)
    {
        $this->totalShots = $totalShots;
    
        return $this;
    }

    /**
     * Get totalShots
     *
     * @return int 
     */
    public function getTotalShots()
    {
        return $this->totalShots;
    }

    /**
     * Set shotsOnTarget
     *
     * @param int $shotsOnTarget
     * @return MatchPlayerStatistics
     */
    public function setShotsOnTarget($shotsOnTarget)
    {
        $this->shotsOnTarget = $shotsOnTarget;
    
        return $this;
    }

    /**
     * Get shotsOnTarget
     *
     * @return int 
     */
    public function getShotsOnTarget()
    {
        return $this->shotsOnTarget;
    }

    /**
     * Set totalPasses
     *
     * @param int $totalPasses
     * @return MatchPlayerStatistics
     */
    public function setTotalPasses($totalPasses)
    {
        $this->totalPasses = $totalPasses;
    
        return $this;
    }

    /**
     * Get totalPasses
     *
     * @return int 
     */
    public function getTotalPasses()
    {
        return $this->totalPasses;
    }

    /**
     * Set accuratePasses
     *
     * @param int $accuratePasses
     * @return MatchPlayerStatistics
     */
    public function setAccuratePasses($accuratePasses)
    {
        $this->accuratePasses = $accuratePasses;
    
        return $this;
    }

    /**
     * Get accuratePasses
     *
     * @return int 
     */
    public function getAccuratePasses()
    {
        return $this->accuratePasses;
    }

    /**
     * Set duelWon
     *
     * @param int $duelWon
     * @return MatchPlayerStatistics
     */
    public function setDuelWon($duelWon)
    {
        $this->duelWon = $duelWon;
    
        return $this;
    }

    /**
     * Get duelWon
     *
     * @return int 
     */
    public function getDuelWon()
    {
        return $this->duelWon;
    }

    /**
     * Set duelLost
     *
     * @param int $duelLost
     * @return MatchPlayerStatistics
     */
    public function setDuelLost($duelLost)
    {
        $this->duelLost = $duelLost;
    
        return $this;
    }

    /**
     * Get duelLost
     *
     * @return int 
     */
    public function getDuelLost()
    {
        return $this->duelLost;
    }

    /**
     * Set aerialWon
     *
     * @param int $aerialWon
     * @return MatchPlayerStatistics
     */
    public function setAerialWon($aerialWon)
    {
        $this->aerialWon = $aerialWon;
    
        return $this;
    }

    /**
     * Get aerialWon
     *
     * @return int 
     */
    public function getAerialWon()
    {
        return $this->aerialWon;
    }

    /**
     * Set aerialLost
     *
     * @param int $aerialLost
     * @return MatchPlayerStatistics
     */
    public function setAerialLost($aerialLost)
    {
        $this->aerialLost = $aerialLost;
    
        return $this;
    }

    /**
     * Get aerialLost
     *
     * @return int 
     */
    public function getAerialLost()
    {
        return $this->aerialLost;
    }

    /**
     * Set touches
     *
     * @param int $touches
     * @return MatchPlayerStatistics
     */
    public function setTouches($touches)
    {
        $this->touches = $touches;
    
        return $this;
    }

    /**
     * Get touches
     *
     * @return int 
     */
    public function getTouches()
    {
        return $this->touches;
    }

    /**
     * Set totalTackles
     *
     * @param int $totalTackles
     * @return MatchPlayerStatistics
     */
    public function setTotalTackles($totalTackles)
    {
        $this->totalTackles = $totalTackles;
    
        return $this;
    }

    /**
     * Get totalTackles
     *
     * @return int 
     */
    public function getTotalTackles()
    {
        return $this->totalTackles;
    }

    /**
     * Set keyPasses
     *
     * @param int $keyPasses
     * @return MatchPlayerStatistics
     */
    public function setKeyPasses($keyPasses)
    {
        $this->keyPasses = $keyPasses;
    
        return $this;
    }

    /**
     * Get keyPasses
     *
     * @return int 
     */
    public function getKeyPasses()
    {
        return $this->keyPasses;
    }

    /**
     * Set interceptions
     *
     * @param int $interceptions
     * @return MatchPlayerStatistics
     */
    public function setInterceptions($interceptions)
    {
        $this->interceptions = $interceptions;
    
        return $this;
    }

    /**
     * Get interceptions
     *
     * @return int 
     */
    public function getInterceptions()
    {
        return $this->interceptions;
    }

    /**
     * Set totalClearances
     *
     * @param int $totalClearances
     * @return MatchPlayerStatistics
     */
    public function setTotalClearances($totalClearances)
    {
        $this->totalClearances = $totalClearances;
    
        return $this;
    }

    /**
     * Get totalClearances
     *
     * @return int 
     */
    public function getTotalClearances()
    {
        return $this->totalClearances;
    }

    /**
     * Set effectiveClearances
     *
     * @param int $effectiveClearances
     * @return MatchPlayerStatistics
     */
    public function setEffectiveClearances($effectiveClearances)
    {
        $this->effectiveClearances = $effectiveClearances;
    
        return $this;
    }

    /**
     * Get effectiveClearances
     *
     * @return int 
     */
    public function getEffectiveClearances()
    {
        return $this->effectiveClearances;
    }

    /**
     * Set shotsBlocked
     *
     * @param int $shotsBlocked
     * @return MatchPlayerStatistics
     */
    public function setShotsBlocked($shotsBlocked)
    {
        $this->shotsBlocked = $shotsBlocked;
    
        return $this;
    }

    /**
     * Get shotsBlocked
     *
     * @return int 
     */
    public function getShotsBlocked()
    {
        return $this->shotsBlocked;
    }

    /**
     * Set offsidesProvoked
     *
     * @param int $offsidesProvoked
     * @return MatchPlayerStatistics
     */
    public function setOffsidesProvoked($offsidesProvoked)
    {
        $this->offsidesProvoked = $offsidesProvoked;
    
        return $this;
    }

    /**
     * Get offsidesProvoked
     *
     * @return int 
     */
    public function getOffsidesProvoked()
    {
        return $this->offsidesProvoked;
    }

    /**
     * Set fouls
     *
     * @param int $fouls
     * @return MatchPlayerStatistics
     */
    public function setFouls($fouls)
    {
        $this->fouls = $fouls;
    
        return $this;
    }

    /**
     * Get fouls
     *
     * @return int 
     */
    public function getFouls()
    {
        return $this->fouls;
    }

    /**
     * Set wonContests
     *
     * @param int $wonContests
     * @return MatchPlayerStatistics
     */
    public function setWonContests($wonContests)
    {
        $this->wonContests = $wonContests;
    
        return $this;
    }

    /**
     * Get wonContests
     *
     * @return int 
     */
    public function getWonContests()
    {
        return $this->wonContests;
    }

    /**
     * Set wasFouled
     *
     * @param int $wasFouled
     * @return MatchPlayerStatistics
     */
    public function setWasFouled($wasFouled)
    {
        $this->wasFouled = $wasFouled;
    
        return $this;
    }

    /**
     * Get wasFouled
     *
     * @return int 
     */
    public function getWasFouled()
    {
        return $this->wasFouled;
    }

    /**
     * Set dispossessed
     *
     * @param int $dispossessed
     * @return MatchPlayerStatistics
     */
    public function setDispossessed($dispossessed)
    {
        $this->dispossessed = $dispossessed;
    
        return $this;
    }

    /**
     * Get dispossessed
     *
     * @return int 
     */
    public function getDispossessed()
    {
        return $this->dispossessed;
    }

    /**
     * Set turnovers
     *
     * @param int $turnovers
     * @return MatchPlayerStatistics
     */
    public function setTurnovers($turnovers)
    {
        $this->turnovers = $turnovers;
    
        return $this;
    }

    /**
     * Get turnovers
     *
     * @return int 
     */
    public function getTurnovers()
    {
        return $this->turnovers;
    }

    /**
     * Set offsides
     *
     * @param int $offsides
     * @return MatchPlayerStatistics
     */
    public function setOffsides($offsides)
    {
        $this->offsides = $offsides;
    
        return $this;
    }

    /**
     * Get offsides
     *
     * @return int 
     */
    public function getOffsides()
    {
        return $this->offsides;
    }

    /**
     * Set totalCrosses
     *
     * @param int $totalCrosses
     * @return MatchPlayerStatistics
     */
    public function setTotalCrosses($totalCrosses)
    {
        $this->totalCrosses = $totalCrosses;
    
        return $this;
    }

    /**
     * Get totalCrosses
     *
     * @return int 
     */
    public function getTotalCrosses()
    {
        return $this->totalCrosses;
    }

    /**
     * Set accurateCrosses
     *
     * @param int $accurateCrosses
     * @return MatchPlayerStatistics
     */
    public function setAccurateCrosses($accurateCrosses)
    {
        $this->accurateCrosses = $accurateCrosses;
    
        return $this;
    }

    /**
     * Get accurateCrosses
     *
     * @return int 
     */
    public function getAccurateCrosses()
    {
        return $this->accurateCrosses;
    }

    /**
     * Set totalLongBalls
     *
     * @param int $totalLongBalls
     * @return MatchPlayerStatistics
     */
    public function setTotalLongBalls($totalLongBalls)
    {
        $this->totalLongBalls = $totalLongBalls;
    
        return $this;
    }

    /**
     * Get totalLongBalls
     *
     * @return int 
     */
    public function getTotalLongBalls()
    {
        return $this->totalLongBalls;
    }

    /**
     * Set accurateLongBalls
     *
     * @param int $accurateLongBalls
     * @return MatchPlayerStatistics
     */
    public function setAccurateLongBalls($accurateLongBalls)
    {
        $this->accurateLongBalls = $accurateLongBalls;
    
        return $this;
    }

    /**
     * Get accurateLongBalls
     *
     * @return int 
     */
    public function getAccurateLongBalls()
    {
        return $this->accurateLongBalls;
    }

    /**
     * Set totalThroughBalls
     *
     * @param int $totalThroughBalls
     * @return MatchPlayerStatistics
     */
    public function setTotalThroughBalls($totalThroughBalls)
    {
        $this->totalThroughBalls = $totalThroughBalls;
    
        return $this;
    }

    /**
     * Get totalThroughBalls
     *
     * @return int 
     */
    public function getTotalThroughBalls()
    {
        return $this->totalThroughBalls;
    }

    /**
     * Set accurateThroughBalls
     *
     * @param int $accurateThroughBalls
     * @return MatchPlayerStatistics
     */
    public function setAccurateThroughBalls($accurateThroughBalls)
    {
        $this->accurateThroughBalls = $accurateThroughBalls;
    
        return $this;
    }

    /**
     * Get accurateThroughBalls
     *
     * @return int 
     */
    public function getAccurateThroughBalls()
    {
        return $this->accurateThroughBalls;
    }

    /**
     * Set saves
     *
     * @param int $saves
     * @return MatchPlayerStatistics
     */
    public function setSaves($saves)
    {
        $this->saves = $saves;
    
        return $this;
    }

    /**
     * Get saves
     *
     * @return int 
     */
    public function getSaves()
    {
        return $this->saves;
    }

    /**
     * Set player
     *
     * @param Player $player
     * @return MatchPlayerStatistics
     */
    public function setPlayer(Player $player)
    {
        $this->player = $player;
    
        return $this;
    }

    /**
     * Get player
     *
     * @return Player 
     */
    public function getPlayer()
    {
        return $this->player;
    }

    /**
     * Set match
     *
     * @param Match $match
     * @return MatchPlayerStatistics
     */
    public function setMatch(Match $match)
    {
        $this->match = $match;
    
        return $this;
    }

    /**
     * Get match
     *
     * @return Match 
     */
    public function getMatch()
    {
        return $this->match;
    }
}