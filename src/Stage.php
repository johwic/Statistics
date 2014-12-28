<?php

/**
 * @Entity
 * @Table(name="stage", uniqueConstraints={@UniqueConstraint(columns={"ws_id"})})
 */
class Stage
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
     * @Column(type="string", length=255, name="name")
     * @var string
     */
    protected $name;
    
    /**
     * @ManyToOne(targetEntity="Tournament")
     * @var Tournament
     */
    protected $tournament;
    
    /**
     * @ManyToOne(targetEntity="Season")
     * @var Season
     */
    protected $season;

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
     * @param int $wsId Whoscored.com id of the stage
     * @return Stage
     */
    public function setWsId($wsId)
    {
        $this->wsId = $wsId;
        
        return $this;
    }
    
    /**
     * Set name
     *
     * @param string $name Name of the stage
     * @return Stage
     */
    public function setName($name)
    {
        $this->name = $name;
        
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }
    
    /**
     * Set tournament
     *
     * @param Tournament $tournament The tournament
     * @return Stage
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
    
    /**
     * Set season
     *
     * @param Season $season The season
     * @return Stage
     */
    public function setSeason(Season $season)
    {
        $this->season = $season;
        
        return $this;
    }

    /**
     * Get season
     *
     * @return Season
     */
    public function getSeason()
    {
        return $this->season;
    }
}