<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/3/15
 * Time: 1:08 PM
 */

namespace Bux\Admin\SetupBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class BuyReferralSettings
 *
 * @package Bux\Admin\SetupBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_buy_referrals_settings")
 */
class BuyReferralsSettings
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="boolean", name="auto_assign")
     */
    protected $autoAssign;

    /**
     * @ORM\Column(type="boolean", name="enabled")
     */
    protected $enabled;

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
     * Set autoAssign
     *
     * @param boolean $autoAssign
     *
     * @return BuyReferralsSettings
     */
    public function setAutoAssign($autoAssign)
    {
        $this->autoAssign = $autoAssign;

        return $this;
    }

    /**
     * Get autoAssign
     *
     * @return boolean 
     */
    public function getAutoAssign()
    {
        return $this->autoAssign;
    }

    /**
     * Set enabled
     *
     * @param boolean $enabled
     *
     * @return BuyReferralsSettings
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;

        return $this;
    }

    /**
     * Get enabled
     *
     * @return boolean 
     */
    public function getEnabled()
    {
        return $this->enabled;
    }
}
