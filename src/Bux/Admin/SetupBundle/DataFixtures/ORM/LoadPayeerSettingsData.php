<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/6/15
 * Time: 4:13 PM
 */

namespace Bux\Admin\SetupBundle\DataFixtures\ORM;

use Bux\Admin\SetupBundle\Entity\PaymentGateways\PayeerSettings;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadPayeerSettingsData
 *
 * @package Bux\Admin\SetupBundle\DataFixtures\ORM
 */
class LoadPayeerSettingsData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $setting = new PayeerSettings();
        $setting->setShopId('123456');
        $setting->setSecretKey('secret');
        $setting->setCurrency('USD');
        $setting->setPaymentMethod($this->getReference('payeer'));
        $manager->persist($setting);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2;
    }
}