<?php

/**
 * @Entity
 * @Table(name="season", uniqueConstraints={@UniqueConstraint(columns={"ws_id"})})
 */
class Season
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
     * @Column(type="string", length=255, name="year")
     * @var string
     */
    protected $year;
    
    /**
     * @ManyToOne(targetEntity="Tournament")
     * @var Tournament
     */
    protected $tournament;

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
     * Get wsId
     *
     * @return int
     */
    public function getWsId()
    {
        return $this->wsId;
    }
    
    /**
     * Set wsId
     *
     * @param int $wsId Whoscored.com id of the season
     * @return Season
     */
    public function setWsId($wsId)
    {
        $this->wsId = $wsId;
        
        return $this;
    }
    
    /**
     * Set year
     *
     * @param string $year Year of the season
     * @return Season
     */
    public function setYear($year)
    {
        $this->year = $year;
        
        return $this;
    }

    /**
     * Get year
     *
     * @return string 
     */
    public function getYear()
    {
        return $this->year;
    }
    
    /**
     * Set tournament
     *
     * @param Tournament $tournament The tournament
     * @return Season
     */
    public function setTournament(Tournament $tournament)
    {
        $this->tournament = $tournament;
        
        return $this;
    }

    /**
     * Get Tournament
     *
     * @return Tournament
     */
    public function getTournament()
    {
        return $this->tournament;
    }
}