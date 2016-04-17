<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/18/15
 * Time: 5:45 PM
 */

namespace Bux\StatisticBundle\Entity;

use Bux\AdvertiseBundle\Entity\VideoAd;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class VideoCompleteStatistic
 *
 * @package Bux\StatisticBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_video_statistic")
 */
class VideoCompleteStatistic
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\AdvertiseBundle\Entity\VideoAd", inversedBy="statistic")
     * @ORM\JoinColumn(name="ad_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $ad;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="videoStatistic")
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
     * @return VideoCompleteStatistic
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
     * @param \Bux\AdvertiseBundle\Entity\VideoAd $ad
     *
     * @return VideoCompleteStatistic
     */
    public function setAd(VideoAd $ad = null)
    {
        $this->ad = $ad;

        return $this;
    }

    /**
     * Get ad
     *
     * @return \Bux\AdvertiseBundle\Entity\VideoAd 
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
     * @return VideoCompleteStatistic
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
