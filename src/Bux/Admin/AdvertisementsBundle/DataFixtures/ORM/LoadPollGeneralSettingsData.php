<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/21/15
 * Time: 1:14 PM
 */

namespace Bux\Admin\AdvertisementsBundle\DataFixtures\ORM;

use Bux\Admin\AdvertisementsBundle\Entity\PollGeneralSettings;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadPollGeneralSettingsData
 *
 * @package Bux\Admin\AdvertisementsBundle\DataFixtures\ORM
 */
class LoadPollGeneralSettingsData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $setting = new PollGeneralSettings();
//        $setting->setAdminApprove(false);
//        $setting->setAutoCredits(true);
//        $setting->setMaxTitle(100);
//        $setting->setMaxDescription(100);
//        $setting->setClickInDay(true);
//        $manager->persist($setting);
//
//        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 6;
    }
}