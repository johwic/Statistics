<?php

/**
 * @Entity
 * @Table(name="region", uniqueConstraints={@UniqueConstraint(columns={"ws_id"})}))
 */
class Region
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
     * @param int $wsId Whoscored.com id of the league
     * @return Region
     */
    public function setWsId($wsId)
    {
        $this->wsId = $wsId;
        
        return $this;
    }
    
    /**
     * Set name
     *
     * @param string $name Name of the region
     * @return Region
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
}