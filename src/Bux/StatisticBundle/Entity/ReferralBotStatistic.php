<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/5/15
 * Time: 2:50 PM
 */

namespace Bux\StatisticBundle\Entity;

use Bux\Admin\UtilitiesBundle\Entity\ReferralBot;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class ReferralBotStatistic
 *
 * @package Bux\StatisticBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_referral_bot_statistic")
 */
class ReferralBotStatistic
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="Bux\Admin\UtilitiesBundle\Entity\ReferralBot", inversedBy="statistic")
     * @ORM\JoinColumn(name="referral_bot_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $referralBot;

    /**
     * @ORM\Column(type="datetime", name="ref_since", nullable=true)
     */
    protected $refSince;

    /**
     * @ORM\Column(type="integer")
     */
    protected $clicks = 0;

    /**
     * @ORM\Column(type="integer")
     */
    protected $videos = 0;

    /**
     * @ORM\Column(type="integer")
     */
    protected $polls = 0;

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
     * Set refSince
     *
     * @param \DateTime $refSince
     *
     * @return ReferralBotStatistic
     */
    public function setRefSince($refSince)
    {
        $this->refSince = $refSince;

        return $this;
    }

    /**
     * Get refSince
     *
     * @return \DateTime 
     */
    public function getRefSince()
    {
        return $this->refSince;
    }

    /**
     * Set clicks
     *
     * @param integer $clicks
     *
     * @return ReferralBotStatistic
     */
    public function setClicks($clicks)
    {
        $this->clicks = $clicks;

        return $this;
    }

    /**
     * Get clicks
     *
     * @return integer 
     */
    public function getClicks()
    {
        return $this->clicks;
    }

    /**
     * Set videos
     *
     * @param integer $videos
     *
     * @return ReferralBotStatistic
     */
    public function setVideos($videos)
    {
        $this->videos = $videos;

        return $this;
    }

    /**
     * Get videos
     *
     * @return integer 
     */
    public function getVideos()
    {
        return $this->videos;
    }

    /**
     * Set polls
     *
     * @param integer $polls
     *
     * @return ReferralBotStatistic
     */
    public function setPols($polls)
    {
        $this->polls = $polls;

        return $this;
    }

    /**
     * Get polls
     *
     * @return integer 
     */
    public function getPolls()
    {
        return $this->polls;
    }

    /**
     * Set referralBot
     *
     * @param \Bux\Admin\UtilitiesBundle\Entity\ReferralBot $referralBot
     *
     * @return ReferralBotStatistic
     */
    public function setReferralBot(ReferralBot $referralBot = null)
    {
        $this->referralBot = $referralBot;

        return $this;
    }

    /**
     * Get referralBot
     *
     * @return \Bux\Admin\UtilitiesBundle\Entity\ReferralBot 
     */
    public function getReferralBot()
    {
        return $this->referralBot;
    }

    /**
     * Set polls
     *
     * @param integer $polls
     * @return ReferralBotStatistic
     */
    public function setPolls($polls)
    {
        $this->polls = $polls;

        return $this;
    }
}
