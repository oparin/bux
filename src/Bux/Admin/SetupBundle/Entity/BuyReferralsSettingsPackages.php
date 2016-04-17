<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/3/15
 * Time: 1:18 PM
 */

namespace Bux\Admin\SetupBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class BuyReferralsSettingsPackages
 *
 * @package Bux\Admin\SetupBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_buy_referrals_settings_packages")
 */
class BuyReferralsSettingsPackages
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
    protected $referrals;

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
     * Set referrals
     *
     * @param integer $referrals
     *
     * @return BuyReferralsSettingsPackages
     */
    public function setReferrals($referrals)
    {
        $this->referrals = $referrals;

        return $this;
    }

    /**
     * Get referrals
     *
     * @return integer 
     */
    public function getReferrals()
    {
        return $this->referrals;
    }

    /**
     * Set price
     *
     * @param string $price
     *
     * @return BuyReferralsSettingsPackages
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
