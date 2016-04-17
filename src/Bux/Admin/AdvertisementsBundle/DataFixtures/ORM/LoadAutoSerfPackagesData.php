<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/23/15
 * Time: 2:42 PM
 */

namespace Bux\Admin\AdvertisementsBundle\DataFixtures\ORM;

use Bux\Admin\AdvertisementsBundle\Entity\AutoSerfPackages;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadAutoSerfPackagesData
 *
 * @package Bux\Admin\AdvertisementsBundle\DataFixtures\ORM
 */
class LoadAutoSerfPackagesData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $package = new AutoSerfPackages();
//        $package->setCredits(150);
//        $package->setPrice(5);
//        $manager->persist($package);
//
//        $package = new AutoSerfPackages();
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