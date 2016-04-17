<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/19/15
 * Time: 6:07 PM
 */

namespace Bux\Admin\AdvertisementsBundle\DataFixtures\ORM;

use Bux\Admin\AdvertisementsBundle\Entity\BannerPackages;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadBannerPackagesData
 *
 * @package Bux\Admin\AdvertisementsBundle\DataFixtures\ORM
 */
class LoadBannerPackagesData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $package = new BannerPackages();
//        $package->setCredits(150);
//        $package->setPrice(5);
//        $manager->persist($package);
//
//        $package = new BannerPackages();
//        $package->setCredits(300);
//        $package->setPrice(10);
//        $manager->persist($package);
//
//        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 7;
    }
}