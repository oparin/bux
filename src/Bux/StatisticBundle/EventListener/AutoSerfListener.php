<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/17/15
 * Time: 4:14 PM
 */

namespace Bux\StatisticBundle\EventListener;

use Bux\EarnMoneyBundle\Event\AutoSerfEvent;
use Bux\StatisticBundle\Entity\AutoSerfCompleteStatistic;
use Doctrine\ORM\EntityManager;

/**
 * Class AutoSerfListener
 *
 * @package Bux\StatisticBundle\EventListener
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
    public function saveAutoSerfComplete(AutoSerfEvent $event)
    {
        $ad     = $event->getAd();
        $user   = $event->getUser();

        $ad->setOutside($ad->getOutside() + 1);

        $statistic = new AutoSerfCompleteStatistic();
        $statistic->setAd($ad);
        $statistic->setUser($user);
        $statistic->setDate(new \DateTime());
        $this->em->persist($statistic);

        $this->em->flush();
    }
}