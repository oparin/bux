<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/10/15
 * Time: 5:00 PM
 */

namespace Bux\Admin\AdvertisementsBundle\DataFixtures\ORM;

use Bux\Admin\AdvertisementsBundle\Entity\VideoGeneralSettings;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadVideoSettingGeneralData
 *
 * @package Bux\Admin\AdvertisementsBundle\DataFixtures\ORM
 */
class LoadVideoSettingGeneralData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $setting = new VideoGeneralSettings();
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