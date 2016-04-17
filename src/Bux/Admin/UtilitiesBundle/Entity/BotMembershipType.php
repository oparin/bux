<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/2/15
 * Time: 5:09 PM
 */

namespace Bux\Admin\UtilitiesBundle\Entity;

use Bux\UserBundle\Entity\Membership;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class BotMembershipType
 *
 * @package Bux\Admin\UtilitiesBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_referrals_bots_membership_type")
 */
class BotMembershipType
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\Admin\UtilitiesBundle\Entity\BotType", inversedBy="botMembershipType")
     * @ORM\JoinColumn(name="bot_type_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $botType;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\Membership", inversedBy="botMembershipType")
     * @ORM\JoinColumn(name="membership_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $membership;

    /**
     * @ORM\Column(type="smallint")
     */
    protected $percent;

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
     * Set percent
     *
     * @param integer $percent
     *
     * @return BotMembershipType
     */
    public function setPercent($percent)
    {
        $this->percent = $percent;

        return $this;
    }

    /**
     * Get percent
     *
     * @return integer 
     */
    public function getPercent()
    {
        return $this->percent;
    }

    /**
     * Set botType
     *
     * @param \Bux\Admin\UtilitiesBundle\Entity\BotType $botType
     *
     * @return BotMembershipType
     */
    public function setBotType(BotType $botType = null)
    {
        $this->botType = $botType;

        return $this;
    }

    /**
     * Get botType
     *
     * @return \Bux\Admin\UtilitiesBundle\Entity\BotType 
     */
    public function getBotType()
    {
        return $this->botType;
    }

    /**
     * Set membership
     *
     * @param \Bux\UserBundle\Entity\Membership $membership
     *
     * @return BotMembershipType
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
