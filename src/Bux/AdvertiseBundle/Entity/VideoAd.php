<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/14/15
 * Time: 1:05 PM
 */

namespace Bux\AdvertiseBundle\Entity;

use Bux\Admin\AdvertisementsBundle\Entity\VideoCategories;
use Bux\StatisticBundle\Entity\VideoCompleteStatistic;
use Bux\UserBundle\Entity\Membership;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class VideoAd
 *
 * @package Bux\AdvertiseBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_advertise_video_ads")
 */
class VideoAd
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="videoAds")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $user;

    /**
     * @ORM\Column(type="text")
     */
    protected $title;

    /**
     * @ORM\Column(type="text")
     */
    protected $description;

    /**
     * @ORM\Column(type="text", name="target_url")
     */
    protected $targetUrl;

    /**
     * @ORM\Column(type="integer", name="max_click_in_day")
     */
    protected $maxClickInDay;

//    /**
//     * 0 - No
//     * 1 - Yes
//     *
//     * @ORM\Column(type="boolean", name="premium_members")
//     */
//    protected $premiumMembers;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\Admin\AdvertisementsBundle\Entity\VideoCategories", inversedBy="videoAds")
     * @ORM\JoinColumn(name="video_category_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $value;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\Country", inversedBy="videoAds")
     * @ORM\JoinTable(name="video_ads_country")
     **/
    protected $countries;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\UserBundle\Entity\Membership", inversedBy="VideoAds")
     * @ORM\JoinTable(name="video_ads_memberships")
     **/
    protected $memberships;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\VideoCompleteStatistic", mappedBy="ad", cascade={"persist", "remove"})
     */
    protected $statistic;

    /**
     * 0 - No
     * 1 - Yes
     * 
     * @ORM\Column(type="boolean")
     */
    protected $validate = false;

    /**
     * @ORM\Column(type="integer")
     */
    protected $credits = 0;

    /**
     * @ORM\Column(type="integer")
     */
    protected $clicks = 0;

    /**
     * @ORM\Column(type="integer")
     */
    protected $outside = 0;

    /**
     * 0 - No
     * 1 - Yes
     *
     * @ORM\Column(type="boolean")
     */
    protected $pause = false;

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
     * Set title
     *
     * @param string $title
     *
     * @return VideoAd
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return VideoAd
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set targetUrl
     *
     * @param string $targetUrl
     *
     * @return VideoAd
     */
    public function setTargetUrl($targetUrl)
    {
        $this->targetUrl = $targetUrl;

        return $this;
    }

    /**
     * Get targetUrl
     *
     * @return string 
     */
    public function getTargetUrl()
    {
        return $this->targetUrl;
    }

    /**
     * Set maxClickInDay
     *
     * @param integer $maxClickInDay
     *
     * @return VideoAd
     */
    public function setMaxClickInDay($maxClickInDay)
    {
        $this->maxClickInDay = $maxClickInDay;

        return $this;
    }

    /**
     * Get maxClickInDay
     *
     * @return integer 
     */
    public function getMaxClickInDay()
    {
        return $this->maxClickInDay;
    }

//    /**
//     * Set premiumMembers
//     *
//     * @param boolean $premiumMembers
//     *
//     * @return VideoAd
//     */
//    public function setPremiumMembers($premiumMembers)
//    {
//        $this->premiumMembers = $premiumMembers;
//
//        return $this;
//    }
//
//    /**
//     * Get premiumMembers
//     *
//     * @return boolean
//     */
//    public function getPremiumMembers()
//    {
//        return $this->premiumMembers;
//    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return VideoAd
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Bux\UserBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set value
     *
     * @param \Bux\Admin\AdvertisementsBundle\Entity\VideoCategories $value
     *
     * @return VideoAd
     */
    public function setValue(VideoCategories $value = null)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return \Bux\Admin\AdvertisementsBundle\Entity\VideoCategories 
     */
    public function getValue()
    {
        return $this->value;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->countries = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add countries
     *
     * @param \Bux\AdvertiseBundle\Entity\Country $countries
     *
     * @return VideoAd
     */
    public function addCountry(Country $countries)
    {
        $this->countries[] = $countries;

        return $this;
    }

    /**
     * Remove countries
     *
     * @param \Bux\AdvertiseBundle\Entity\Country $countries
     */
    public function removeCountry(Country $countries)
    {
        $this->countries->removeElement($countries);
    }

    /**
     * Get countries
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getCountries()
    {
        return $this->countries;
    }

    /**
     * Set validate
     *
     * @param boolean $validate
     *
     * @return VideoAd
     */
    public function setValidate($validate)
    {
        $this->validate = $validate;

        return $this;
    }

    /**
     * Get validate
     *
     * @return boolean 
     */
    public function getValidate()
    {
        return $this->validate;
    }

    /**
     * Set credits
     *
     * @param integer $credits
     *
     * @return VideoAd
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
     * Set clicks
     *
     * @param integer $clicks
     *
     * @return VideoAd
     */
    public function setClicks($clicks)
    {
        $this->clicks = $clicks;

        return $this;
    }

    /**
     * Get clicks
     *
     * @return integer 
     */
    public function getClicks()
    {
        return $this->clicks;
    }

    /**
     * Set outside
     *
     * @param integer $outside
     *
     * @return VideoAd
     */
    public function setOutside($outside)
    {
        $this->outside = $outside;

        return $this;
    }

    /**
     * Get outside
     *
     * @return integer 
     */
    public function getOutside()
    {
        return $this->outside;
    }

    /**
     * Set pause
     *
     * @param boolean $pause
     *
     * @return VideoAd
     */
    public function setPause($pause)
    {
        $this->pause = $pause;

        return $this;
    }

    /**
     * Get pause
     *
     * @return boolean 
     */
    public function getPause()
    {
        return $this->pause;
    }

    /**
     * Add memberships
     *
     * @param \Bux\UserBundle\Entity\Membership $memberships
     *
     * @return VideoAd
     */
    public function addMembership(Membership $memberships)
    {
        $this->memberships[] = $memberships;

        return $this;
    }

    /**
     * Remove memberships
     *
     * @param \Bux\UserBundle\Entity\Membership $memberships
     */
    public function removeMembership(Membership $memberships)
    {
        $this->memberships->removeElement($memberships);
    }

    /**
     * Get memberships
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getMemberships()
    {
        return $this->memberships;
    }

    /**
     * Add statistic
     *
     * @param \Bux\StatisticBundle\Entity\VideoCompleteStatistic $statistic
     *
     * @return VideoAd
     */
    public function addStatistic(VideoCompleteStatistic $statistic)
    {
        $this->statistic[] = $statistic;

        return $this;
    }

    /**
     * Remove statistic
     *
     * @param \Bux\StatisticBundle\Entity\VideoCompleteStatistic $statistic
     */
    public function removeStatistic(VideoCompleteStatistic $statistic)
    {
        $this->statistic->removeElement($statistic);
    }

    /**
     * Get statistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getStatistic()
    {
        return $this->statistic;
    }
}
