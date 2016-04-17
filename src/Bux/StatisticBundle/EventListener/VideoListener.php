<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/19/15
 * Time: 5:01 PM
 */

namespace Bux\StatisticBundle\EventListener;

use Bux\EarnMoneyBundle\Event\VideoEvent;
use Bux\StatisticBundle\Entity\VideoCompleteStatistic;
use Doctrine\ORM\EntityManager;

/**
 * Class VideoListener
 *
 * @package Bux\StatisticBundle\EventListener
 */
class VideoListener
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
     * @param VideoEvent $event
     */
    public function saveVideoComplete(VideoEvent $event)
    {
        $ad     = $event->getAd();
        $user   = $event->getUser();

        $ad->setOutside($ad->getOutside() + 1);

        $statistic = new VideoCompleteStatistic();
        $statistic->setAd($ad);
        $statistic->setUser($user);
        $statistic->setDate(new \DateTime());
        $this->em->persist($statistic);

        $this->em->flush();
    }
}