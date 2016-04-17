<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 3:59 PM
 */

namespace Bux\AdvertiseBundle\Entity;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class BigBannerCredits
 *
 * @package Bux\AdvertiseBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_advertise_big_banner_credits")
 */
class BigBannerCredits
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="bigBannerCredits")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $user;

    /**
     * @ORM\Column(type="integer")
     */
    protected $credits = 0;

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
     * Set credits
     *
     * @param integer $credits
     *
     * @return BigBannerCredits
     */
    public function setCredits($credits)
    {
        $this->credits = $credits;

        return $this;
    }

    /**
     * Get credits
     *
     * @return integer 
     */
    public function getCredits()
    {
        return $this->credits;
    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return BigBannerCredits
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
