<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 3:56 PM
 */

namespace Bux\AdvertiseBundle\Entity;

use Bux\StatisticBundle\Entity\BannerCompleteStatistic;
use Bux\UserBundle\Entity\Membership;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class BigBannerAd
 *
 * @package Bux\AdvertiseBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_advertise_big_banner_ads")
 */
class BigBannerAd
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="bigBannerAds")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $user;

    /**
     * @ORM\Column(type="text")
     */
    protected $title;

    /**
     * @ORM\Column(type="text", name="target_url")
     */
    protected $targetUrl;

    /**
     * @ORM\Column(type="text", name="banner_url")
     */
    protected $bannerUrl;

    /**
     * @ORM\Column(type="integer")
     */
    protected $credits = 0;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\Country", inversedBy="bigBannerAds")
     * @ORM\JoinTable(name="big_banner_ads_country")
     **/
    protected $countries;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\UserBundle\Entity\Membership", inversedBy="bigBannerAds")
     * @ORM\JoinTable(name="big_banner_ads_memberships")
     **/
    protected $memberships;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\BannerCompleteStatistic", mappedBy="ad", cascade={"persist", "remove"})
     */
    protected $statistic;

    /**
     * @ORM\Column(type="integer")
     */
    protected $clicks = 0;

    /**
     * @ORM\Column(type="integer")
     */
    protected $views = 0;

    /**
     * 0 - No
     * 1 - Yes
     *
     * @ORM\Column(type="boolean")
     */
    protected $validate = false;

    /**
     * 0 - No
     * 1 - Yes
     *
     * @ORM\Column(type="boolean")
     */
    protected $pause = false;
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->countries = new \Doctrine\Common\Collections\ArrayCollection();
        $this->memberships = new \Doctrine\Common\Collections\ArrayCollection();
        $this->statistic = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * @return BigBannerAd
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
     * Set targetUrl
     *
     * @param string $targetUrl
     *
     * @return BigBannerAd
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
     * Set bannerUrl
     *
     * @param string $bannerUrl
     *
     * @return BigBannerAd
     */
    public function setBannerUrl($bannerUrl)
    {
        $this->bannerUrl = $bannerUrl;

        return $this;
    }

    /**
     * Get bannerUrl
     *
     * @return string 
     */
    public function getBannerUrl()
    {
        return $this->bannerUrl;
    }

    /**
     * Set credits
     *
     * @param integer $credits
     *
     * @return BigBannerAd
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
     * @return BigBannerAd
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
     * Set views
     *
     * @param integer $views
     *
     * @return BigBannerAd
     */
    public function setViews($views)
    {
        $this->views = $views;

        return $this;
    }

    /**
     * Get views
     *
     * @return integer 
     */
    public function getViews()
    {
        return $this->views;
    }

    /**
     * Set validate
     *
     * @param boolean $validate
     *
     * @return BigBannerAd
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
     * Set pause
     *
     * @param boolean $pause
     *
     * @return BigBannerAd
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
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return BigBannerAd
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
     * Add countries
     *
     * @param \Bux\AdvertiseBundle\Entity\Country $countries
     *
     * @return BigBannerAd
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
     * Add memberships
     *
     * @param \Bux\UserBundle\Entity\Membership $memberships
     *
     * @return BigBannerAd
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
     * @param \Bux\StatisticBundle\Entity\BannerCompleteStatistic $statistic
     *
     * @return BigBannerAd
     */
    public function addStatistic(BannerCompleteStatistic $statistic)
    {
        $this->statistic[] = $statistic;

        return $this;
    }

    /**
     * Remove statistic
     *
     * @param \Bux\StatisticBundle\Entity\BannerCompleteStatistic $statistic
     */
    public function removeStatistic(BannerCompleteStatistic $statistic)
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
