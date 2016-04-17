<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/11/15
 * Time: 11:31 AM
 */

namespace Bux\Admin\SetupBundle\Entity;

use Bux\UserBundle\Entity\Membership;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class MarketingSettings
 *
 * @package Bux\Admin\SetupBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_buy_marketing_settings")
 */
class MarketingSettings
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\Membership", inversedBy="levels")
     * @ORM\JoinColumn(name="membership_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $membership;

    /**
     * @ORM\Column(type="smallint")
     */
    protected $level;

    /**
     * @ORM\Column(type="smallint")
     */
    protected $commission;

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
     * Set level
     *
     * @param integer $level
     *
     * @return MarketingSettings
     */
    public function setLevel($level)
    {
        $this->level = $level;

        return $this;
    }

    /**
     * Get level
     *
     * @return integer 
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * Set commission
     *
     * @param integer $commission
     *
     * @return MarketingSettings
     */
    public function setCommission($commission)
    {
        $this->commission = $commission;

        return $this;
    }

    /**
     * Get commission
     *
     * @return integer 
     */
    public function getCommission()
    {
        return $this->commission;
    }

    /**
     * Set membership
     *
     * @param \Bux\UserBundle\Entity\Membership $membership
     *
     * @return MarketingSettings
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
