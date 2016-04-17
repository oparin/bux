<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/18/15
 * Time: 12:29 PM
 */

namespace Bux\EarnMoneyBundle\EventListener;

use Bux\AdvertiseBundle\Entity\AutoSerfAd;
use Bux\EarnMoneyBundle\Event\AutoSerfEvent;
use Bux\StatisticBundle\Entity\AdBonusStatistic;
use Bux\UserBundle\Entity\User;
use Doctrine\ORM\EntityManager;

/**
 * Class AutoSerfListener
 *
 * @package Bux\EarnMoneyBundle\EventListener
 */
class AutoSerfListener
{
    protected $em;

    /**
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * @param AutoSerfEvent $event
     */
    public function setCommission(AutoSerfEvent $event)
    {
        /* @var $user User */
        $user   = $event->getUser();
        $member = $user;

        /* @var $ad AutoSerfAd */
        $ad     = $event->getAd();

        $ad->setCredits($ad->getCredits() - $ad->getCategory()->getCredits());

        $time = $user->getAutoSerfSeconds();
        $user->setAutoSerfSeconds($time + $ad->getCategory()->getSeconds());

//        $level = 0;
//        while ($sponsor = $user->getSponsor()) {
//            $level++;
//            $membership = $sponsor->getMembership();
//            $marketing = $this->em->getRepository('BuxAdminSetupBundle:MarketingSettings')->findOneBy(array(
//                'membership'    => $membership,
//                'level'         => $level
//            ));
//            if ($marketing) {
//                $sponsorTime = $sponsor->getAutoSerfSeconds();
//                $percent = $ad->getCategory()->getSeconds() * $marketing->getCommission() / 100;
//                $user->setAutoSerfSeconds($sponsorTime + $percent);
//
//                // Save statistic
//                $statistic = new AdBonusStatistic();
//                $statistic->setUserFrom($member);
//                $statistic->getUserTo($sponsor);
//                $statistic->setLevel($level);
//                $statistic->setSum($percent);
//                $this->em->persist($statistic);
//            }
//            $user = $sponsor;
//        }

        $this->em->flush();
    }
}