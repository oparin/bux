<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/23/15
 * Time: 2:33 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class AutoSerfGeneralSettings
 *
 * @package Bux\Admin\AdvertisementsBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_ads_auto_serf_settings")
 */
class AutoSerfGeneralSettings
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="boolean", name="admin_approve")
     */
    protected $adminApprove;

    /**
     * @ORM\Column(type="boolean", name="auto_credits")
     */
    protected $autoCredits;

    /**
     * @ORM\Column(type="integer", name="max_title")
     */
    protected $maxTitle;

    /**
     * @ORM\Column(type="boolean", name="click_in_day")
     */
    protected $clickInDay;

    /**
     * @ORM\Column(type="decimal", scale=3, name="price_minute")
     */
    protected $priceMinute = 0.000;

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
     * Set adminApprove
     *
     * @param boolean $adminApprove
     *
     * @return VideoGeneralSettings
     */
    public function setAdminApprove($adminApprove)
    {
        $this->adminApprove = $adminApprove;

        return $this;
    }

    /**
     * Get adminApprove
     *
     * @return boolean
     */
    public function getAdminApprove()
    {
        return $this->adminApprove;
    }

    /**
     * Set autoCredits
     *
     * @param boolean $autoCredits
     *
     * @return VideoGeneralSettings
     */
    public function setAutoCredits($autoCredits)
    {
        $this->autoCredits = $autoCredits;

        return $this;
    }

    /**
     * Get autoCredits
     *
     * @return boolean
     */
    public function getAutoCredits()
    {
        return $this->autoCredits;
    }

    /**
     * Set maxTitle
     *
     * @param integer $maxTitle
     *
     * @return VideoGeneralSettings
     */
    public function setMaxTitle($maxTitle)
    {
        $this->maxTitle = $maxTitle;

        return $this;
    }

    /**
     * Get maxTitle
     *
     * @return integer
     */
    public function getMaxTitle()
    {
        return $this->maxTitle;
    }

    /**
     * Set clickInDay
     *
     * @param boolean $clickInDay
     *
     * @return VideoGeneralSettings
     */
    public function setClickInDay($clickInDay)
    {
        $this->clickInDay = $clickInDay;

        return $this;
    }

    /**
     * Get clickInDay
     *
     * @return boolean
     */
    public function getClickInDay()
    {
        return $this->clickInDay;
    }

    /**
     * Set priceMinute
     *
     * @param string $priceMinute
     *
     * @return AutoSerfGeneralSettings
     */
    public function setPriceMinute($priceMinute)
    {
        $this->priceMinute = $priceMinute;

        return $this;
    }

    /**
     * Get priceMinute
     *
     * @return string 
     */
    public function getPriceMinute()
    {
        return $this->priceMinute;
    }
}
