<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/6/15
 * Time: 12:05 PM
 */

namespace Bux\Admin\SetupBundle\DataFixtures\ORM;

use Bux\Admin\SetupBundle\Entity\PaymentGateways\PerfectMoneySettings;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadPerfectMoneySettingsData
 *
 * @package Bux\Admin\SetupBundle\DataFixtures\ORM
 */
class LoadPerfectMoneySettingsData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $setting = new PerfectMoneySettings();
        $setting->setAccount('123456');
        $setting->setAlternatePassphrase('phrase');
        $setting->setCurrency('USD');
        $setting->setPaymentMethod($this->getReference('pm'));
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