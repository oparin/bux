<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/6/15
 * Time: 6:02 PM
 */

namespace Bux\WalletBundle\Entity;

use Bux\StatisticBundle\Entity\DepositStatistic;
use Bux\StatisticBundle\Entity\WithdrawStatistic;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class PaymentMethod
 *
 * @package Bux\WalletBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_payment_method")
 */
class PaymentMethod
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\DepositStatistic", mappedBy="paymentMethod", cascade={"persist", "remove"})
     */
    protected $depositStatistic;

    /**
     * @ORM\OneToMany(targetEntity="Bux\StatisticBundle\Entity\WithdrawStatistic", mappedBy="paymentMethod", cascade={"persist", "remove"})
     */
    protected $withdrawStatistic;

    /**
     * @ORM\OneToMany(targetEntity="Bux\WalletBundle\Entity\UserPaymentAccount", mappedBy="paymentMethod", cascade={"persist", "remove"})
     */
    protected $paymentAccounts;

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
     * Set name
     *
     * @param string $name
     *
     * @return PaymentMethod
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->depositStatistic = new ArrayCollection();
    }

    /**
     * Add depositStatistic
     *
     * @param \Bux\StatisticBundle\Entity\DepositStatistic $depositStatistic
     *
     * @return PaymentMethod
     */
    public function addDepositStatistic(DepositStatistic $depositStatistic)
    {
        $this->depositStatistic[] = $depositStatistic;

        return $this;
    }

    /**
     * Remove depositStatistic
     *
     * @param \Bux\StatisticBundle\Entity\DepositStatistic $depositStatistic
     */
    public function removeDepositStatistic(DepositStatistic $depositStatistic)
    {
        $this->depositStatistic->removeElement($depositStatistic);
    }

    /**
     * Get depositStatistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getDepositStatistic()
    {
        return $this->depositStatistic;
    }

    /**
     * Add paymentAccounts
     *
     * @param \Bux\WalletBundle\Entity\UserPaymentAccount $paymentAccounts
     *
     * @return PaymentMethod
     */
    public function addPaymentAccount(UserPaymentAccount $paymentAccounts)
    {
        $this->paymentAccounts[] = $paymentAccounts;

        return $this;
    }

    /**
     * Remove paymentAccounts
     *
     * @param \Bux\WalletBundle\Entity\UserPaymentAccount $paymentAccounts
     */
    public function removePaymentAccount(UserPaymentAccount $paymentAccounts)
    {
        $this->paymentAccounts->removeElement($paymentAccounts);
    }

    /**
     * Get paymentAccounts
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getPaymentAccounts()
    {
        return $this->paymentAccounts;
    }

    /**
     * Add withdrawStatistic
     *
     * @param \Bux\StatisticBundle\Entity\WithdrawStatistic $withdrawStatistic
     *
     * @return PaymentMethod
     */
    public function addWithdrawStatistic(WithdrawStatistic $withdrawStatistic)
    {
        $this->withdrawStatistic[] = $withdrawStatistic;

        return $this;
    }

    /**
     * Remove withdrawStatistic
     *
     * @param \Bux\StatisticBundle\Entity\WithdrawStatistic $withdrawStatistic
     */
    public function removeWithdrawStatistic(WithdrawStatistic $withdrawStatistic)
    {
        $this->withdrawStatistic->removeElement($withdrawStatistic);
    }

    /**
     * Get withdrawStatistic
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getWithdrawStatistic()
    {
        return $this->withdrawStatistic;
    }
}
