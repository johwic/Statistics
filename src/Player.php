<?php

/**
 * @Entity
 * @Table(name="player", uniqueConstraints={@UniqueConstraint(columns={"ws_id"})})
 */
class Player
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
     * @var Team
     */
    protected $team;
    
    /**
     * @Column(type="string", length=255, name="first_name")
     * @var string
     */
    protected $firstName;
    
    /**
     * @Column(type="string", length=255, name="last_name")
     * @var string
     */
    protected $lastName;
    
    /**
     * @Column(type="string", length=255, name="known_name")
     * @var string
     */
    protected $knownName;
    
    /**
     * @Column(type="smallint", options={"unsigned"=true}, name="age")
     * @var int
     */
    protected $age;

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
     * @return Player
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
     * Set firstName
     *
     * @param string $firstName
     * @return Player
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    
        return $this;
    }

    /**
     * Get firstName
     *
     * @return string 
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     * @return Player
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    
        return $this;
    }

    /**
     * Get lastName
     *
     * @return string 
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set knownName
     *
     * @param string $knownName
     * @return Player
     */
    public function setKnownName($knownName)
    {
        $this->knownName = $knownName;
    
        return $this;
    }

    /**
     * Get knownName
     *
     * @return string 
     */
    public function getKnownName()
    {
        return $this->knownName;
    }

    /**
     * Set age
     *
     * @param int $age
     * @return Player
     */
    public function setAge($age)
    {
        $this->age = $age;
    
        return $this;
    }

    /**
     * Get age
     *
     * @return int
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * Set team
     *
     * @param Team $team
     * @return Player
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
}