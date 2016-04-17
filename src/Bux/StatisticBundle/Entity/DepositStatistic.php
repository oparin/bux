<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/7/15
 * Time: 2:08 PM
 */

namespace Bux\StatisticBundle\Entity;

use Bux\UserBundle\Entity\User;
use Bux\WalletBundle\Entity\PaymentMethod;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class DepositStatistic
 *
 * @package Bux\StatisticBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_deposit_statistic")
 */
class DepositStatistic
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
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="depositStatistic", cascade={"persist"})
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $user;

    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    protected $amount;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\WalletBundle\Entity\PaymentMethod", inversedBy="depositStatistic", cascade={"persist"})
     * @ORM\JoinColumn(name="payment_method_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $paymentMethod;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $account;

    /**
     * @ORM\Column(type="string", name="payment_id", nullable=true)
     */
    protected $paymentID;

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
     * @return DepositStatistic
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
     * @return DepositStatistic
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
     * @return DepositStatistic
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
     * Set paymentID
     *
     * @param string $paymentID
     *
     * @return DepositStatistic
     */
    public function setPaymentID($paymentID)
    {
        $this->paymentID = $paymentID;

        return $this;
    }

    /**
     * Get paymentID
     *
     * @return string 
     */
    public function getPaymentID()
    {
        return $this->paymentID;
    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return DepositStatistic
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
     * @return DepositStatistic
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
