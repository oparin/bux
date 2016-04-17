<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/7/15
 * Time: 1:46 PM
 */

namespace Bux\StatisticBundle\EventListener;

use Bux\StatisticBundle\Entity\DepositStatistic;
use Bux\StatisticBundle\Event\WalletEvent;
use Doctrine\ORM\EntityManager;

/**
 * Class WalletListener
 *
 * @package Bux\StatisticBundle\EventListener
 */
class WalletListener
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
     * @param WalletEvent $event
     */
    public function purchaseDeposit(WalletEvent $event)
    {
        $user   = $event->getUser();
        $method = $event->getPaymentMethod();
        $amount = $event->getAmount();
		
		
		$account = $event->getAccount();
		$paymentId = $event->getPaymentId();

        $depositStatistic = new DepositStatistic();
        $depositStatistic->setDate(new \DateTime());
        $depositStatistic->setUser($user);
        $depositStatistic->setAmount($amount);
        $depositStatistic->setPaymentMethod($method);
		if ($account) {
            $depositStatistic->setAccount($account);
		} else {
		    $depositStatistic->setAccount('789');
		}
		if ($paymentId) {
            $depositStatistic->setPaymentID($paymentId);
		} else {
		    $depositStatistic->setPaymentID('789');
		}
        $this->em->persist($depositStatistic);
        $this->em->flush();
    }
}