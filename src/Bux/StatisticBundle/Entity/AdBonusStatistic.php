<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/23/15
 * Time: 3:22 PM
 */

namespace Bux\StatisticBundle\Entity;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class AdBonusStatistic
 *
 * @package Bux\StatisticBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_ad_bonus_statistic")
 */
class AdBonusStatistic
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="adBonusUserFrom")
     * @ORM\JoinColumn(name="user_from_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $userFrom;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="adBonusUserTo")
     * @ORM\JoinColumn(name="user_to_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $userTo;

    /**
     * @ORM\Column(type="smallint")
     */
    protected $level;

    /**
     * @ORM\Column(type="decimal", scale=3)
     */
    protected $sum;

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
     * @return AdBonusStatistic
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
     * Set sum
     *
     * @param string $sum
     *
     * @return AdBonusStatistic
     */
    public function setSum($sum)
    {
        $this->sum = $sum;

        return $this;
    }

    /**
     * Get sum
     *
     * @return string 
     */
    public function getSum()
    {
        return $this->sum;
    }

    /**
     * Set userFrom
     *
     * @param \Bux\UserBundle\Entity\User $userFrom
     *
     * @return AdBonusStatistic
     */
    public function setUserFrom(User $userFrom = null)
    {
        $this->userFrom = $userFrom;

        return $this;
    }

    /**
     * Get userFrom
     *
     * @return \Bux\UserBundle\Entity\User 
     */
    public function getUserFrom()
    {
        return $this->userFrom;
    }

    /**
     * Set userTo
     *
     * @param \Bux\UserBundle\Entity\User $userTo
     *
     * @return AdBonusStatistic
     */
    public function setUserTo(User $userTo = null)
    {
        $this->userTo = $userTo;

        return $this;
    }

    /**
     * Get userTo
     *
     * @return \Bux\UserBundle\Entity\User 
     */
    public function getUserTo()
    {
        return $this->userTo;
    }
}
