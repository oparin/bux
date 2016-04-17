<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/29/15
 * Time: 3:46 PM
 */

namespace Bux\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class WithdrawSettings
 *
 * @package Bux\UserBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_withdraw_settings")
 */
class WithdrawSettings
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="Bux\UserBundle\Entity\Membership", inversedBy="withdrawSettings")
     * @ORM\JoinColumn(name="membership_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $membership;

    /**
     * @ORM\Column(type="decimal", scale=2, name="max_in_day")
     */
    protected $maxInDay;

    /**
     * @ORM\Column(type="decimal", scale=2, name="min_payout")
     */
    protected $minPayout;

    /**
     * @ORM\Column(type="smallint", name="cashout_time")
     */
    protected $cashoutTime;

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
     * Set maxInDay
     *
     * @param string $maxInDay
     *
     * @return WithdrawSettings
     */
    public function setMaxInDay($maxInDay)
    {
        $this->maxInDay = $maxInDay;

        return $this;
    }

    /**
     * Get maxInDay
     *
     * @return string 
     */
    public function getMaxInDay()
    {
        return $this->maxInDay;
    }

    /**
     * Set minPayout
     *
     * @param string $minPayout
     *
     * @return WithdrawSettings
     */
    public function setMinPayout($minPayout)
    {
        $this->minPayout = $minPayout;

        return $this;
    }

    /**
     * Get minPayout
     *
     * @return string 
     */
    public function getMinPayout()
    {
        return $this->minPayout;
    }

    /**
     * Set membership
     *
     * @param \Bux\UserBundle\Entity\Membership $membership
     * 
     * @return WithdrawSettings
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
     * Set cashoutTime
     *
     * @param integer $cashoutTime
     *
     * @return WithdrawSettings
     */
    public function setCashoutTime($cashoutTime)
    {
        $this->cashoutTime = $cashoutTime;

        return $this;
    }

    /**
     * Get cashoutTime
     *
     * @return integer 
     */
    public function getCashoutTime()
    {
        return $this->cashoutTime;
    }
}
