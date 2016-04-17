<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/19/15
 * Time: 5:42 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class BannerGeneralSettings
 *
 * @package Bux\Admin\AdvertisementsBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_ads_banner_settings")
 */
class BannerGeneralSettings
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $enabled;

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
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set enabled
     *
     * @param boolean $enabled
     *
     * @return BannerGeneralSettings
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;

        return $this;
    }

    /**
     * Get enabled
     *
     * @return boolean 
     */
    public function getEnabled()
    {
        return $this->enabled;
    }

    /**
     * Set adminApprove
     *
     * @param boolean $adminApprove
     *
     * @return BannerGeneralSettings
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
     * @return BannerGeneralSettings
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
     * @return BannerGeneralSettings
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
}
