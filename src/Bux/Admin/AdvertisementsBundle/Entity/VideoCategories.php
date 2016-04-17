<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/12/15
 * Time: 1:06 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Entity;

use Bux\AdvertiseBundle\Entity\VideoAd;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class VideoCategories
 *
 * @package Bux\Admin\AdvertisementsBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_ads_video_categories")
 */
class VideoCategories
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
     * @ORM\Column(type="decimal", scale=4)
     */
    protected $value;

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
     * @ORM\Column(type="boolean", name="hide_description")
     */
    protected $hideDescription;

    /**
     * @ORM\OneToMany(targetEntity="Bux\AdvertiseBundle\Entity\VideoAd", mappedBy="value", cascade={"remove"})
     */
    protected $videoAds;

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
     * Set value
     *
     * @param string $value
     *
     * @return VideoCategories
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return string 
     */
    public function getValue()
    {
        return $this->value;
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
     * Set hideDescription
     *
     * @param boolean $hideDescription
     *
     * @return VideoCategories
     */
    public function setHideDescription($hideDescription)
    {
        $this->hideDescription = $hideDescription;

        return $this;
    }

    /**
     * Get hideDescription
     *
     * @return boolean 
     */
    public function getHideDescription()
    {
        return $this->hideDescription;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->videoAds = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add videoAds
     *
     * @param \Bux\AdvertiseBundle\Entity\VideoAd $videoAds
     *
     * @return VideoCategories
     */
    public function addVideoAd(VideoAd $videoAds)
    {
        $this->videoAds[] = $videoAds;

        return $this;
    }

    /**
     * Remove videoAds
     *
     * @param \Bux\AdvertiseBundle\Entity\VideoAd $videoAds
     */
    public function removeVideoAd(VideoAd $videoAds)
    {
        $this->videoAds->removeElement($videoAds);
    }

    /**
     * Get videoAds
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getVideoAds()
    {
        return $this->videoAds;
    }
}
