<?php

/**
 * @Entity
 * @Table(name="stage_team_statistics", uniqueConstraints={@UniqueConstraint(columns={"team_id", "stage_id"})})
 */
class StageTeamStatistics
{
    /**
     * @Id
     * @Column(type="integer", options={"unsigned"=true})
     * @GeneratedValue
     * @var int
     */
    protected $id;
    
    /**
     * @ManyToOne(targetEntity="Team")
     * @var Team
     */
    protected $team;
    
    /**
     * @ManyToOne(targetEntity="Stage")
     * @var Stage
     */
    protected $stage;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="matches_played")
     * @var int
     */
    protected $matchesPlayed;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="goals_scored")
     * @var int
     */
    protected $goalsScored;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="goals_conceded")
     * @var int
     */
    protected $goalsConceded;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="yellow_cards")
     * @var int
     */
    protected $yellowCards;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="red_cards")
     * @var int
     */
    protected $redCards;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="second_yellow")
     * @var int
     */
    protected $secondYellow;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="possession")
     * @var int
     */
    protected $possession;
    
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
     * @Column(type="decimal", precision=4, scale=2, name="overall_rating")
     * @var float
     */
    protected $overallRating;
    
    /**
     * @Column(type="decimal", precision=4, scale=2, name="defensive_rating")
     * @var float
     */
    protected $defensiveRating;
    
    /**
     * @Column(type="decimal", precision=4, scale=2, name="offensive_rating")
     * @var float
     */
    protected $offensiveRating;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="shots_conceded_in_box")
     * @var int
     */
    protected $shotsConcededInBox;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="shots_conceded_out_box")
     * @var int
     */
    protected $shotsConcededOutBox;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="total_tackles")
     * @var int
     */
    protected $totalTackles;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="interceptions")
     * @var int
     */
    protected $interceptions;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="fouls")
     * @var int
     */
    protected $fouls;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="was_fouled")
     * @var int
     */
    protected $wasFouled;
    
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
     * @Column(type="smallint", options={"unsigned"=true}, name="shots_blocked")
     * @var int
     */
    protected $shotsBlocked;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="dribbles")
     * @var int
     */
    protected $dribbles;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="offsides")
     * @var int
     */
    protected $offsides;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="corners")
     * @var int
     */
    protected $corners;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="throws")
     * @var int
     */
    protected $throws;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="dispossessed")
     * @var int
     */
    protected $dispossessed;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="total_clearances")
     * @var int
     */
    protected $totalClearances;

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
     * Set matchesPlayed
     *
     * @param int $matchesPlayed
     * @return StageTeamStatistics
     */
    public function setMatchesPlayed($matchesPlayed)
    {
        $this->matchesPlayed = $matchesPlayed;
    
        return $this;
    }

    /**
     * Get matchesPlayed
     *
     * @return int 
     */
    public function getMatchesPlayed()
    {
        return $this->matchesPlayed;
    }

    /**
     * Set goalsScored
     *
     * @param int $goalsScored
     * @return StageTeamStatistics
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
     * Set goalsConceded
     *
     * @param int $goalsConceded
     * @return StageTeamStatistics
     */
    public function setGoalsConceded($goalsConceded)
    {
        $this->goalsConceded = $goalsConceded;
    
        return $this;
    }

    /**
     * Get goalsConceded
     *
     * @return int 
     */
    public function getGoalsConceded()
    {
        return $this->goalsConceded;
    }

    /**
     * Set yellowCards
     *
     * @param int $yellowCards
     * @return StageTeamStatistics
     */
    public function setYellowCards($yellowCards)
    {
        $this->yellowCards = $yellowCards;
    
        return $this;
    }

    /**
     * Get yellowCards
     *
     * @return int 
     */
    public function getYellowCards()
    {
        return $this->yellowCards;
    }

    /**
     * Set redCards
     *
     * @param int $redCards
     * @return StageTeamStatistics
     */
    public function setRedCards($redCards)
    {
        $this->redCards = $redCards;
    
        return $this;
    }

    /**
     * Get redCards
     *
     * @return int 
     */
    public function getRedCards()
    {
        return $this->redCards;
    }

    /**
     * Set secondYellow
     *
     * @param int $secondYellow
     * @return StageTeamStatistics
     */
    public function setSecondYellow($secondYellow)
    {
        $this->secondYellow = $secondYellow;
    
        return $this;
    }

    /**
     * Get secondYellow
     *
     * @return int 
     */
    public function getSecondYellow()
    {
        return $this->secondYellow;
    }

    /**
     * Set possession
     *
     * @param int $possession
     * @return StageTeamStatistics
     */
    public function setPossession($possession)
    {
        $this->possession = $possession;
    
        return $this;
    }

    /**
     * Get possession
     *
     * @return int 
     */
    public function getPossession()
    {
        return $this->possession;
    }

    /**
     * Set totalPasses
     *
     * @param int $totalPasses
     * @return StageTeamStatistics
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
     * @return StageTeamStatistics
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
     * Set aerialWon
     *
     * @param int $aerialWon
     * @return StageTeamStatistics
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
     * @return StageTeamStatistics
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
     * Set overallRating
     *
     * @param float $overallRating
     * @return StageTeamStatistics
     */
    public function setOverallRating($overallRating)
    {
        $this->overallRating = $overallRating;
    
        return $this;
    }

    /**
     * Get overallRating
     *
     * @return float 
     */
    public function getOverallRating()
    {
        return $this->overallRating;
    }

    /**
     * Set defensiveRating
     *
     * @param float $defensiveRating
     * @return StageTeamStatistics
     */
    public function setDefensiveRating($defensiveRating)
    {
        $this->defensiveRating = $defensiveRating;
    
        return $this;
    }

    /**
     * Get defensiveRating
     *
     * @return float 
     */
    public function getDefensiveRating()
    {
        return $this->defensiveRating;
    }

    /**
     * Set offensiveRating
     *
     * @param float $offensiveRating
     * @return StageTeamStatistics
     */
    public function setOffensiveRating($offensiveRating)
    {
        $this->offensiveRating = $offensiveRating;
    
        return $this;
    }

    /**
     * Get offensiveRating
     *
     * @return float 
     */
    public function getOffensiveRating()
    {
        return $this->offensiveRating;
    }

    /**
     * Set shotsConcededInBox
     *
     * @param int $shotsConcededInBox
     * @return StageTeamStatistics
     */
    public function setShotsConcededInBox($shotsConcededInBox)
    {
        $this->shotsConcededInBox = $shotsConcededInBox;
    
        return $this;
    }

    /**
     * Get shotsConcededInBox
     *
     * @return int 
     */
    public function getShotsConcededInBox()
    {
        return $this->shotsConcededInBox;
    }

    /**
     * Set shotsConcededOutBox
     *
     * @param int $shotsConcededOutBox
     * @return StageTeamStatistics
     */
    public function setShotsConcededOutBox($shotsConcededOutBox)
    {
        $this->shotsConcededOutBox = $shotsConcededOutBox;
    
        return $this;
    }

    /**
     * Get shotsConcededOutBox
     *
     * @return int 
     */
    public function getShotsConcededOutBox()
    {
        return $this->shotsConcededOutBox;
    }

    /**
     * Set totalTackles
     *
     * @param int $totalTackles
     * @return StageTeamStatistics
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
     * Set interceptions
     *
     * @param int $interceptions
     * @return StageTeamStatistics
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
     * Set fouls
     *
     * @param int $fouls
     * @return StageTeamStatistics
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
     * Set wasFouled
     *
     * @param int $wasFouled
     * @return StageTeamStatistics
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
     * Set totalShots
     *
     * @param int $totalShots
     * @return StageTeamStatistics
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
     * @return StageTeamStatistics
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
     * Set shotsBlocked
     *
     * @param int $shotsBlocked
     * @return StageTeamStatistics
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
     * Set dribbles
     *
     * @param int $dribbles
     * @return StageTeamStatistics
     */
    public function setDribbles($dribbles)
    {
        $this->dribbles = $dribbles;
    
        return $this;
    }

    /**
     * Get dribbles
     *
     * @return int 
     */
    public function getDribbles()
    {
        return $this->dribbles;
    }

    /**
     * Set offsides
     *
     * @param int $offsides
     * @return StageTeamStatistics
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
     * Set corners
     *
     * @param int $corners
     * @return StageTeamStatistics
     */
    public function setCorners($corners)
    {
        $this->corners = $corners;
    
        return $this;
    }

    /**
     * Get corners
     *
     * @return int 
     */
    public function getCorners()
    {
        return $this->corners;
    }

    /**
     * Set throws
     *
     * @param int $throws
     * @return StageTeamStatistics
     */
    public function setThrows($throws)
    {
        $this->throws = $throws;
    
        return $this;
    }

    /**
     * Get throws
     *
     * @return int 
     */
    public function getThrows()
    {
        return $this->throws;
    }

    /**
     * Set dispossessed
     *
     * @param int $dispossessed
     * @return StageTeamStatistics
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
     * Set totalClearances
     *
     * @param int $totalClearances
     * @return StageTeamStatistics
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
     * Set team
     *
     * @param Team $team
     * @return StageTeamStatistics
     */
    public function setTeam(Team $team)
    {
        $this->team = $team;
    
        return $this;
    }

    /**
     * Get team
     *
     * @return Team 
     */
    public function getTeam()
    {
        return $this->team;
    }

    /**
     * Set stage
     *
     * @param Stage $stage
     * @return StageTeamStatistics
     */
    public function setStage(Stage $stage)
    {
        $this->stage = $stage;
    
        return $this;
    }

    /**
     * Get stage
     *
     * @return Stage 
     */
    public function getStage()
    {
        return $this->stage;
    }
}