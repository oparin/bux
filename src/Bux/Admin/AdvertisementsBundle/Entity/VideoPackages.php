<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/12/15
 * Time: 9:58 AM
 */

namespace Bux\Admin\AdvertisementsBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class VideoPackages
 *
 * @package Bux\Admin\AdvertisementsBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_ads_video_packages")
 */
class VideoPackages
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
     * @return VideoPackages
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
     * @return VideoPackages
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
