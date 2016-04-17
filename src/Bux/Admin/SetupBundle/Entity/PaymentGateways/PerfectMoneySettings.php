<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/6/15
 * Time: 11:40 AM
 */

namespace Bux\Admin\SetupBundle\Entity\PaymentGateways;

use Bux\WalletBundle\Entity\PaymentMethod;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class PerfectMoneySettings
 *
 * @package Bux\Admin\SetupBundle\Entity\PaymentGateways
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_perfect_money_settings")
 */
class PerfectMoneySettings
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="Bux\WalletBundle\Entity\PaymentMethod")
     * @ORM\JoinColumn(name="payment_method_id", referencedColumnName="id", onDelete="SET NULL")
     */
    protected $paymentMethod;

    /**
     * @ORM\Column(type="string")
     */
    protected $account;

    /**
     * @ORM\Column(type="string", name="alternate_passphrase")
     */
    protected $alternatePassphrase;

    /**
     * @ORM\Column(type="string")
     */
    protected $currency;

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
     * Set account
     *
     * @param string $account
     *
     * @return PerfectMoneySettings
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
     * Set alternatePassphrase
     *
     * @param string $alternatePassphrase
     *
     * @return PerfectMoneySettings
     */
    public function setAlternatePassphrase($alternatePassphrase)
    {
        $this->alternatePassphrase = $alternatePassphrase;

        return $this;
    }

    /**
     * Get alternatePassphrase
     *
     * @return string 
     */
    public function getAlternatePassphrase()
    {
        return $this->alternatePassphrase;
    }

    /**
     * Set currency
     *
     * @param string $currency
     *
     * @return PerfectMoneySettings
     */
    public function setCurrency($currency)
    {
        $this->currency = $currency;

        return $this;
    }

    /**
     * Get currency
     *
     * @return string 
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * Set paymentMethod
     *
     * @param \Bux\WalletBundle\Entity\PaymentMethod $paymentMethod
     *
     * @return PerfectMoneySettings
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
