<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/16/14
 * Time: 11:25 AM
 */

namespace Bux\UserBundle\Entity;

use Bux\Admin\HomeBundle\Entity\AdminPermission;
use Bux\Admin\HomeBundle\Entity\AdminSettings;
use Bux\Admin\UtilitiesBundle\Entity\ReferralBot;
use Bux\AdvertiseBundle\Entity\AutoSerfAd;
use Bux\AdvertiseBundle\Entity\AutoSerfCredits;
use Bux\AdvertiseBundle\Entity\BannerAd;
use Bux\AdvertiseBundle\Entity\BannerCredits;
use Bux\AdvertiseBundle\Entity\BigBannerAd;
use Bux\AdvertiseBundle\Entity\BigBannerCredits;
use Bux\AdvertiseBundle\Entity\PollAd;
use Bux\AdvertiseBundle\Entity\PollCredits;
use Bux\AdvertiseBundle\Entity\VideoAd;
use Bux\AdvertiseBundle\Entity\VideoCredits;
use Bux\BlogBundle\Entity\BlogUserSettings;
use Bux\OfficeBundle\Entity\ReplySupportTicket;
use Bux\OfficeBundle\Entity\SupportTicket;
use Bux\StatisticBundle\Entity\AdBonusStatistic;
use Bux\StatisticBundle\Entity\AutoSerfCompleteStatistic;
use Bux\StatisticBundle\Entity\BannerCompleteStatistic;
use Bux\StatisticBundle\Entity\BigBannerCompleteStatistic;
use Bux\StatisticBundle\Entity\DepositStatistic;
use Bux\StatisticBundle\Entity\PollCompleteStatistic;
use Bux\StatisticBundle\Entity\UserIncomeStatistic;
use Bux\StatisticBundle\Entity\VideoCompleteStatistic;
use Bux\StatisticBundle\Entity\WithdrawStatistic;
use Bux\WalletBundle\Entity\PurchaseWallet;
use Bux\WalletBundle\Entity\SurveyWalletAvailableBalance;
use Bux\WalletBundle\Entity\SurveyWalletBalance;
use Bux\WalletBundle\Entity\UserPaymentAccount;
use Bux\WalletBundle\Entity\Wallet;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Bux\BlogBundle\Entity\Blog;
use Bux\BlogBundle\Entity\BlogCategory;

