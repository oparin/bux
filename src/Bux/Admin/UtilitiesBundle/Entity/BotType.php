<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/2/15
 * Time: 12:21 PM
 */

namespace Bux\Admin\UtilitiesBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class BotType
 *
 * @package Bux\Admin\UtilitiesBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_referrals_bots_types")
 */
class BotType
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @ORM\Column(type="integer", name="min_clicks")
     */
    protected $minClicks;

    /**
     * @ORM\Column(type="integer", name="max_clicks")
     */
    protected $maxClicks;

    /**
     * @ORM\Column(type="integer", name="min_video")
     */
    protected $minVideo;

    /**
     * @ORM\Column(type="integer", name="max_video")
     */
    protected $maxVideo;

    /**
     * @ORM\Column(type="integer", name="min_poll")
     */
    protected $minPoll;

    /**
     * @ORM\Column(type="integer", name="max_poll")
     */
    protected $maxPoll;

    /**
     * @ORM\Column(type="smallint", name="days_activity")
     */
    protected $daysActivity;

    /**
     * @ORM\OneToMany(targetEntity="Bux\Admin\UtilitiesBundle\Entity\BotMembershipType", mappedBy="botType", cascade={"persist", "remove"})
     */
    protected $botMembershipType;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return BotType
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
     * Set minClicks
     *
     * @param integer $minClicks
     *
     * @return BotType
     */
    public function setMinClicks($minClicks)
    {
        $this->minClicks = $minClicks;

        return $this;
    }

    /**
     * Get minClicks
     *
     * @return integer 
     */
    public function getMinClicks()
    {
        return $this->minClicks;
    }

    /**
     * Set maxClicks
     *
     * @param integer $maxClicks
     *
     * @return BotType
     */
    public function setMaxClicks($maxClicks)
    {
        $this->maxClicks = $maxClicks;

        return $this;
    }

    /**
     * Get maxClicks
     *
     * @return integer 
     */
    public function getMaxClicks()
    {
        return $this->maxClicks;
    }

    /**
     * Set daysActivity
     *
     * @param integer $daysActivity
     *
     * @return BotType
     */
    public function setDaysActivity($daysActivity)
    {
        $this->daysActivity = $daysActivity;

        return $this;
    }

    /**
     * Get daysActivity
     *
     * @return integer 
     */
    public function getDaysActivity()
    {
        return $this->daysActivity;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->botMembershipType = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add botMembershipType
     *
     * @param \Bux\Admin\UtilitiesBundle\Entity\BotMembershipType $botMembershipType
     *
     * @return BotType
     */
    public function addBotMembershipType(BotMembershipType $botMembershipType)
    {
        $this->botMembershipType[] = $botMembershipType;

        return $this;
    }

    /**
     * Remove botMembershipType
     *
     * @param \Bux\Admin\UtilitiesBundle\Entity\BotMembershipType $botMembershipType
     */
    public function removeBotMembershipType(BotMembershipType $botMembershipType)
    {
        $this->botMembershipType->removeElement($botMembershipType);
    }

    /**
     * Get botMembershipType
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBotMembershipType()
    {
        return $this->botMembershipType;
    }

    /**
     * Set minVideo
     *
     * @param integer $minVideo
     *
     * @return BotType
     */
    public function setMinVideo($minVideo)
    {
        $this->minVideo = $minVideo;

        return $this;
    }

    /**
     * Get minVideo
     *
     * @return integer 
     */
    public function getMinVideo()
    {
        return $this->minVideo;
    }

    /**
     * Set maxVideo
     *
     * @param integer $maxVideo
     *
     * @return BotType
     */
    public function setMaxVideo($maxVideo)
    {
        $this->maxVideo = $maxVideo;

        return $this;
    }

    /**
     * Get maxVideo
     *
     * @return integer 
     */
    public function getMaxVideo()
    {
        return $this->maxVideo;
    }

    /**
     * Set minPoll
     *
     * @param integer $minPoll
     *
     * @return BotType
     */
    public function setMinPoll($minPoll)
    {
        $this->minPoll = $minPoll;

        return $this;
    }

    /**
     * Get minPoll
     *
     * @return integer 
     */
    public function getMinPoll()
    {
        return $this->minPoll;
    }

    /**
     * Set maxPoll
     *
     * @param integer $maxPoll
     *
     * @return BotType
     */
    public function setMaxPoll($maxPoll)
    {
        $this->maxPoll = $maxPoll;

        return $this;
    }

    /**
     * Get maxPoll
     *
     * @return integer 
     */
    public function getMaxPoll()
    {
        return $this->maxPoll;
    }
}
