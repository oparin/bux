<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/19/15
 * Time: 5:11 PM
 */

namespace Bux\EarnMoneyBundle\EventListener;

use Bux\EarnMoneyBundle\Event\VideoEvent;
use Bux\StatisticBundle\Entity\AdBonusStatistic;
use Bux\StatisticBundle\Entity\UserIncomeStatistic;
use Doctrine\ORM\EntityManager;

/**
 * Class VideoListener
 *
 * @package Bux\EarnMoneyBundle\EventListener
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
    public function setCommission(VideoEvent $event)
    {
        $user   = $event->getUser();
        $ad     = $event->getAd();
        $member = $user;

        $ad->setCredits($ad->getCredits() - $ad->getValue()->getCredits());

        $wallet = $user->getWallet();
        $mySum  = $ad->getValue()->getValue() * $user->getMembership()->getVideoClick() / 100;
        $wallet->setSum($wallet->getSum() + $mySum);

//        $string = 'username: ' . $user->getUsername() .  "\r\n";
//        $string .= 'status: ' . $user->getMembership()->getName() . "r/n/";
//        file_put_contents('test.txt', $string);

        // Save Income Statistic
        $income = new UserIncomeStatistic();
        $income->setUser($user);
        $income->setType(0);
        $income->setDate(new \DateTime());
        $income->setSum($mySum);
        $this->em->persist($income);

        if ($sponsor = $user->getSponsor()) {
            $sponsorWallet = $sponsor->getWallet();
            $sponsorWallet->setSum($sponsorWallet->getSum() + ($mySum * $sponsor->getMembership()->getRefVideoClick() / 100));
        }

        $level = 0;
        while ($sponsor = $user->getSponsor()) {
            $level++;
            $membership = $sponsor->getMembership();
            $marketing = $this->em->getRepository('BuxAdminSetupBundle:MarketingSettings')->findOneBy(array(
                'membership'    => $membership,
                'level'         => $level
            ));
            if ($marketing) {
                $sponsorWallet = $sponsor->getWallet();
                $percent = $mySum * $marketing->getCommission() / 100;
                $sponsorWallet->setSum($sponsorWallet->getSum() + $percent);

                // Save statistic
                $statistic = new AdBonusStatistic();
                $statistic->setUserFrom($member);
                $statistic->setUserTo($sponsor);
                $statistic->setLevel($level);
                $statistic->setSum($percent);
                $this->em->persist($statistic);
            }
            $user = $sponsor;
        }

        $this->em->flush();
    }
}