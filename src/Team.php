<?php

/**
 * @Entity
 * @Table(name="team", uniqueConstraints={@UniqueConstraint(columns={"ws_id"})})
 */
class Team
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
     * @param int $wsId Whoscored.com id of the team
     * @return Team
     */
    public function setWsId($wsId)
    {
        $this->wsId = $wsId;
        
        return $this;
    }
    
    /**
     * Set name
     *
     * @param string $name Name of the team
     * @return Team
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
     * @return Team
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