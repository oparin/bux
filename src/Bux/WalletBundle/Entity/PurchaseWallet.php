<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/23/14
 * Time: 12:12 PM
 */

namespace Bux\WalletBundle\Entity;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class PurchaseWallet
 *
 * @package Bux\WalletBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_purchase_wallet")
 */
class PurchaseWallet
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="purchaseWallet")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $user;

    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    protected $sum = 0.00;


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
     * Set sum
     *
     * @param string $sum
     *
     * @return PurchaseWallet
     */
    public function setSum($sum)
    {
        $this->sum = $sum;

        return $this;
    }

    /**
     * Get sum
     *
     * @return string 
     */
    public function getSum()
    {
        return $this->sum;
    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return PurchaseWallet
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
}
