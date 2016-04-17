<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/23/15
 * Time: 2:47 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Entity;

use Bux\AdvertiseBundle\Entity\AutoSerfAd;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class AutoSerfCategories
 *
 * @package Bux\Admin\AdvertisementsBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_ads_auto_serf_categories")
 */
class AutoSerfCategories
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
     * @ORM\Column(type="integer")
     */
    protected $seconds;

    /**
     * @ORM\Column(type="integer")
     */
    protected $credits;

    /**
     * @ORM\Column(type="integer")
     */
    protected $time;

    /**
     * @ORM\Column(type="boolean", name="ref_earning")
     */
    protected $refEarning;

    /**
     * @ORM\OneToMany(targetEntity="Bux\AdvertiseBundle\Entity\AutoSerfAd", mappedBy="category", cascade={"remove"})
     */
    protected $autoSerfAds;

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
     * @return VideoCategories
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
     * Set seconds
     *
     * @param string $seconds
     *
     * @return VideoCategories
     */
    public function setSeconds($seconds)
    {
        $this->seconds = $seconds;

        return $this;
    }

    /**
     * Get seconds
     *
     * @return string
     */
    public function getSeconds()
    {
        return $this->seconds;
    }

    /**
     * Set credits
     *
     * @param integer $credits
     *
     * @return VideoCategories
     */
    public function setCredits($credits)
    {
        $this->credits = $credits;

        return $this;
    }

    /**
     * Get credits
     *
     * @return integer
     */
    public function getCredits()
    {
        return $this->credits;
    }

    /**
     * Set time
     *
     * @param integer $time
     *
     * @return VideoCategories
     */
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get time
     *
     * @return integer
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set refEarning
     *
     * @param boolean $refEarning
     *
     * @return VideoCategories
     */
    public function setRefEarning($refEarning)
    {
        $this->refEarning = $refEarning;

        return $this;
    }

    /**
     * Get refEarning
     *
     * @return boolean
     */
    public function getRefEarning()
    {
        return $this->refEarning;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->videoAds = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add autoSerfAds
     *
     * @param \Bux\AdvertiseBundle\Entity\AutoSerfAd $autoSerfAds
     *
     * @return VideoCategories
     */
    public function addAutoSerfAd(AutoSerfAd $autoSerfAds)
    {
        $this->autoSerfAds[] = $autoSerfAds;

        return $this;
    }

    /**
     * Remove autoSerfAds
     *
     * @param \Bux\AdvertiseBundle\Entity\AutoSerfAd $autoSerfAds
     */
    public function removeAutoSerfAd(AutoSerfAd $autoSerfAds)
    {
        $this->autoSerfAds->removeElement($autoSerfAds);
    }

    /**
     * Get autoSerfAds
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getAutoSerfAds()
    {
        return $this->autoSerfAds;
    }
}