/**
 * Class User
 *
 * @package Bux\UserBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="Bux\BlogBundle\Entity\Blog", mappedBy="user", cascade={"persist", "remove"})
     * @ORM\OrderBy({"id" = "DESC"})
     */
    protected $blogs;

    /**
     * @ORM\OneToMany(targetEntity="Bux\BlogBundle\Entity\BlogCategory", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $blogCategories;

    /**
     * @ORM\OneToOne(targetEntity="Bux\WalletBundle\Entity\Wallet", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $wallet;

    /**
     * @ORM\OneToOne(targetEntity="Bux\WalletBundle\Entity\PurchaseWallet", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $purchaseWallet;

    /**
     * @ORM\OneToOne(targetEntity="Bux\WalletBundle\Entity\SurveyWalletBalance", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $surveyWalletBalance;

    /**
     * @ORM\OneToOne(targetEntity="Bux\WalletBundle\Entity\SurveyWalletAvailableBalance", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $surveyWalletAvailableBalance;

    /**
     * @ORM\OneToOne(targetEntity="Bux\Admin\HomeBundle\Entity\AdminSettings", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $adminSettings;

    /**
     * @ORM\Column(type="string")
     */
    protected $fullName;

    /**
     * @ORM\Column(type="string")
     */
    protected $country;

    /**
     * @ORM\Column(type="datetime", name="registration_date")
     */
    protected $registrationDate;

    /**
     * @ORM\OneToOne(targetEntity="Bux\Admin\HomeBundle\Entity\AdminPermission", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $adminPermission;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\Membership", inversedBy="user")
     * @ORM\JoinColumn(name="membership_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $membership;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\DepositStatistic", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $depositStatistic;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\WithdrawStatistic", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $withdrawStatistic;

    /**
     * @ORM\OneToMany(targetEntity="Bux\WalletBundle\Entity\UserPaymentAccount", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $paymentAccounts;

    /**
     * @ORM\OneToMany(targetEntity="Bux\OfficeBundle\Entity\SupportTicket", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $supportTickets;

    /**
     * @ORM\OneToMany(targetEntity="Bux\OfficeBundle\Entity\ReplySupportTicket", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $replySupportTickets;

    /**
     * @ORM\OneToOne(targetEntity="Bux\AdvertiseBundle\Entity\VideoCredits", mappedBy="user", cascade={"remove"})
     */
    protected $videoCredits;

    /**
     * @ORM\OneToOne(targetEntity="Bux\AdvertiseBundle\Entity\PollCredits", mappedBy="user", cascade={"remove"})
     */
    protected $pollCredits;

    /**
     * @ORM\OneToOne(targetEntity="Bux\AdvertiseBundle\Entity\AutoSerfCredits", mappedBy="user", cascade={"remove"})
     */
    protected $autoSerfCredits;

    /**
     * @ORM\OneToOne(targetEntity="Bux\AdvertiseBundle\Entity\BannerCredits", mappedBy="user", cascade={"remove"})
     */
    protected $bannerCredits;

    /**
     * @ORM\OneToOne(targetEntity="Bux\AdvertiseBundle\Entity\BigBannerCredits", mappedBy="user", cascade={"remove"})
     */
    protected $bigBannerCredits;

    /**
     * @ORM\OneToMany(targetEntity="Bux\AdvertiseBundle\Entity\VideoAd", mappedBy="user", cascade={"remove"})
     */
    protected $videoAds;

    /**
     * @ORM\OneToMany(targetEntity="Bux\AdvertiseBundle\Entity\PollAd", mappedBy="user", cascade={"remove"})
     */
    protected $pollAds;

    /**
     * @ORM\OneToMany(targetEntity="Bux\AdvertiseBundle\Entity\AutoSerfAd", mappedBy="user", cascade={"remove"})
     */
    protected $autoSerfAds;

    /**
     * @ORM\OneToMany(targetEntity="Bux\AdvertiseBundle\Entity\BannerAd", mappedBy="user", cascade={"remove"})
     */
    protected $bannerAds;

    /**
     * @ORM\OneToMany(targetEntity="Bux\AdvertiseBundle\Entity\BigBannerAd", mappedBy="user", cascade={"remove"})
     */
    protected $bigBannerAds;

    /**
     * @ORM\OneToMany(targetEntity="Bux\Admin\UtilitiesBundle\Entity\ReferralBot", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $rentReferrals;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User")
     * @ORM\JoinColumn(name="sponsor_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $sponsor;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\PollCompleteStatistic", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $pollStatistic;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\AutoSerfCompleteStatistic", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $autoSerfStatistic;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\VideoCompleteStatistic", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $videoStatistic;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\BannerCompleteStatistic", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $bannerStatistic;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\BigBannerCompleteStatistic", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $bigBannerStatistic;

    /**
     * @ORM\OneToOne(targetEntity="Bux\BlogBundle\Entity\BlogUserSettings", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $blogSettings;

    /**
     * @ORM\Column(type="integer", name="auto_serf_seconds")
     */
    protected $autoSerfSeconds = 0;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\AdBonusStatistic", mappedBy="userFrom", cascade={"remove"})
     */
    protected $adBonusUserFrom;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\AdBonusStatistic", mappedBy="userTo", cascade={"remove"})
     */
    protected $adBonusUserTo;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\UserIncomeStatistic", mappedBy="user", cascade={"remove"})
     */
    protected $incomeStatistic;

    /**
     * @ORM\Column(type="datetime", name="membership_end_date")
     */
    protected $membershipEndDate;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->membershipEndDate = new \DateTime();
        // your own logic
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
     * Add blogs
     *
     * @param \Bux\BlogBundle\Entity\Blog $blogs
     *
     * @return User
     */
    public function addBlog(Blog $blogs)
    {
        $this->blogs[] = $blogs;

        return $this;
    }

    /**
     * Remove blogs
     *
     * @param \Bux\BlogBundle\Entity\Blog $blogs
     */
    public function removeBlog(Blog $blogs)
    {
        $this->blogs->removeElement($blogs);
    }

    /**
     * Get blogs
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBlogs()
    {
        return $this->blogs;
    }

    /**
     * Add blogCategories
     *
     * @param \Bux\BlogBundle\Entity\BlogCategory $blogCategories
     *
     * @return User
     */
    public function addBlogCategory(\Bux\BlogBundle\Entity\BlogCategory $blogCategories)
    {
        $this->blogCategories[] = $blogCategories;

        return $this;
    }

    /**
     * Remove blogCategories
     *
     * @param \Bux\BlogBundle\Entity\BlogCategory $blogCategories
     */
    public function removeBlogCategory(BlogCategory $blogCategories)
    {
        $this->blogCategories->removeElement($blogCategories);
    }

    /**
     * Get blogCategories
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBlogCategories()
    {
        return $this->blogCategories;
    }

    /**
     * Set wallet
     *
     * @param \Bux\WalletBundle\Entity\Wallet $wallet
     *
     * @return User
     */
    public function setWallet(Wallet $wallet = null)
    {
        $this->wallet = $wallet;

        return $this;
    }

    /**
     * Get wallet
     *
     * @return \Bux\WalletBundle\Entity\Wallet 
     */
    public function getWallet()
    {
        return $this->wallet;
    }

    /**
     * Set purchaseWallet
     *
     * @param \Bux\WalletBundle\Entity\PurchaseWallet $purchaseWallet
     *
     * @return User
     */
    public function setPurchaseWallet(PurchaseWallet $purchaseWallet = null)
    {
        $this->purchaseWallet = $purchaseWallet;

        return $this;
    }

    /**
     * Get purchaseWallet
     *
     * @return \Bux\WalletBundle\Entity\PurchaseWallet 
     */
    public function getPurchaseWallet()
    {
        return $this->purchaseWallet;
    }

    /**
     * Set adminSettings
     *
     * @param \Bux\Admin\HomeBundle\Entity\AdminSettings $adminSettings
     *
     * @return User
     */
    public function setAdminSettings(AdminSettings $adminSettings = null)
    {
        $this->adminSettings = $adminSettings;

        return $this;
    }

    /**
     * Get adminSettings
     *
     * @return \Bux\Admin\HomeBundle\Entity\AdminSettings 
     */
    public function getAdminSettings()
    {
        return $this->adminSettings;
    }

    /**
     * Set fullName
     *
     * @param string $fullName
     *
     * @return User
     */
    public function setFullName($fullName)
    {
        $this->fullName = $fullName;

        return $this;
    }

    /**
     * Get fullName
     *
     * @return string 
     */
    public function getFullName()
    {
        return $this->fullName;
    }

    /**
     * Set country
     *
     * @param string $country
     *
     * @return User
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return string 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set registrationDate
     *
     * @param \DateTime $registrationDate
     *
     * @return User
     */
    public function setRegistrationDate($registrationDate)
    {
        $this->registrationDate = $registrationDate;

        return $this;
    }

    /**
     * Get registrationDate
     *
     * @return \DateTime 
     */
    public function getRegistrationDate()
    {
        return $this->registrationDate;
    }

    /**
     * Set adminPermission
     *
     * @param \Bux\Admin\HomeBundle\Entity\AdminPermission $adminPermission
     *
     * @return User
     */
    public function setAdminPermission(AdminPermission $adminPermission = null)
    {
        $this->adminPermission = $adminPermission;

        return $this;
    }

    /**
     * Get adminPermission
     *
     * @return \Bux\Admin\HomeBundle\Entity\AdminPermission 
     */
    public function getAdminPermission()
    {
        return $this->adminPermission;
    }

    /**
     * Set membership
     *
     * @param \Bux\UserBundle\Entity\Membership $membership
     *
     * @return User
     */
    public function setMembership(Membership $membership = null)
    {
        $this->membership = $membership;

        return $this;
    }

    /**
     * Get membership
     *
     * @return \Bux\UserBundle\Entity\Membership 
     */
    public function getMembership()
    {
        return $this->membership;
    }

    /**
     * Add depositStatistic
     *
     * @param \Bux\StatisticBundle\Entity\DepositStatistic $depositStatistic
     *
     * @return User
     */
    public function addDepositStatistic(DepositStatistic $depositStatistic)
    {
        $this->depositStatistic[] = $depositStatistic;

        return $this;
    }

    /**
     * Remove depositStatistic
     *
     * @param \Bux\StatisticBundle\Entity\DepositStatistic $depositStatistic
     */
    public function removeDepositStatistic(DepositStatistic $depositStatistic)
    {
        $this->depositStatistic->removeElement($depositStatistic);
    }

    /**
     * Get depositStatistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getDepositStatistic()
    {
        return $this->depositStatistic;
    }

    /**
     * Add paymentAccounts
     *
     * @param \Bux\WalletBundle\Entity\UserPaymentAccount $paymentAccounts
     *
     * @return User
     */
    public function addPaymentAccount(UserPaymentAccount $paymentAccounts)
    {
        $this->paymentAccounts[] = $paymentAccounts;

        return $this;
    }

    /**
     * Remove paymentAccounts
     *
     * @param \Bux\WalletBundle\Entity\UserPaymentAccount $paymentAccounts
     */
    public function removePaymentAccount(UserPaymentAccount $paymentAccounts)
    {
        $this->paymentAccounts->removeElement($paymentAccounts);
    }

    /**
     * Get paymentAccounts
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getPaymentAccounts()
    {
        return $this->paymentAccounts;
    }

    /**
     * Add withdrawStatistic
     *
     * @param \Bux\StatisticBundle\Entity\WithdrawStatistic $withdrawStatistic
     *
     * @return User
     */
    public function addWithdrawStatistic(WithdrawStatistic $withdrawStatistic)
    {
        $this->withdrawStatistic[] = $withdrawStatistic;

        return $this;
    }

    /**
     * Remove withdrawStatistic
     *
     * @param \Bux\StatisticBundle\Entity\WithdrawStatistic $withdrawStatistic
     */
    public function removeWithdrawStatistic(WithdrawStatistic $withdrawStatistic)
    {
        $this->withdrawStatistic->removeElement($withdrawStatistic);
    }

    /**
     * Get withdrawStatistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getWithdrawStatistic()
    {
        return $this->withdrawStatistic;
    }

    /**
     * Add supportTickets
     *
     * @param \Bux\OfficeBundle\Entity\SupportTicket $supportTickets
     *
     * @return User
     */
    public function addSupportTicket(SupportTicket $supportTickets)
    {
        $this->supportTickets[] = $supportTickets;

        return $this;
    }

    /**
     * Remove supportTickets
     *
     * @param \Bux\OfficeBundle\Entity\SupportTicket $supportTickets
     */
    public function removeSupportTicket(SupportTicket $supportTickets)
    {
        $this->supportTickets->removeElement($supportTickets);
    }

    /**
     * Get supportTickets
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getSupportTickets()
    {
        return $this->supportTickets;
    }

    /**
     * Add replySupportTickets
     *
     * @param \Bux\OfficeBundle\Entity\ReplySupportTicket $replySupportTickets
     *
     * @return User
     */
    public function addReplySupportTicket(ReplySupportTicket $replySupportTickets)
    {
        $this->replySupportTickets[] = $replySupportTickets;

        return $this;
    }

    /**
     * Remove replySupportTickets
     *
     * @param \Bux\OfficeBundle\Entity\ReplySupportTicket $replySupportTickets
     */
    public function removeReplySupportTicket(ReplySupportTicket $replySupportTickets)
    {
        $this->replySupportTickets->removeElement($replySupportTickets);
    }

    /**
     * Get replySupportTickets
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getReplySupportTickets()
    {
        return $this->replySupportTickets;
    }

    /**
     * Set videoCredits
     *
     * @param \Bux\AdvertiseBundle\Entity\VideoCredits $videoCredits
     *
     * @return User
     */
    public function setVideoCredits(VideoCredits $videoCredits = null)
    {
        $this->videoCredits = $videoCredits;

        return $this;
    }

    /**
     * Get videoCredits
     *
     * @return \Bux\AdvertiseBundle\Entity\VideoCredits 
     */
    public function getVideoCredits()
    {
        return $this->videoCredits;
    }

    /**
     * Set pollCredits
     *
     * @param \Bux\AdvertiseBundle\Entity\PollCredits $pollCredits
     *
     * @return User
     */
    public function setPollCredits(PollCredits $pollCredits = null)
    {
        $this->pollCredits = $pollCredits;

        return $this;
    }

    /**
     * Get pollCredits
     *
     * @return \Bux\AdvertiseBundle\Entity\PollCredits
     */
    public function getPollCredits()
    {
        return $this->pollCredits;
    }

    /**
     * Set autoSerfCredits
     *
     * @param \Bux\AdvertiseBundle\Entity\AutoSerfCredits $autoSerfCredits
     *
     * @return User
     */
    public function setAutoSerfCredits(AutoSerfCredits $autoSerfCredits = null)
    {
        $this->autoSerfCredits = $autoSerfCredits;

        return $this;
    }

    /**
     * Get autoSerfCredits
     *
     * @return \Bux\AdvertiseBundle\Entity\AutoSerfCredits
     */
    public function getAutoSerfCredits()
    {
        return $this->autoSerfCredits;
    }

    /**
     * Add videoAds
     *
     * @param \Bux\AdvertiseBundle\Entity\VideoAd $videoAds
     *
     * @return User
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
     * Add pollAds
     *
     * @param \Bux\AdvertiseBundle\Entity\PollAd $pollAds
     *
     * @return User
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
     * Add autoSerfAds
     *
     * @param \Bux\AdvertiseBundle\Entity\AutoSerfAd $autoSerfAds
     *
     * @return User
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
        $this->pollAds->removeElement($autoSerfAds);
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

    /**
     * Add rentReferrals
     *
     * @param \Bux\Admin\UtilitiesBundle\Entity\ReferralBot $rentReferrals
     *
     * @return User
     */
    public function addRentReferral(ReferralBot $rentReferrals)
    {
        $this->rentReferrals[] = $rentReferrals;

        return $this;
    }

    /**
     * Remove rentReferrals
     *
     * @param \Bux\Admin\UtilitiesBundle\Entity\ReferralBot $rentReferrals
     */
    public function removeRentReferral(ReferralBot $rentReferrals)
    {
        $this->rentReferrals->removeElement($rentReferrals);
    }

    /**
     * Get rentReferrals
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getRentReferrals()
    {
        return $this->rentReferrals;
    }

    /**
     * Set sponsor
     *
     * @param \Bux\UserBundle\Entity\User $sponsor
     *
     * @return User
     */
    public function setSponsor(User $sponsor = null)
    {
        $this->sponsor = $sponsor;

        return $this;
    }

    /**
     * Get sponsor
     *
     * @return \Bux\UserBundle\Entity\User 
     */
    public function getSponsor()
    {
        return $this->sponsor;
    }

    /**
     * Add pollStatistic
     *
     * @param \Bux\StatisticBundle\Entity\PollCompleteStatistic $pollStatistic
     *
     * @return User
     */
    public function addPollStatistic(PollCompleteStatistic $pollStatistic)
    {
        $this->pollStatistic[] = $pollStatistic;

        return $this;
    }

    /**
     * Remove pollStatistic
     *
     * @param \Bux\StatisticBundle\Entity\PollCompleteStatistic $pollStatistic
     */
    public function removePollStatistic(PollCompleteStatistic $pollStatistic)
    {
        $this->pollStatistic->removeElement($pollStatistic);
    }

    /**
     * Get pollStatistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getPollStatistic()
    {
        return $this->pollStatistic;
    }

    /**
     * Set blogSettings
     *
     * @param \Bux\BlogBundle\Entity\BlogUserSettings $blogSettings
     *
     * @return User
     */
    public function setBlogSettings(BlogUserSettings $blogSettings = null)
    {
        $this->blogSettings = $blogSettings;

        return $this;
    }

    /**
     * Get blogSettings
     *
     * @return \Bux\BlogBundle\Entity\BlogUserSettings 
     */
    public function getBlogSettings()
    {
        return $this->blogSettings;
    }

    /**
     * Add autoSerfStatistic
     *
     * @param \Bux\StatisticBundle\Entity\AutoSerfCompleteStatistic $autoSerfStatistic
     *
     * @return User
     */
    public function addAutoSerfStatistic(AutoSerfCompleteStatistic $autoSerfStatistic)
    {
        $this->autoSerfStatistic[] = $autoSerfStatistic;

        return $this;
    }

    /**
     * Remove autoSerfStatistic
     *
     * @param \Bux\StatisticBundle\Entity\AutoSerfCompleteStatistic $autoSerfStatistic
     */
    public function removeAutoSerfStatistic(AutoSerfCompleteStatistic $autoSerfStatistic)
    {
        $this->autoSerfStatistic->removeElement($autoSerfStatistic);
    }

    /**
     * Get autoSerfStatistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getAutoSerfStatistic()
    {
        return $this->autoSerfStatistic;
    }

    /**
     * Set autoSerfSeconds
     *
     * @param integer $autoSerfSeconds
     *
     * @return User
     */
    public function setAutoSerfSeconds($autoSerfSeconds)
    {
        $this->autoSerfSeconds = $autoSerfSeconds;

        return $this;
    }

    /**
     * Get autoSerfSeconds
     *
     * @return integer 
     */
    public function getAutoSerfSeconds()
    {
        return $this->autoSerfSeconds;
    }

    /**
     * Add videoStatistic
     *
     * @param \Bux\StatisticBundle\Entity\VideoCompleteStatistic $videoStatistic
     *
     * @return User
     */
    public function addVideoStatistic(VideoCompleteStatistic $videoStatistic)
    {
        $this->videoStatistic[] = $videoStatistic;

        return $this;
    }

    /**
     * Remove videoStatistic
     *
     * @param \Bux\StatisticBundle\Entity\VideoCompleteStatistic $videoStatistic
     */
    public function removeVideoStatistic(VideoCompleteStatistic $videoStatistic)
    {
        $this->videoStatistic->removeElement($videoStatistic);
    }

    /**
     * Get videoStatistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getVideoStatistic()
    {
        return $this->videoStatistic;
    }

    /**
     * Add bannerAds
     *
     * @param \Bux\AdvertiseBundle\Entity\BannerAd $bannerAds
     *
     * @return User
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
     * Add bannerStatistic
     *
     * @param \Bux\StatisticBundle\Entity\BannerCompleteStatistic $bannerStatistic
     *
     * @return User
     */
    public function addBannerStatistic(BannerCompleteStatistic $bannerStatistic)
    {
        $this->bannerStatistic[] = $bannerStatistic;

        return $this;
    }

    /**
     * Remove bannerStatistic
     *
     * @param \Bux\StatisticBundle\Entity\BannerCompleteStatistic $bannerStatistic
     */
    public function removeBannerStatistic(BannerCompleteStatistic $bannerStatistic)
    {
        $this->bannerStatistic->removeElement($bannerStatistic);
    }

    /**
     * Get bannerStatistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBannerStatistic()
    {
        return $this->bannerStatistic;
    }

    /**
     * Set bannerCredits
     *
     * @param \Bux\AdvertiseBundle\Entity\BannerCredits $bannerCredits
     *
     * @return User
     */
    public function setBannerCredits(BannerCredits $bannerCredits = null)
    {
        $this->bannerCredits = $bannerCredits;

        return $this;
    }

    /**
     * Get bannerCredits
     *
     * @return \Bux\AdvertiseBundle\Entity\BannerCredits 
     */
    public function getBannerCredits()
    {
        return $this->bannerCredits;
    }

    /**
     * Set bigBannerCredits
     *
     * @param \Bux\AdvertiseBundle\Entity\BigBannerCredits $bigBannerCredits
     *
     * @return User
     */
    public function setBigBannerCredits(BigBannerCredits $bigBannerCredits = null)
    {
        $this->bigBannerCredits = $bigBannerCredits;

        return $this;
    }

    /**
     * Get bigBannerCredits
     *
     * @return \Bux\AdvertiseBundle\Entity\BigBannerCredits 
     */
    public function getBigBannerCredits()
    {
        return $this->bigBannerCredits;
    }

    /**
     * Add bigBannerAds
     *
     * @param \Bux\AdvertiseBundle\Entity\BigBannerAd $bigBannerAds
     *
     * @return User
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
     * Add bigBannerStatistic
     *
     * @param \Bux\StatisticBundle\Entity\BigBannerCompleteStatistic $bigBannerStatistic
     *
     * @return User
     */
    public function addBigBannerStatistic(BigBannerCompleteStatistic $bigBannerStatistic)
    {
        $this->bigBannerStatistic[] = $bigBannerStatistic;

        return $this;
    }

    /**
     * Remove bigBannerStatistic
     *
     * @param \Bux\StatisticBundle\Entity\BigBannerCompleteStatistic $bigBannerStatistic
     */
    public function removeBigBannerStatistic(BigBannerCompleteStatistic $bigBannerStatistic)
    {
        $this->bigBannerStatistic->removeElement($bigBannerStatistic);
    }

    /**
     * Get bigBannerStatistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBigBannerStatistic()
    {
        return $this->bigBannerStatistic;
    }

    /**
     * Add adBonusUserFrom
     *
     * @param \Bux\StatisticBundle\Entity\AdBonusStatistic $adBonusUserFrom
     *
     * @return User
     */
    public function addAdBonusUserFrom(AdBonusStatistic $adBonusUserFrom)
    {
        $this->adBonusUserFrom[] = $adBonusUserFrom;

        return $this;
    }

    /**
     * Remove adBonusUserFrom
     *
     * @param \Bux\StatisticBundle\Entity\AdBonusStatistic $adBonusUserFrom
     */
    public function removeAdBonusUserFrom(AdBonusStatistic $adBonusUserFrom)
    {
        $this->adBonusUserFrom->removeElement($adBonusUserFrom);
    }

    /**
     * Get adBonusUserFrom
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getAdBonusUserFrom()
    {
        return $this->adBonusUserFrom;
    }

    /**
     * Add adBonusUserTo
     *
     * @param \Bux\StatisticBundle\Entity\AdBonusStatistic $adBonusUserTo
     *
     * @return User
     */
    public function addAdBonusUserTo(AdBonusStatistic $adBonusUserTo)
    {
        $this->adBonusUserTo[] = $adBonusUserTo;

        return $this;
    }

    /**
     * Remove adBonusUserTo
     *
     * @param \Bux\StatisticBundle\Entity\AdBonusStatistic $adBonusUserTo
     */
    public function removeAdBonusUserTo(AdBonusStatistic $adBonusUserTo)
    {
        $this->adBonusUserTo->removeElement($adBonusUserTo);
    }

    /**
     * Get adBonusUserTo
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getAdBonusUserTo()
    {
        return $this->adBonusUserTo;
    }

    /**
     * Add incomeStatistic
     *
     * @param \Bux\StatisticBundle\Entity\UserIncomeStatistic $incomeStatistic
     *
     * @return User
     */
    public function addIncomeStatistic(UserIncomeStatistic $incomeStatistic)
    {
        $this->incomeStatistic[] = $incomeStatistic;

        return $this;
    }

    /**
     * Remove incomeStatistic
     *
     * @param \Bux\StatisticBundle\Entity\UserIncomeStatistic $incomeStatistic
     */
    public function removeIncomeStatistic(UserIncomeStatistic $incomeStatistic)
    {
        $this->incomeStatistic->removeElement($incomeStatistic);
    }

    /**
     * Get incomeStatistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getIncomeStatistic()
    {
        return $this->incomeStatistic;
    }

    /**
     * Set surveyWalletBalance
     *
     * @param \Bux\WalletBundle\Entity\SurveyWalletBalance $surveyWalletBalance
     *
     * @return User
     */
    public function setSurveyWalletBalance(SurveyWalletBalance $surveyWalletBalance = null)
    {
        $this->surveyWalletBalance = $surveyWalletBalance;

        return $this;
    }

    /**
     * Get surveyWalletBalance
     *
     * @return \Bux\WalletBundle\Entity\SurveyWalletBalance 
     */
    public function getSurveyWalletBalance()
    {
        return $this->surveyWalletBalance;
    }

    /**
     * Set surveyWalletAvailableBalance
     *
     * @param \Bux\WalletBundle\Entity\SurveyWalletAvailableBalance $surveyWalletAvailableBalance
     *
     * @return User
     */
    public function setSurveyWalletAvailableBalance(SurveyWalletAvailableBalance $surveyWalletAvailableBalance = null)
    {
        $this->surveyWalletAvailableBalance = $surveyWalletAvailableBalance;

        return $this;
    }

    /**
     * Get surveyWalletAvailableBalance
     *
     * @return \Bux\WalletBundle\Entity\SurveyWalletAvailableBalance 
     */
    public function getSurveyWalletAvailableBalance()
    {
        return $this->surveyWalletAvailableBalance;
    }

    /**
     * Set membershipEndDate
     *
     * @param \DateTime $membershipEndDate
     *
     * @return User
     */
    public function setMembershipEndDate($membershipEndDate)
    {
        $this->membershipEndDate = $membershipEndDate;

        return $this;
    }

    /**
     * Get membershipEndDate
     *
     * @return \DateTime 
     */
    public function getMembershipEndDate()
    {
        return $this->membershipEndDate;
    }
}
