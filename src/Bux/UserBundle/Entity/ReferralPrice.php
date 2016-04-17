<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/29/15
 * Time: 11:49 AM
 */

namespace Bux\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class ReferralPrice
 *
 * @package Bux\UserBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_referral_price")
 */
class ReferralPrice
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\Membership", inversedBy="referralPrice")
     * @ORM\JoinColumn(name="membership_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $membership;

    /**
     * @ORM\Column(type="smallint")
     */
    protected $minRef;

    /**
     * @ORM\Column(type="smallint")
     */
    protected $maxRef;

    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    protected $monthly;

    /**
     * @ORM\Column(type="decimal", scale=3)
     */
    protected $autopay;


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
     * Set minRef
     *
     * @param integer $minRef
     *
     * @return ReferralPrice
     */
    public function setMinRef($minRef)
    {
        $this->minRef = $minRef;

        return $this;
    }

    /**
     * Get minRef
     *
     * @return integer 
     */
    public function getMinRef()
    {
        return $this->minRef;
    }

    /**
     * Set maxRef
     *
     * @param integer $maxRef
     *
     * @return ReferralPrice
     */
    public function setMaxRef($maxRef)
    {
        $this->maxRef = $maxRef;

        return $this;
    }

    /**
     * Get maxRef
     *
     * @return integer 
     */
    public function getMaxRef()
    {
        return $this->maxRef;
    }

    /**
     * Set monthly
     *
     * @param string $monthly
     *
     * @return ReferralPrice
     */
    public function setMonthly($monthly)
    {
        $this->monthly = $monthly;

        return $this;
    }

    /**
     * Get monthly
     *
     * @return string 
     */
    public function getMonthly()
    {
        return $this->monthly;
    }

    /**
     * Set autopay
     *
     * @param string $autopay
     *
     * @return ReferralPrice
     */
    public function setAutopay($autopay)
    {
        $this->autopay = $autopay;

        return $this;
    }

    /**
     * Get autopay
     *
     * @return string 
     */
    public function getAutopay()
    {
        return $this->autopay;
    }

    /**
     * Set membership
     *
     * @param \Bux\UserBundle\Entity\Membership $membership
     *
     * @return ReferralPrice
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
}
