<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/6/15
 * Time: 2:04 PM
 */

namespace Bux\UserBundle\Entity;

use Bux\Admin\SetupBundle\Entity\MarketingSettings;
use Bux\Admin\UtilitiesBundle\Entity\BotMembershipType;
use Bux\AdvertiseBundle\Entity\AutoSerfAd;
use Bux\AdvertiseBundle\Entity\BannerAd;
use Bux\AdvertiseBundle\Entity\BigBannerAd;
use Bux\AdvertiseBundle\Entity\PollAd;
use Bux\AdvertiseBundle\Entity\VideoAd;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Membership
 *
 * @package Bux\UserBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_membership")
 */
class Membership
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
     * @ORM\OneToMany(targetEntity="Bux\UserBundle\Entity\User", mappedBy="membership", cascade={"persist", "remove"})
     */
    protected $user;

    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    protected $price;

    /**
     * @ORM\Column(type="integer")
     */
    protected $duration;

    /**
     * @ORM\Column(type="smallint")
     */
    protected $click;

    /**
     * @ORM\Column(type="smallint", name="video_click")
     */
    protected $videoClick;

    /**
     * @ORM\Column(type="smallint", name="poll_click")
     */
    protected $pollClick;

    /**
     * @ORM\Column(type="smallint", name="max_click_in_day")
     */
    protected $maxClickInDay;

    /**
     * @ORM\Column(type="smallint", name="max_video_click_in_day")
     */
    protected $maxVideoClickInDay;

    /**
     * @ORM\Column(type="smallint", name="max_poll_click_in_day")
     */
    protected $maxPollClickInDay;

    /**
     * @ORM\Column(type="smallint", name= "ref_click")
     */
    protected $refClick;

    /**
     * @ORM\Column(type="smallint", name="ref_video_click")
     */
    protected $refVideoClick;

    /**
     * @ORM\Column(type="smallint", name="ref_poll_click")
     */
    protected $refPollClick;

    /**
     * @ORM\Column(type="integer", name="purchase_comission")
     */
    protected $purchaseComission;

    /**
     * @ORM\Column(type="decimal", scale=2, name="upgrade_comission")
     */
    protected $upgradeComission;

    /**
     * @ORM\Column(type="integer", name="ref_limit")
     */
    protected $refLimit;

    /**
     * @ORM\Column(type="integer", name="ref_deletion_cost")
     */
    protected $refDeletionCost;

    /**
     * @ORM\Column(type="integer", name="rented_ref_limit", nullable=true)
     */
    protected $rentedRefLimit;

    /**
     * @ORM\Column(type="boolean", name="inst_payment", nullable=true)
     */
    protected $instPayment;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $active;

    /**
     * @ORM\OneToOne(targetEntity="Bux\UserBundle\Entity\RentReferral", mappedBy="membership", cascade={"persist", "remove"})
     */
    protected $rentReferral;

    /**
     * @ORM\OneToMany(targetEntity="Bux\UserBundle\Entity\ReferralPrice", mappedBy="membership", cascade={"persist", "remove"})
     */
    protected $referralPrice;

    /**
     * @ORM\OneToOne(targetEntity="Bux\UserBundle\Entity\WithdrawSettings", mappedBy="membership", cascade={"persist", "remove"})
     */
    protected $withdrawSettings;

    /**
     * @ORM\OneToMany(targetEntity="Bux\Admin\UtilitiesBundle\Entity\BotMembershipType", mappedBy="membership", cascade={"persist", "remove"})
     */
    protected $botMembershipType;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\PollAd", mappedBy="memberships")
     **/
    private $pollAds;

    /**
     * @ORM\Column(type="integer", name="count_poll_ad")
     */
    protected $countPollAd = 0;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\AutoSerfAd", mappedBy="memberships")
     **/
    private $autoSerfAds;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\VideoAd", mappedBy="memberships", cascade={"persist", "remove"})
     **/
    private $videoAds;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\BannerAd", mappedBy="memberships")
     **/
    private $bannerAds;

    /**
     * @ORM\ManyToMany(targetEntity="Bux\AdvertiseBundle\Entity\BigBannerAd", mappedBy="memberships")
     **/
    private $bigBannerAds;

    /**
     * @ORM\OneToMany(targetEntity="Bux\Admin\SetupBundle\Entity\MarketingSettings", mappedBy="membership", cascade={"persist", "remove"})
     * @ORM\OrderBy({"level" = "asc"})
     */
    protected $levels;

    /**
     * @ORM\Column(type="integer", name="banner_credits")
     */
    protected $bannerCredits = 0;

    /**
     * @ORM\Column(type="integer", name="vip_banner_credits")
     */
    protected $vipBannerCredits = 0;

    /**
     * @ORM\Column(type="integer", name="autosurf_credits")
     */
    protected $autosurfCredits = 0;

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
     * @return Membership
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
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return Membership
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
     * Set price
     *
     * @param string $price
     *
     * @return Membership
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return string 
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set duration
     *
     * @param integer $duration
     *
     * @return Membership
     */
    public function setDuration($duration)
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * Get duration
     *
     * @return integer 
     */
    public function getDuration()
    {
        return $this->duration;
    }

    /**
     * Set click
     *
     * @param integer $click
     *
     * @return Membership
     */
    public function setClick($click)
    {
        $this->click = $click;

        return $this;
    }

    /**
     * Get click
     *
     * @return integer 
     */
    public function getClick()
    {
        return $this->click;
    }

    /**
     * Set refClick
     *
     * @param integer $refClick
     *
     * @return Membership
     */
    public function setRefClick($refClick)
    {
        $this->refClick = $refClick;

        return $this;
    }

    /**
     * Get refClick
     *
     * @return integer 
     */
    public function getRefClick()
    {
        return $this->refClick;
    }

    /**
     * Set refLimit
     *
     * @param integer $refLimit
     *
     * @return Membership
     */
    public function setRefLimit($refLimit)
    {
        $this->refLimit = $refLimit;

        return $this;
    }

    /**
     * Get refLimit
     *
     * @return integer 
     */
    public function getRefLimit()
    {
        return $this->refLimit;
    }

    /**
     * Set rentedRefLimit
     *
     * @param integer $rentedRefLimit
     *
     * @return Membership
     */
    public function setRentedRefLimit($rentedRefLimit)
    {
        $this->rentedRefLimit = $rentedRefLimit;

        return $this;
    }

    /**
     * Get rentedRefLimit
     *
     * @return integer 
     */
    public function getRentedRefLimit()
    {
        return $this->rentedRefLimit;
    }

    /**
     * Set instPayment
     *
     * @param boolean $instPayment
     *
     * @return Membership
     */
    public function setInstPayment($instPayment)
    {
        $this->instPayment = $instPayment;

        return $this;
    }

    /**
     * Get instPayment
     *
     * @return boolean 
     */
    public function getInstPayment()
    {
        return $this->instPayment;
    }

    /**
     * Set videoClick
     *
     * @param integer $videoClick
     *
     * @return Membership
     */
    public function setVideoClick($videoClick)
    {
        $this->videoClick = $videoClick;

        return $this;
    }

    /**
     * Get videoClick
     *
     * @return integer 
     */
    public function getVideoClick()
    {
        return $this->videoClick;
    }

    /**
     * Set pollClick
     *
     * @param integer $pollClick
     *
     * @return Membership
     */
    public function setPollClick($pollClick)
    {
        $this->pollClick = $pollClick;

        return $this;
    }

    /**
     * Get pollClick
     *
     * @return integer 
     */
    public function getPollClick()
    {
        return $this->pollClick;
    }

    /**
     * Set maxClickInDay
     *
     * @param integer $maxClickInDay
     *
     * @return Membership
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

    /**
     * Set maxVideoClickInDay
     *
     * @param integer $maxVideoClickInDay
     *
     * @return Membership
     */
    public function setMaxVideoClickInDay($maxVideoClickInDay)
    {
        $this->maxVideoClickInDay = $maxVideoClickInDay;

        return $this;
    }

    /**
     * Get maxVideoClickInDay
     *
     * @return integer 
     */
    public function getMaxVideoClickInDay()
    {
        return $this->maxVideoClickInDay;
    }

    /**
     * Set maxPollClickInDay
     *
     * @param integer $maxPollClickInDay
     *
     * @return Membership
     */
    public function setMaxPollClickInDay($maxPollClickInDay)
    {
        $this->maxPollClickInDay = $maxPollClickInDay;

        return $this;
    }

    /**
     * Get maxPollClickInDay
     *
     * @return integer 
     */
    public function getMaxPollClickInDay()
    {
        return $this->maxPollClickInDay;
    }

    /**
     * Set refVideoClick
     *
     * @param integer $refVideoClick
     *
     * @return Membership
     */
    public function setRefVideoClick($refVideoClick)
    {
        $this->refVideoClick = $refVideoClick;

        return $this;
    }

    /**
     * Get refVideoClick
     *
     * @return integer 
     */
    public function getRefVideoClick()
    {
        return $this->refVideoClick;
    }

    /**
     * Set refPollClick
     *
     * @param integer $refPollClick
     *
     * @return Membership
     */
    public function setRefPollClick($refPollClick)
    {
        $this->refPollClick = $refPollClick;

        return $this;
    }

    /**
     * Get refPollClick
     *
     * @return integer 
     */
    public function getRefPollClick()
    {
        return $this->refPollClick;
    }

    /**
     * Set purchaseComission
     *
     * @param integer $purchaseComission
     *
     * @return Membership
     */
    public function setPurchaseComission($purchaseComission)
    {
        $this->purchaseComission = $purchaseComission;

        return $this;
    }

    /**
     * Get purchaseComission
     *
     * @return integer 
     */
    public function getPurchaseComission()
    {
        return $this->purchaseComission;
    }

    /**
     * Set upgradeComission
     *
     * @param string $upgradeComission
     *
     * @return Membership
     */
    public function setUpgradeComission($upgradeComission)
    {
        $this->upgradeComission = $upgradeComission;

        return $this;
    }

    /**
     * Get upgradeComission
     *
     * @return string 
     */
    public function getUpgradeComission()
    {
        return $this->upgradeComission;
    }

    /**
     * Set refDeletionCost
     *
     * @param integer $refDeletionCost
     *
     * @return Membership
     */
    public function setRefDeletionCost($refDeletionCost)
    {
        $this->refDeletionCost = $refDeletionCost;

        return $this;
    }

    /**
     * Get refDeletionCost
     *
     * @return integer 
     */
    public function getRefDeletionCost()
    {
        return $this->refDeletionCost;
    }

    /**
     * Set active
     *
     * @param boolean $active
     *
     * @return Membership
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean 
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set rentReferral
     *
     * @param \Bux\UserBundle\Entity\RentReferral $rentReferral
     *
     * @return Membership
     */
    public function setRentReferral(RentReferral $rentReferral = null)
    {
        $this->rentReferral = $rentReferral;

        return $this;
    }

    /**
     * Get rentReferral
     *
     * @return \Bux\UserBundle\Entity\RentReferral 
     */
    public function getRentReferral()
    {
        return $this->rentReferral;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->referralPrice = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Add referralPrice
     *
     * @param \Bux\UserBundle\Entity\ReferralPrice $referralPrice
     *
     * @return Membership
     */
    public function addReferralPrice(ReferralPrice $referralPrice)
    {
        $this->referralPrice[] = $referralPrice;

        return $this;
    }

    /**
     * Remove referralPrice
     *
     * @param \Bux\UserBundle\Entity\ReferralPrice $referralPrice
     */
    public function removeReferralPrice(ReferralPrice $referralPrice)
    {
        $this->referralPrice->removeElement($referralPrice);
    }

    /**
     * Get referralPrice
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getReferralPrice()
    {
        return $this->referralPrice;
    }

    /**
     * Set withdrawSettings
     *
     * @param \Bux\UserBundle\Entity\WithdrawSettings $withdrawSettings
     *
     * @return Membership
     */
    public function setWithdrawSettings(WithdrawSettings $withdrawSettings = null)
    {
        $this->withdrawSettings = $withdrawSettings;

        return $this;
    }

    /**
     * Get withdrawSettings
     *
     * @return \Bux\UserBundle\Entity\WithdrawSettings 
     */
    public function getWithdrawSettings()
    {
        return $this->withdrawSettings;
    }

    /**
     * Add botMembershipType
     *
     * @param \Bux\Admin\UtilitiesBundle\Entity\BotMembershipType $botMembershipType
     *
     * @return Membership
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
     * Add pollAds
     *
     * @param \Bux\AdvertiseBundle\Entity\PollAd $pollAds
     *
     * @return Membership
     */
    public function addPollAd(PollAd $pollAds)
    {
        $this->pollAds[] = $pollAds;

        return $this;
    }

    /**
     * Remove pollAds
     *
     * @param \Bux\AdvertiseBundle\Entity\PollAd $pollAds
     */
    public function removePollAd(PollAd $pollAds)
    {
        $this->pollAds->removeElement($pollAds);
    }

    /**
     * Get pollAds
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getPollAds()
    {
        return $this->pollAds;
    }

    /**
     * Set countPollAd
     *
     * @param integer $countPollAd
     *
     * @return Membership
     */
    public function setCountPollAd($countPollAd)
    {
        $this->countPollAd = $countPollAd;

        return $this;
    }

    /**
     * Get countPollAd
     *
     * @return integer 
     */
    public function getCountPollAd()
    {
        return $this->countPollAd;
    }

    /**
     * Add levels
     *
     * @param \Bux\Admin\SetupBundle\Entity\MarketingSettings $levels
     *
     * @return Membership
     */
    public function addLevel(MarketingSettings $levels)
    {
        $this->levels[] = $levels;

        return $this;
    }

    /**
     * Remove levels
     *
     * @param \Bux\Admin\SetupBundle\Entity\MarketingSettings $levels
     */
    public function removeLevel(MarketingSettings $levels)
    {
        $this->levels->removeElement($levels);
    }

    /**
     * Get levels
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getLevels()
    {
        return $this->levels;
    }

    /**
     * Add user
     *
     * @param \Bux\UserBundle\Entity\User $user
     * @return Membership
     */
    public function addUser(\Bux\UserBundle\Entity\User $user)
    {
        $this->user[] = $user;

        return $this;
    }

    /**
     * Remove user
     *
     * @param \Bux\UserBundle\Entity\User $user
     */
    public function removeUser(\Bux\UserBundle\Entity\User $user)
    {
        $this->user->removeElement($user);
    }

    /**
     * Add AutoSerfAds
     *
     * @param \Bux\AdvertiseBundle\Entity\AutoSerfAd $autoSerfAds
     *
     * @return Membership
     */
    public function addAutoSerfAd(AutoSerfAd $autoSerfAds)
    {
        $this->autoSerfAds[] = $autoSerfAds;

        return $this;
    }

    /**
     * Remove AutoSerfAds
     *
     * @param \Bux\AdvertiseBundle\Entity\AutoSerfAd $autoSerfAds
     */
    public function removeAutoSerfAd(AutoSerfAd $autoSerfAds)
    {
        $this->autoSerfAds->removeElement($autoSerfAds);
    }

    /**
     * Get AutoSerfAds
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getAutoSerfAds()
    {
        return $this->autoSerfAds;
    }

    /**
     * Add videoAds
     *
     * @param \Bux\AdvertiseBundle\Entity\VideoAd $videoAds
     *
     * @return Membership
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

    /**
     * Add bannerAds
     *
     * @param \Bux\AdvertiseBundle\Entity\BannerAd $bannerAds
     *
     * @return Membership
     */
    public function addBannerAd(BannerAd $bannerAds)
    {
        $this->bannerAds[] = $bannerAds;

        return $this;
    }

    /**
     * Remove bannerAds
     *
     * @param \Bux\AdvertiseBundle\Entity\BannerAd $bannerAds
     */
    public function removeBannerAd(BannerAd $bannerAds)
    {
        $this->bannerAds->removeElement($bannerAds);
    }

    /**
     * Get bannerAds
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBannerAds()
    {
        return $this->bannerAds;
    }

    /**
     * Add bigBannerAds
     *
     * @param \Bux\AdvertiseBundle\Entity\BigBannerAd $bigBannerAds
     *
     * @return Membership
     */
    public function addBigBannerAd(BigBannerAd $bigBannerAds)
    {
        $this->bigBannerAds[] = $bigBannerAds;

        return $this;
    }

    /**
     * Remove bigBannerAds
     *
     * @param \Bux\AdvertiseBundle\Entity\BigBannerAd $bigBannerAds
     */
    public function removeBigBannerAd(BigBannerAd $bigBannerAds)
    {
        $this->bigBannerAds->removeElement($bigBannerAds);
    }

    /**
     * Get bigBannerAds
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBigBannerAds()
    {
        return $this->bigBannerAds;
    }

    /**
     * Set bannerCredits
     *
     * @param integer $bannerCredits
     * @return Membership
     */
    public function setBannerCredits($bannerCredits)
    {
        $this->bannerCredits = $bannerCredits;

        return $this;
    }

    /**
     * Get bannerCredits
     *
     * @return integer 
     */
    public function getBannerCredits()
    {
        return $this->bannerCredits;
    }

    /**
     * Set vip_BannerCredits
     *
     * @param integer $vipBannerCredits
     * @return Membership
     */
    public function setVipBannerCredits($vipBannerCredits)
    {
        $this->vipBannerCredits = $vipBannerCredits;

        return $this;
    }

    /**
     * Get vip_BannerCredits
     *
     * @return integer 
     */
    public function getVipBannerCredits()
    {
        return $this->vipBannerCredits;
    }

    /**
     * Set autosurfCredits
     *
     * @param integer $autosurfCredits
     * @return Membership
     */
    public function setAutosurfCredits($autosurfCredits)
    {
        $this->autosurfCredits = $autosurfCredits;

        return $this;
    }

    /**
     * Get autosurfCredits
     *
     * @return integer 
     */
    public function getAutosurfCredits()
    {
        return $this->autosurfCredits;
    }
}
