<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/28/15
 * Time: 11:11 AM
 */

namespace Bux\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class RentReferral
 *
 * @package Bux\UserBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_rent_referral")
 */
class RentReferral
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="Bux\UserBundle\Entity\Membership", inversedBy="rentReferral")
     * @ORM\JoinColumn(name="membership_id", referencedColumnName="id")
     */
    protected $membership;

    /**
     * @ORM\Column(type="string", name="ref_pack")
     */
    protected $refPack;

    /**
     * @ORM\Column(type="integer", name="ref_limit")
     */
    protected $refLimit;

    /**
     * @ORM\Column(type="decimal", scale=2, name="recycle_cost")
     */
    protected $recycleCost;

    /**
     * @ORM\Column(type="integer", scale=2, name="ref_time")
     */
    protected $refTime;

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
     * Set refPack
     *
     * @param string $refPack
     *
     * @return RentReferral
     */
    public function setRefPack($refPack)
    {
        $this->refPack = $refPack;

        return $this;
    }

    /**
     * Get refPack
     *
     * @return string 
     */
    public function getRefPack()
    {
        return $this->refPack;
    }

    /**
     * Set refLimit
     *
     * @param integer $refLimit
     *
     * @return RentReferral
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
     * Set recycleCost
     *
     * @param string $recycleCost
     *
     * @return RentReferral
     */
    public function setRecycleCost($recycleCost)
    {
        $this->recycleCost = $recycleCost;

        return $this;
    }

    /**
     * Get recycleCost
     *
     * @return string 
     */
    public function getRecycleCost()
    {
        return $this->recycleCost;
    }

    /**
     * Set refTime
     *
     * @param integer $refTime
     *
     * @return RentReferral
     */
    public function setRefTime($refTime)
    {
        $this->refTime = $refTime;

        return $this;
    }

    /**
     * Get refTime
     *
     * @return integer 
     */
    public function getRefTime()
    {
        return $this->refTime;
    }

    /**
     * Set membership
     *
     * @param \Bux\UserBundle\Entity\Membership $membership
     *
     * @return RentReferral
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
