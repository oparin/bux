<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/11/15
 * Time: 6:19 PM
 */

namespace Bux\EarnMoneyBundle\EventListener;

use Bux\EarnMoneyBundle\Event\PollEvent;
use Bux\StatisticBundle\Entity\AdBonusStatistic;
use Bux\StatisticBundle\Entity\UserIncomeStatistic;
use Bux\WalletBundle\Entity\SurveyWalletBalance;
use Doctrine\ORM\EntityManager;

/**
 * Class PollListener
 *
 * @package Bux\EarnMoneyBundle\EventListener
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
    public function setCommission(PollEvent $event)
    {
        $user   = $event->getUser();
        $ad     = $event->getAd();
        $member = $user;

        /* @var $wallet SurveyWalletBalance */
        $wallet = $user->getSurveyWalletBalance();
        $mySum  = $ad->getValue()->getValue() * $user->getMembership()->getPollClick() / 100;
        $wallet->setSum($wallet->getSum() + $mySum);

        // Save Income Statistic
        $income = new UserIncomeStatistic();
        $income->setUser($user);
        $income->setType(1);
        $income->setDate(new \DateTime());
        $income->setSum($mySum);
        $this->em->persist($income);

        if ($sponsor = $user->getSponsor()) {
            /* @var $sponsorWallet SurveyWalletBalance */
            $sponsorWallet = $sponsor->getWallet();
            $sponsorWallet->setSum($sponsorWallet->getSum() + ($mySum * $sponsor->getMembership()->getRefPollClick() / 100));
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
                $statistic->getUserTo($sponsor);
                $statistic->setLevel($level);
                $statistic->setSum($percent);
                $this->em->persist($statistic);
            }
            $user = $sponsor;
        }

        $this->em->flush();
    }
}