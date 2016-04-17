<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/17/15
 * Time: 4:05 PM
 */

namespace Bux\EarnMoneyBundle\Event;

use Bux\AdvertiseBundle\Entity\AutoSerfAd;
use Bux\UserBundle\Entity\User;
use Symfony\Component\EventDispatcher\Event;

/**
 * Class AutoSerfEvent
 *
 * @package Bux\EarnMoneyBundle\Event
 */
class AutoSerfEvent extends Event
{
    protected $ad;
    protected $user;

    /**
     * @param AutoSerfAd $ad
     * @param User       $user
     */
    public function __construct(AutoSerfAd $ad, User $user)
    {
        $this->ad   = $ad;
        $this->user = $user;
    }

    /**
     * @return AutoSerfAd
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