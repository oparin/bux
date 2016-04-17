<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/21/15
 * Time: 1:20 PM
 */

namespace Bux\Admin\AdvertisementsBundle\DataFixtures\ORM;

use Bux\Admin\AdvertisementsBundle\Entity\PollPackages;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadPollPackagesData
 *
 * @package Bux\Admin\AdvertisementsBundle\DataFixtures\ORM
 */
class LoadPollPackagesData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $package = new PollPackages();
//        $package->setCredits(150);
//        $package->setPrice(5);
//        $manager->persist($package);
//
//        $package = new PollPackages();
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