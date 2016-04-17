<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/6/15
 * Time: 2:04 PM
 */

namespace Bux\Admin\SetupBundle\Entity\PaymentGateways;

use Bux\WalletBundle\Entity\PaymentMethod;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class PayeerSettings
 *
 * @package Bux\Admin\SetupBundle\Entity\PaymentGateways
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_payeer_settings")
 */
class PayeerSettings
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
    protected $shopId;

    /**
     * @ORM\Column(type="string", name="secret_key")
     */
    protected $secretKey;

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
     * Set shopId
     *
     * @param string $shopId
     *
     * @return PayeerSettings
     */
    public function setShopId($shopId)
    {
        $this->shopId = $shopId;

        return $this;
    }

    /**
     * Get shopId
     *
     * @return string 
     */
    public function getShopId()
    {
        return $this->shopId;
    }

    /**
     * Set secretKey
     *
     * @param string $secretKey
     *
     * @return PayeerSettings
     */
    public function setSecretKey($secretKey)
    {
        $this->secretKey = $secretKey;

        return $this;
    }

    /**
     * Get secretKey
     *
     * @return string 
     */
    public function getSecretKey()
    {
        return $this->secretKey;
    }

    /**
     * Set currency
     *
     * @param string $currency
     *
     * @return PayeerSettings
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
     * @return PayeerSettings
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
