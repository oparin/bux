<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/19/15
 * Time: 4:57 PM
 */

namespace Bux\EarnMoneyBundle\Event;

use Bux\AdvertiseBundle\Entity\VideoAd;
use Bux\UserBundle\Entity\User;
use Symfony\Component\EventDispatcher\Event;

/**
 * Class VideoEvent
 *
 * @package Bux\EarnMoneyBundle\Event
 */
class VideoEvent extends Event
{
    protected $ad;
    protected $user;

    /**
     * @param VideoAd $ad
     * @param User    $user
     */
    public function __construct(VideoAd $ad, User $user)
    {
        $this->ad   = $ad;
        $this->user = $user;
    }

    /**
     * @return VideoAd
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