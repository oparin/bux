<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/7/15
 * Time: 1:37 PM
 */

namespace Bux\StatisticBundle\Event;

use Bux\UserBundle\Entity\User;
use Bux\WalletBundle\Entity\PaymentMethod;
use Symfony\Component\EventDispatcher\Event;

/**
 * Class WalletEvent
 *
 * @package Bux\StatisticBundle\Event
 */
class WalletEvent extends Event
{
    protected $user;
    protected $paymentMethod;
    protected $amount;
	protected $account;
	protected $paymentId;

    /**
     * @param User          $user
     * @param PaymentMethod $paymentMethod
     * @param float         $amount
     */
    public function __construct(User $user, PaymentMethod $paymentMethod, $amount, $account = null, $paymentId = null)
    {
        $this->user             = $user;
        $this->paymentMethod    = $paymentMethod;
        $this->amount           = $amount;
		$this->account          = $account;
		$this->paymentId        = $paymentId;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @return PaymentMethod
     */
    public function getPaymentMethod()
    {
        return $this->paymentMethod;
    }

    /**
     * @return float
     */
    public function getAmount()
    {
        return $this->amount;
    }
	
	/**
     * @return float
     */
    public function getAccount()
    {
        return $this->account;
    }
	
	/**
     * @return float
     */
    public function getPaymentId()
    {
        return $this->paymentId;
    }
}