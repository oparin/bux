<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/3/15
 * Time: 3:32 PM
 */

namespace Bux\Admin\SetupBundle\DataFixtures\ORM;

use Bux\Admin\SetupBundle\Entity\BuyReferralsSettings;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadBuyReferralsSettingsData
 *
 * @package Bux\Admin\SetupBundle\DataFixtures\ORM
 */
class LoadBuyReferralsSettingsData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $setting = new BuyReferralsSettings();
        $setting->setAutoAssign(false);
        $setting->setEnabled(true);
        $manager->persist($setting);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 6;
    }
}