<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/11/15
 * Time: 5:22 PM
 */

namespace Bux\StatisticBundle\EventListener;

use Bux\EarnMoneyBundle\Event\PollEvent;
use Bux\StatisticBundle\Entity\PollCompleteStatistic;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Validator\Constraints\DateTime;

/**
 * Class PollListener
 *
 * @package Bux\StatisticBundle\EventListener
 */
class PollListener
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
     * @param PollEvent $event
     */
    public function savePollComplete(PollEvent $event)
    {
        $ad     = $event->getAd();
        $user   = $event->getUser();

        $ad->setOutside($ad->getOutside() + 1);

        $statistic = new PollCompleteStatistic();
        $statistic->setAd($ad);
        $statistic->setUser($user);
        $statistic->setDate(new \DateTime());
        $this->em->persist($statistic);

        $this->em->flush();
    }
}