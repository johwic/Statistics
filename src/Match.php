<?php

/**
 * @Entity
 * @Table(name="match_meta", uniqueConstraints={@UniqueConstraint(columns={"ws_id"})})
 */
class Match
{
    /**
     * @Id
     * @Column(type="integer", options={"unsigned"=true})
     * @GeneratedValue
     * @var int
     */
    protected $id;
    
    /**
     * @Column(type="integer", options={"unsigned"=true}, name="ws_id")
     * @var int
     */
    protected $wsId;
    
    /**
     * @ManyToOne(targetEntity="Team")
     * @JoinColumn(name="home_team_id", referencedColumnName="id")
     * @var Team
     */
    protected $homeTeam;
    
    /**
     * @ManyToOne(targetEntity="Team")
     * @JoinColumn(name="away_team_id", referencedColumnName="id")
     * @var Team
     */
    protected $awayTeam;
    
    /**
     * @ManyToOne(targetEntity="Stage")
     * @var Stage
     */
    protected $stage;
    
    /**
     * @Column(type="integer", options={"unsigned"=true}, name="time")
     * @var int
     */
    protected $time;

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
     * Set wsId
     *
     * @param int $wsId
     * @return Match
     */
    public function setWsId($wsId)
    {
        $this->wsId = $wsId;
    
        return $this;
    }

    /**
     * Get wsId
     *
     * @return int 
     */
    public function getWsId()
    {
        return $this->wsId;
    }

    /**
     * Set time
     *
     * @param int $time
     * @return Match
     */
    public function setTime($time)
    {
        $this->time = $time;
    
        return $this;
    }

    /**
     * Get time
     *
     * @return int 
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set homeTeam
     *
     * @param Team $homeTeam
     * @return Match
     */
    public function setHomeTeam($homeTeam)
    {
        $this->homeTeam = $homeTeam;
    
        return $this;
    }

    /**
     * Get homeTeam
     *
     * @return Team 
     */
    public function getHomeTeam()
    {
        return $this->homeTeam;
    }

    /**
     * Set awayTeam
     *
     * @param Team $awayTeam
     * @return Match
     */
    public function setAwayTeam(Team $awayTeam)
    {
        $this->awayTeam = $awayTeam;
    
        return $this;
    }

    /**
     * Get awayTeam
     *
     * @return Team 
     */
    public function getAwayTeam()
    {
        return $this->awayTeam;
    }

    /**
     * Set stage
     *
     * @param Stage $stage
     * @return Match
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