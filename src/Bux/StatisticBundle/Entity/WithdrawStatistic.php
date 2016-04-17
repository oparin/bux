<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/8/15
 * Time: 11:06 AM
 */

namespace Bux\StatisticBundle\Entity;

use Bux\UserBundle\Entity\User;
use Bux\WalletBundle\Entity\PaymentMethod;
use Doctrine\ORM\Mapping as ORM;
use APY\DataGridBundle\Grid\Mapping as GRID;

/**
 * Class WithdrawStatistic
 *
 * @package Bux\StatisticBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_withdraw_statistic")
 */
class WithdrawStatistic
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $date;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="withdrawStatistic", cascade={"persist"})
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $user;

    /**
     * @ORM\Column(type="decimal", scale=5)
     */
    protected $amount;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\WalletBundle\Entity\PaymentMethod", inversedBy="withdrawStatistic", cascade={"persist"})
     * @ORM\JoinColumn(name="payment_method_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $paymentMethod;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $account;

    /**
     * 0 - pending
     * 1 - completed
     * 2 - canceled
     * 3 - refund
     *
     * @ORM\Column(type="smallint")
     *
     * @GRID\Column(title="Status", type="withdraw_status", filter="select", selectFrom="values", values={"0"="Pending","1"="Completed","2"="Canceled","3"="Refund"})
     */
    protected $status = 0;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return WithdrawStatistic
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set amount
     *
     * @param string $amount
     *
     * @return WithdrawStatistic
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get amount
     *
     * @return string 
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * Set account
     *
     * @param string $account
     *
     * @return WithdrawStatistic
     */
    public function setAccount($account)
    {
        $this->account = $account;

        return $this;
    }

    /**
     * Get account
     *
     * @return string 
     */
    public function getAccount()
    {
        return $this->account;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return WithdrawStatistic
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return WithdrawStatistic
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Bux\UserBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set paymentMethod
     *
     * @param \Bux\WalletBundle\Entity\PaymentMethod $paymentMethod
     *
     * @return WithdrawStatistic
     */
    public function setPaymentMethod(PaymentMethod $paymentMethod = null)
    {
        $this->paymentMethod = $paymentMethod;

        return $this;
    }

    /**
     * Get paymentMethod
     *
     * @return \Bux\WalletBundle\Entity\PaymentMethod 
     */
    public function getPaymentMethod()
    {
        return $this->paymentMethod;
    }
}
