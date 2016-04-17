<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/3/15
 * Time: 4:03 PM
 */

namespace Bux\Admin\SetupBundle\Twig;

use Doctrine\ORM\EntityManager;

/**
 * Class BuyReferralExtension
 *
 * @package Bux\Admin\SetupBundle\Twig
 */
class BuyReferralExtension extends \Twig_Extension
{
    private $em;

    /**
     * @param EntityManager $entityManager
     */
    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    /**
     * @return array
     */
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('buyReferral', array($this, 'getEnabled')),
        );
    }

    /**
     * @return bool
     */
    public function getEnabled()
    {
        $settings = $this->em->getRepository('BuxAdminSetupBundle:BuyReferralsSettings')->find(1);
        if ($settings->getEnabled()) {
            return true;
        }

        return false;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'buy_referral_extension';
    }
}