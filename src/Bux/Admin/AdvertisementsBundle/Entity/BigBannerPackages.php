<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 3:38 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class BigBannerPackages
 *
 * @package Bux\Admin\AdvertisementsBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_ads_big_banner_packages")
 */
class BigBannerPackages
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="integer")
     */
    protected $credits;

    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    protected $price;

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
     * Set credits
     *
     * @param integer $credits
     *
     * @return BigBannerPackages
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
     * Set price
     *
     * @param string $price
     *
     * @return BigBannerPackages
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
}
