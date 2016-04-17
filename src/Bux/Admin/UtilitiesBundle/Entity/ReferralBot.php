<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/30/15
 * Time: 4:52 PM
 */

namespace Bux\Admin\UtilitiesBundle\Entity;

use Bux\StatisticBundle\Entity\ReferralBotStatistic;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class ReferralBot
 *
 * @package Bux\Admin\UtilitiesBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_referrals_bots")
 */
class ReferralBot
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $name;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="rentReferrals")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $user;

    /**
     * @ORM\OneToOne(targetEntity="Bux\StatisticBundle\Entity\ReferralBotStatistic", mappedBy="referralBot", cascade={"remove"})
     */
    protected $statistic;

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
     * Set name
     *
     * @param string $name
     *
     * @return ReferralBot
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return ReferralBot
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Bux\UserBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set statistic
     *
     * @param \Bux\StatisticBundle\Entity\ReferralBotStatistic $statistic
     *
     * @return ReferralBot
     */
    public function setStatistic(ReferralBotStatistic $statistic = null)
    {
        $this->statistic = $statistic;

        return $this;
    }

    /**
     * Get statistic
     *
     * @return \Bux\StatisticBundle\Entity\ReferralBotStatistic 
     */
    public function getStatistic()
    {
        return $this->statistic;
    }
}
