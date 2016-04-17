<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/11/15
 * Time: 5:04 PM
 */

namespace Bux\EarnMoneyBundle\Event;

use Bux\AdvertiseBundle\Entity\PollAd;
use Bux\UserBundle\Entity\User;
use Symfony\Component\EventDispatcher\Event;

/**
 * Class PollEvent
 *
 * @package Bux\EarnMoneyBundle\Event
 */
class PollEvent extends Event
{
    protected $ad;
    protected $user;

    /**
     * @param PollAd $pollAd
     * @param User   $user
     */
    public function __construct(PollAd $pollAd, User $user)
    {
        $this->ad   = $pollAd;
        $this->user = $user;
    }

    /**
     * @return PollAd
     */
    public function getAd()
    {
        return $this->ad;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }
}