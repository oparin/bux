<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/17/15
 * Time: 4:17 PM
 */

namespace Bux\StatisticBundle\Entity;

use Bux\AdvertiseBundle\Entity\AutoSerfAd;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class AutoSerfCompleteStatistic
 *
 * @package Bux\StatisticBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_autoserf_statistic")
 */
class AutoSerfCompleteStatistic
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\AdvertiseBundle\Entity\AutoSerfAd", inversedBy="statistic")
     * @ORM\JoinColumn(name="ad_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $ad;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="autoSerfStatistic")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $user;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $date;

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
     * Set date
     *
     * @param \DateTime $date
     *
     * @return AutoSerfCompleteStatistic
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set ad
     *
     * @param \Bux\AdvertiseBundle\Entity\AutoSerfAd $ad
     *
     * @return AutoSerfCompleteStatistic
     */
    public function setAd(AutoSerfAd $ad = null)
    {
        $this->ad = $ad;

        return $this;
    }

    /**
     * Get ad
     *
     * @return \Bux\AdvertiseBundle\Entity\AutoSerfAd 
     */
    public function getAd()
    {
        return $this->ad;
    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return AutoSerfCompleteStatistic
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
}
