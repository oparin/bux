<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/15/15
 * Time: 11:27 AM
 */

namespace Bux\Admin\AdvertisementsBundle\DataFixtures\ORM;

use Bux\Admin\AdvertisementsBundle\Entity\VideoPackages;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadVideoPackagesData
 *
 * @package Bux\Admin\AdvertisementsBundle\DataFixtures\ORM
 */
class LoadVideoPackagesData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $package = new VideoPackages();
//        $package->setCredits(150);
//        $package->setPrice(5);
//        $manager->persist($package);
//
//        $package = new VideoPackages();
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