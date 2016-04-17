<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/6/15
 * Time: 6:08 PM
 */

namespace Bux\WalletBundle\DataFixtures\ORM;

use Bux\WalletBundle\Entity\PaymentMethod;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadBalanceMethodData
 *
 * @package Bux\WalletBundle\DataFixtures\ORM
 */
class LoadBalanceMethodData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $pm = new PaymentMethod();
        $pm->setName('Perfect Money');
        $manager->persist($pm);
        $this->addReference('pm', $pm);

        $pm = new PaymentMethod();
        $pm->setName('Payeer');
        $manager->persist($pm);
        $this->addReference('payeer', $pm);

//        $pm = new PaymentMethod();
//        $pm->setName('EGO Pay');
//        $manager->persist($pm);
//        $this->addReference('ep', $pm);
//
//        $pm = new PaymentMethod();
//        $pm->setName('Bitcoin');
//        $manager->persist($pm);
//        $this->addReference('bc', $pm);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 1;
    }
} 